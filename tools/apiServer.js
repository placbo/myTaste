const express = require('express');
const multer = require('multer');

const server = express();

const multipartHandler = multer({
    dest: '/tmp/uploads/',
    limits:{fileSize: 10000000}, //10 MB
}).single("image");

server.post('/upload', function (req, res, next) {
    multipartHandler(req, res, function (err) {
        if (err) {
            console.log(err.message);
            return res.status(413).send(err.message);
        }
        // console.log(req.body);
        // console.log(req.body.title);
        // console.log(req.files);
        return res.sendStatus(200).end();
    })
});

const port = 3002;
server.listen(port, () => {
    console.log(`apiServer is running on port ${port}`);
});


