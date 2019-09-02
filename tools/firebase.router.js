const express = require("express");
const router = express.Router();
const Multer = require("multer");
const admin = require("firebase-admin");
const config = require("./config");
const uuidv4 = require('uuid/v4');
const serviceAccount = require(config.fireBasePrivateKeyPath);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: config.firebaseStorageBucketURL,
    databaseURL: config.databaseURL
});

const bucket = admin.storage().bucket();

// add admin to ther request params to get into controller zone
router.use(function (req, res, next) {
    if (!req.admin) {
        req.admin = admin;
    }
    if (!req.bucket) {
        req.bucket = bucket;
    }
    next();
});

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024 // no larger than 5mb, you can change as needed.
    }
});

function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

router.get("/item/:id", (req, res) => {
    admin.database()
        .ref('/data/' + req.params.id)
        .once('value')
        .then((snapshot) => {
            res.status(200).json(snapshot);
        })
        .catch((err) => {
            handleError(res, err.message, "Failed to get set");
        });
});

router.get("/items/", (req, res) => {
    admin.database()
        .ref('/data/')
        .once('value')
        .then((snapshot) => {
            res.status(200).json(snapshot);
        })
        .catch((err) => {
            handleError(res, err.message, "Failed to get set");
        });
});
//         handleError(res, "Invalid user input", "Must provide a set valid Id.", 400);


router.post("/upload", multer.single("file"), (req, res) => {
        const id = uuidv4();
        const file = req.file;
        if (!file) {
            res.status(500);
            res.json('file not found');
            return;
        }
        const title = req.body.title || "";
        const comment = req.body.comment || "";
        const tags = req.body.tags || "";
        const diceValue = req.body.diceValue || "";


        const generatedImageName = uuidv4();
        let fileUpload = req.bucket.file(generatedImageName);
        fileUpload.save(new Buffer(file.buffer)).then(
            result => {
                res.status(200);
                res.json('file uploaded successfully');
            },
            error => {
                res.status(500);
                console.log(error);
                res.json({error: error});
            }
        );
        admin.database().ref('/data/' + id).set({
            title: title,
            comment: comment,
            imageLink: generatedImageName,
            tags: tags,
            diceValue: diceValue
        });


    }
);

module.exports = router;