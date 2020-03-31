const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const multer = require("multer");
const path = require("path");
const imageThumbnail = require("image-thumbnail");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const { uuid } = require('uuidv4');
require("log-timestamp");
require("dotenv").config();
const cors = require("cors");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;


const ITEMS_COLLECTION_NAME = "items";
const USERS_COLLECTION_NAME = "users";
const RATINGS_COLLECTION_NAME = "ratings";
const IMAGE_LOCATION = process.env.IMAGE_LOCATION;
const IMAGE_THUMB_LOCATION = process.env.IMAGE_THUMB_LOCATION;
const _10MB = 10 * 1024 * 1024;
let db;
const ObjectID = mongodb.ObjectID;

const app = express();

const MOCK_USER_LOGGEDIN = false;

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
  db.collection(USERS_COLLECTION_NAME).findOne(
    { googleId: user.googleId },
    (err, user) => {
      cb(null, user);
    }
  );
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
    const id = uuid() + path.extname(file.originalname);
    cb(null, id);
  }
});

const ensureAuthenticatedAdmin = (req, res, next) => {
  if (MOCK_USER_LOGGEDIN) {
    console.log("mocking ensureAuthenticatedAdmin");
    return next();
  } else {
    console.log("EnsureAuthenticated Admin");
    if (req.isAuthenticated() && req.user.googleId === process.env.ADMIN_ID) {
      return next();
    } else res.redirect(`${process.env.CLIENT_HOST}/login`);
  }
};

const ensureAuthenticatedUser = (req, res, next) => {
  if (MOCK_USER_LOGGEDIN) {
    console.log("mocking ensureAuthenticatedUser");
    return next();
  } else {
    console.log("EnsureAuthenticated User- show user:", req.user);
    if (req.isAuthenticated()) {
      return next();
    } else res.redirect(`${process.env.CLIENT_HOST}/login`);
  }
};


const multipartHandler = multer({ storage: storage }).single("image");

app.post("/mytasteapi/upload", ensureAuthenticatedAdmin, (req, res) => {
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

app.get("/mytasteapi/items", (req, res) => {
  console.log("Fetch all: (GET) " + ITEMS_COLLECTION_NAME);
  db.collection(ITEMS_COLLECTION_NAME)
    .find({})
    .toArray((err, docs) => {
      if (err) {
        handleError(res, err.message, "Failed to get sets.");
      } else {
        res.status(200).json(docs);
      }
    });
});

const isAdmin = user => {
  return user.googleId === process.env.ADMIN_ID;
};

app.get("/mytasteapi/userprofile", (req, res) => {
  if (MOCK_USER_LOGGEDIN) {
    console.log("MOCK Fetch user profile: (GET) ");
    res.status(200).json({
      _id: "123",
      googleId: "123",
      name: "TEST USER",
      picture: "https://i.picsum.photos/id/640/200/200.jpg",
      role: "user"
    });
  } else {
    console.log("Fetch user profile: (GET) ");
    if (req.user && req.user.googleId) {
      console.log("User profile id: ", req.user.googleId);
      db.collection(USERS_COLLECTION_NAME).findOne(
        {
          googleId: req.user.googleId
        },
        (err, user) => {
          if (err) {
            handleError(res, err.message, "Failed to get user");
          } else {
            if (isAdmin(user)) user = { ...user, role: "admin" };
            res.status(200).json(user);
          }
        }
      );
    } else res.status(204).json({});
  }
});

app.post("/mytasteapi/items", ensureAuthenticatedAdmin, (req, res) => {
  let newSet = req.body;
  console.log("Saving: (POST) ", newSet);
  newSet.createDate = new Date();
  db.collection(ITEMS_COLLECTION_NAME).insertOne(newSet, (err, doc) => {
    if (err) {
      handleError(res, err.message, "Failed to create new set.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

app.get("/mytasteapi/items/:id", (req, res) => {
  console.log("Fetch item (GET) : ", req.params.id);
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    db.collection(ITEMS_COLLECTION_NAME).findOne(
      {
        _id: new ObjectID(req.params.id)
      },
      (err, doc) => {
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

app.get("/mytasteapi/rating/:itemId/:userId", (req, res) => {
  console.log(
    `Fetch rating (GET) userId: ${req.params.userId}, itemId: ${req.params.itemId} `
  );
  db.collection(RATINGS_COLLECTION_NAME).findOne(
    { itemId: req.params.itemId, userId: req.params.userId },
    (err, result) => {
      console.log("err", err);
      console.log("result", result);
      if (err) {
        handleError(res, err.message, "Failed to get set");
      } else {
        res.status(200).json(result);
      }
    }
  );
});

app.get("/mytasteapi/rating/:itemId/", (req, res) => {
  console.log(`Fetch avg rating (GET). itemId: ${req.params.itemId} `);
  db.collection(RATINGS_COLLECTION_NAME)
    .aggregate([
      {
        $match: { itemId: req.params.itemId }
      },
      {
        $group: {
          _id: "$itemId",
          count: { $sum: 1 },
          average: { $avg: "$rating" }
        }
      }
    ])
    .toArray((err, result) => {
      console.log("err", err);
      console.log("result", result);
      if (err) {
        handleError(res, err.message, "Failed to get set");
      } else {
        res.status(200).json(result[0]);
      }
    });
});

app.put("/mytasteapi/rating/", ensureAuthenticatedUser, (req, res) => {
  let rating = req.body;
  console.log("Calling Updating rating (PUT) ");
  db.collection(RATINGS_COLLECTION_NAME)
    .find({ userId: rating.userId, itemId: rating.itemId })
    .count((err, result) => {
      if (err) {
        handleError(res, err.message, "Failed find rating.");
      }
      if (result === 0) {
        db.collection(RATINGS_COLLECTION_NAME).insertOne(rating, err => {
          if (err) {
            handleError(res, err.message, "Failed to create new rating.");
          } else {
            console.log("inserted", req.body);
            res.status(201).json({});
          }
        });
      } else {
        db.collection(RATINGS_COLLECTION_NAME).findOneAndUpdate(
          { userId: rating.userId, itemId: rating.itemId },
          { $set: rating },
          { returnOriginal: false },
          err => {
            if (err) {
              handleError(res, err.message, "Failed to update rating");
            } else {
              console.log("updated");
              res.status(200).json({});
            }
          }
        );
      }
    });
});

app.put("/mytasteapi/items/:id", ensureAuthenticatedAdmin, (req, res) => {
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

app.delete("/mytasteapi/items/:id", ensureAuthenticatedAdmin, (req, res) => {
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
