let express = require('express');
let bodyParser = require("body-parser");
let jwt = require('jsonwebtoken');
let mongodb = require("mongodb");
require('dotenv').config();
let ObjectID = mongodb.ObjectID;
let db;
let cors = require('cors');
let app = express();
let urlencodedParser = bodyParser.urlencoded({extended: false});
let hash = require('hash.js');
let mongoose = require('mongoose');
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const path = require('path');

const DB_URL = 'mongodb://localhost:27017/';
const DB_NAME = 'mytaste';
const COLLECTION_NAME = 'items';
const IMAGE_LOCATION = '/var/www/html/mytastecontent/';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


mongodb.MongoClient.connect(process.env.MONGODB_URI || DB_URL + DB_NAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, client) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    // Save database object from the callback for reuse.
    db = client.db();
    console.log("Database connection ready");

    // const collection = db.collection(COLLECTION_NAME);
    // collection.find({}).toArray(function (err, docs) {
    //     if (err) throw err;
    //     console.log(`total number of items in collection : ${docs.length}`);
    // });


    // Initialize the app.
    let server = app.listen(process.env.PORT || 3001, function () {
        let port = server.address().port;
        console.log("App now running on port", port);
    });
});

function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

app.get('/mytasteapi/', function (req, res) {
    res.send('Pers mytaste-api. v1.0.3   uploading files work');
});

const storage = multer.diskStorage({
    limits: {
        fileSize: 10000000 //10 MB
    },
    destination: function (req, file, cb) {
        cb(null, IMAGE_LOCATION);
    },
    filename: function (req, file, cb) {
        const id = uuidv4() + path.extname(file.originalname);
        cb(null, id);
    }
});

const multipartHandler = multer({storage: storage}).single('image');

app.post('/mytasteapi/upload', function (req, res) {
    console.log("upload called");
    multipartHandler(req, res, function (err) {
        if (err) {
            console.error(err);
            return handleError(res, "FAIL!", err.message, 413);
        } else {
            let item = req.body;
            item.createDate = new Date();
            if (req.file) {
                item.imageName = req.file.filename;
            }
            console.log("Saving: ", item);
            db.collection(COLLECTION_NAME).insertOne(item, function (err, doc) {
                if (err) {
                    handleError(res, err.message, "Failed to create new set.");
                } else {
                    res.status(201).json(doc.ops[0]);
                }
            });
        }
    })
});

app.get("/mytasteapi/items", verifyToken, function (req, res) {
    db.collection(COLLECTION_NAME).find({}).toArray(function (err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get sets.");
        } else {
            res.status(200).json(docs);
        }
    });
});

// app.post("/mytasteapi/items", verifyToken, function (req, res) {
//     let newSet = req.body;
//     newSet.createDate = new Date();
//     db.collection(COLLECTION_NAME).insertOne(newSet, function (err, doc) {
//         if (err) {
//             handleError(res, err.message, "Failed to create new set.");
//         } else {
//             res.status(201).json(doc.ops[0]);
//         }
//     });
// });

app.get("/mytasteapi/items/:id", verifyToken, function (req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        db.collection(COLLECTION_NAME).findOne({
            _id: new ObjectID(req.params.id)
        }, function (err, doc) {
            if (err) {
                handleError(res, err.message, "Failed to get set");
            } else {
                res.status(200).json(doc);
            }
        });
    } else {
        handleError(res, "Invalid user input", "Must provide a set valid Id.", 400);
    }
});

app.put("/mytasteapi/items/:id", verifyToken, function (req, res) {
    db.collection(COLLECTION_NAME).findOneAndUpdate(
        {_id: new ObjectID(req.params.id)},
        {$set: req.body},
        {returnOriginal: false},
        (err, documents) => {
            if (err) {
                handleError(res, err.message, "Failed to update item");
            } else {
                res.status(200).json(documents.value);
            }
        });
});

app.delete("/mytasteapi/items/:id", verifyToken, function (req, res) {
    db.collection(COLLECTION_NAME).deleteOne({_id: new ObjectID(req.params.id)}, function (err) {
        if (err) {
            handleError(res, err.message, "Failed to delete set");
        } else {
            res.status(200).json(req.params.id);
        }
    });
});

function verifyToken(req, res, next) {
    // let token = req.headers['x-access-token'];
    // jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
    //     if (!token) {
    //         res.status(403).send({auth: false, message: 'No token provided.'});
    //     } else {
    //         if (err) {
    //             res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    //         }
    //         req.userId = decoded.id;
    //         next();
    //     }
    // });
    next();
}

app.post('/mytasteapi/login', urlencodedParser, function (req, res) {
    let secret = hash.sha256().update(req.body.secret).digest('hex');
    if (secret === process.env.LOGIN_SECRET) {
        let token = jwt.sign({
                iss: "www.kasselars.com",
                sub: "mytaste",
                name: "PCB",
                admin: true
            }, process.env.TOKEN_SECRET, {
                expiresIn: 86400 // expires in 24 hours
            }
        );
        res.status(200).send({auth: true, token: token});
    } else {
        res.status(401).send({auth: false, message: 'Failed to log in'});
    }
});

