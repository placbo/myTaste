const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const mongodb = require("mongodb");
const multer = require("multer");
const uuidv4 = require("uuid/v4");
const path = require("path");
const imageThumbnail = require("image-thumbnail");
const hash = require("hash.js");
const mongoose = require("mongoose");
const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;
const session = require("express-session");

const passport = require("passport");
const fs = require("fs");
require("log-timestamp");
require("dotenv").config();

const ObjectID = mongodb.ObjectID;
const cors = require("cors");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const DB_URL = "mongodb://localhost:27017/";
const DB_NAME = "mytaste";
const ITEM_COLLECTION_NAME = "items";
const USERS_COLLECTION_NAME = "users";
const IMAGE_LOCATION = "/var/www/html/mytastecontent/";
const IMAGE_THUMB_LOCATION = "/var/www/html/mytastecontent/thumb/";

const _10MB = 10 * 1024 * 1024;

let db;

let GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, callback) => {
      // db.collection(USERS_COLLECTION_NAME).findOneAndUpdate(
      //   { googleId: profile.id },
      //   {
      //     $setOnInsert: { name: profile.displayName, googleId: profile.id , picture: profile._json.picture}
      //   },
      //   {
      //     returnOriginal: false,
      //     upsert: true
      //   },
      //   (err, doc) => {
      //     return cb(err, doc.value);
      //   }
      // );
      callback(null, {
        name: profile.displayName,
        googleId: profile.id,
        picture: profile._json.picture,
        accessToken: accessToken
      });
    }
  )
);

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(user, cb) {
  cb(null, user);
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 } //60 min
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongodb.MongoClient.connect(
  process.env.MONGODB_URI || DB_URL + DB_NAME,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err, client) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    // Save database object from the callback for reuse.
    db = client.db();
    console.log("Database connection ready");

    // Initialize the app.
    let server = app.listen(process.env.PORT || 3001, () => {
      let port = server.address().port;
      console.log("App now running on port", port);
    });
  }
);

function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({ error: message });
}

app.get("/mytasteapi/", (req, res) => {
  console.log("Ping called");
  res.send("Pers mytaste-api. v1.0.3   uploading files work");
});

app.get("/", ensureLoggedIn("/login"), (req, res) => {
  res.send(
    `<html><h1>Main page</h1><HR∕>Logged in as ${req.user.name}<a href='/login'>Go to Login page</a></html>`
  );
});

app.get("/login", (req, res) => {
  res.send(
    "<html><h1>Loginpage</h1><a href='/auth/google'>[Google login]</a></html>"
  );
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"]
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost/login" }),
  (req, res) => {
    res.redirect("http://localhost/?token=" + req.user.token);
  }
);

const storage = multer.diskStorage({
  limits: {
    fileSize: _10MB
  },
  destination: function(req, file, cb) {
    cb(null, IMAGE_LOCATION);
  },
  filename: function(req, file, cb) {
    const id = uuidv4() + path.extname(file.originalname);
    cb(null, id);
  }
});

const multipartHandler = multer({ storage: storage }).single("image");

app.post("/mytasteapi/upload", function(req, res) {
  console.log("Upload called (POST)");
  multipartHandler(req, res, function(err) {
    if (err) {
      console.error(err);
      return handleError(res, "FAIL!", err.message, 413);
    } else {
      console.log("---File saved as_" + req.file.filename);
      let options = { width: 200, height: 200 };
      const sourcePathForThumbnail = IMAGE_LOCATION + req.file.filename;
      const destPathForThumbnail = IMAGE_THUMB_LOCATION + req.file.filename;
      console.log("trying to thumbnail: ", sourcePathForThumbnail);
      imageThumbnail(sourcePathForThumbnail, options)
        .then(data => {
          fs.writeFile(destPathForThumbnail, data, function(err) {
            if (err) {
              return console.log("Error saving thumb", err);
            }
            console.log("The file was saved!");
          });
        })
        .catch(err => console.error("Error creating thumb", err));

      res.status(200).json(req.file.filename);
    }
  });
});

app.get("/mytasteapi/items", verifyToken, function(req, res) {
  console.log("Fetch all: (GET) ");
  db.collection(ITEM_COLLECTION_NAME)
    .find({})
    .toArray(function(err, docs) {
      if (err) {
        handleError(res, err.message, "Failed to get sets.");
      } else {
        res.status(200).json(docs);
      }
    });
});

app.post("/mytasteapi/items", verifyToken, function(req, res) {
  let newSet = req.body;
  console.log("Saving: (POST) ", newSet);
  newSet.createDate = new Date();
  db.collection(ITEM_COLLECTION_NAME).insertOne(newSet, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new set.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

app.get("/mytasteapi/items/:id", verifyToken, function(req, res) {
  console.log("Fetch: (GET) ", req.params.id);
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    db.collection(ITEM_COLLECTION_NAME).findOne(
      {
        _id: new ObjectID(req.params.id)
      },
      function(err, doc) {
        if (err) {
          handleError(res, err.message, "Failed to get set");
        } else {
          res.status(200).json(doc);
        }
      }
    );
  } else {
    handleError(res, "Invalid user input", "Must provide a set valid Id.", 400);
  }
});

app.put("/mytasteapi/items/:id", verifyToken, function(req, res) {
  let updatedSet = req.body;
  console.log("Updating: (PUT) ", updatedSet);
  db.collection(ITEM_COLLECTION_NAME).findOneAndUpdate(
    { _id: new ObjectID(req.params.id) },
    { $set: updatedSet },
    { returnOriginal: false },
    (err, documents) => {
      if (err) {
        handleError(res, err.message, "Failed to update item");
      } else {
        res.status(200).json(documents.value);
      }
    }
  );
});

app.delete("/mytasteapi/items/:id", verifyToken, function(req, res) {
  console.log("Delete: (DELETE) ", req.params.id);
  db.collection(ITEM_COLLECTION_NAME).deleteOne(
    { _id: new ObjectID(req.params.id) },
    function(err) {
      if (err) {
        handleError(res, err.message, "Failed to delete set");
      } else {
        res.status(200).json(req.params.id);
      }
    }
  );
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

app.post("/mytasteapi/login", urlencodedParser, function(req, res) {
  let secret = hash
    .sha256()
    .update(req.body.secret)
    .digest("hex");
  if (secret === process.env.LOGIN_SECRET) {
    let token = jwt.sign(
      {
        iss: "www.kasselars.com",
        sub: "mytaste",
        name: "PCB",
        admin: true
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: 86400 // expires in 24 hours
      }
    );
    res.status(200).send({ auth: true, token: token });
  } else {
    res.status(401).send({ auth: false, message: "Failed to log in" });
  }
});
