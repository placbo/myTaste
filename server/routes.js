const express = require("express");
const User = require("./model/user");
const Rating = require("./model/rating");
const router = express.Router();

router.get("/test", (req, res) => {
  res.send("test-response");
});

router.get("/", (req, res) => {
  User.find({}).lean().exec().then((docs) => {
    console.log(docs);
    res.status(200).json(docs);
  }).catch( (err) => {
    console.log(err);
    res.status(500).json({ data: null, error: { subject: "server" }, message: err.toString() });
  });
});

router.get("/mytasteapi/rating2/:itemId/:userId", (req, res) => {
  console.log(
      `Fetch rating (GET) userId: ${req.params.userId}, itemId: ${req.params.itemId} `
  );
  Rating.find({ itemId: req.params.itemId, userId: req.params.userId },
      (err, result) => {
        if (err) {
          console.log("ERROR: " + err.message);
          res.status(res.code || 500).json({ error: "Failed to get rating"});
        } else {
          res.status(200).json(result);
        }
      }
  );
});


module.exports = router;
