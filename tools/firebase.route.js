const express = require("express");
const router = express.Router();
const Multer = require("multer");
const admin = require("firebase-admin");
const config = require("./config");
const cloudStorageCtrl = require("./cloud-storage.controller");
const serviceAccount = require(config.fireBasePrivateKeyPath);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: config.firebaseStorageBucketURL
});

const bucket = admin.storage().bucket();

// add admin to ther request params to get into controller zone
router.use(function(req, res, next) {
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
        fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
    }
});

router.post("/upload", multer.single("file"), cloudStorageCtrl.upload);
module.exports = router;