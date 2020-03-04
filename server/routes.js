const express = require("express");
const User = require("./model/user");
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

module.exports = router;
