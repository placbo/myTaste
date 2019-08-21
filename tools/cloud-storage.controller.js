exports.upload = (req, res) => {
    let file = req.file;
    if(!file) {
        res.status(500);
        res.json('file not found');
        return;
    }
    let fileUpload = req.bucket.file(file.originalname);
    /*
   req.bucket.upload("assets/avatar/5ce7f5c25958b012805bb4f3_Logo-100-1.jpg").then(   //<-- if we have to upload local file, pass path of that file
  */
// Get File from request Form data.
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
};