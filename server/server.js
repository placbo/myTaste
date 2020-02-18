const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const multer = require("multer");
const uuidv4 = require("uuid/v4");
const path = require("path");
const imageThumbnail = require("image-thumbnail");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const fs = require("fs");
require("log-timestamp");
require("dotenv").config();
const cors = require("cors");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const ITEMS_COLLECTION_NAME = process.env.ITEMS_COLLECTION_NAME;
const USERS_COLLECTION_NAME = process.env.USERS_COLLECTION_NAME;
const IMAGE_LOCATION = process.env.IMAGE_LOCATION;
const IMAGE_THUMB_LOCATION = process.env.IMAGE_THUMB_LOCATION;
const _10MB = 10 * 1024 * 1024;
let db;
const ObjectID = mongodb.ObjectID;

const app = express();

app.use(cors({ credentials: true, origin: process.env.CLIENT_HOST }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
    //     cookie: { maxAge: 3600000 } //60 min
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_HOST}/mytasteapi/auth/google/callback`
    },
    (accessToken, refreshToken, profile, callback) => {
      console.log("logged in ", profile.displayName);
      db.collection(USERS_COLLECTION_NAME).findOneAndUpdate(
        { googleId: profile.id },
        {
          $setOnInsert: {
            name: profile.displayName,
            googleId: profile.id,
            picture: profile._json.picture
          }
        },
        {
          returnOriginal: false,
          upsert: true
        },
        (err, doc) => {
          return callback(err, doc.value);
        }
      );
      // callback(null, {
      //   name: profile.displayName,
      //   googleId: profile.id,
      //   picture: profile._json.picture,
      //   accessToken: accessToken
      // });
    }
  )
);

passport.serializeUser((user, cb) => {
  console.log("Serialize: ", user.googleId);
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  console.log("Deserialize: ", user.googleId);
  //db.collection(USERS_COLLECTION_NAME).findOne({ googleId: user.googleId}, (err, user) => {
    cb(null, {
      name: "TEST",
      googleId: "1234"
    });
  //});
});

app.use(passport.initialize());
app.use(passport.session());

mongodb.MongoClient.connect(
  process.env.MONGODB_URI,
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
    let server = app.listen(process.env.PORT, () => {
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
  res.send("Pers mytaste-api. version?");
});

app.get(
  "/mytasteapi/auth/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login", "profile"]
  })
);

app.get("/mytasteapi/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.get(
  "/mytasteapi/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_HOST}/login`
  }),
  (req, res) => {
    res.redirect(`${process.env.CLIENT_HOST}/?token=${req.user.accessToken}`);
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

const ensureAuthenticated = (req, res, next) => {
   console.log("(ensureAuthenticated - show user:", req.user);
  // if (req.isAuthenticated()) return next();
  // else res.redirect(`${process.env.CLIENT_HOST}/login`);
  return next();
};

const multipartHandler = multer({ storage: storage }).single("image");

app.post("/mytasteapi/upload", ensureAuthenticated, function(req, res) {
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

app.get("/mytasteapi/items", function(req, res) {
  console.log("Fetch all: (GET) ");
  console.log(ITEMS_COLLECTION_NAME);
  db.collection(ITEMS_COLLECTION_NAME)
    .find({})
    .toArray(function(err, docs) {
      if (err) {
        handleError(res, err.message, "Failed to get sets.");
      } else {
        res.status(200).json(docs);
      }
    });
});

app.get("/mytasteapi/userprofile", (req, res) => {
  console.log("Fetch user profile: (GET) ");
  if (req.user && req.user.googleId) {
    console.log("User profile id: ", req.user.googleId);
    db.collection(USERS_COLLECTION_NAME).findOne(
      {
        googleId: req.user.googleId
      },
      function(err, doc) {
        if (err) {
          handleError(res, err.message, "Failed to get user");
        } else {
          res.status(200).json(doc);
        }
      }
    );
  } else res.status(204).json({});
});

app.post("/mytasteapi/items", ensureAuthenticated, function(req, res) {
  let newSet = req.body;
  console.log("Saving: (POST) ", newSet);
  newSet.createDate = new Date();
  db.collection(ITEMS_COLLECTION_NAME).insertOne(newSet, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new set.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

app.get("/mytasteapi/items/:id", ensureAuthenticated, function(req, res) {
  console.log("Fetch: (GET) ", req.params.id);
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    db.collection(ITEMS_COLLECTION_NAME).findOne(
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

app.put("/mytasteapi/items/:id", ensureAuthenticated, function(req, res) {
  let updatedSet = req.body;
  console.log("Updating: (PUT) ", updatedSet);
  db.collection(ITEMS_COLLECTION_NAME).findOneAndUpdate(
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

app.delete("/mytasteapi/items/:id", ensureAuthenticated, function(req, res) {
  console.log("Delete: (DELETE) ", req.params.id);
  db.collection(ITEMS_COLLECTION_NAME).deleteOne(
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
