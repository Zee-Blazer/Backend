const express = require('express');
const router = express.Router();

const multer = require('multer');

// Models
const { User } = require('../../Models/user');

const storage = multer.diskStorage({
    destination: "./Backend/Routes/Profile/ProfilePic",
    filename: function (req, file, cb) {
        const urlName = `${Date.now()}-${file.originalname}`;
        req.body.urlLink = urlName;
        cb(null, urlName);
    },
});

const upload = multer({ storage: storage }).single("File");

router.post('/file', (req, res) => {
    upload(req, res, (err) => {
        if(err) res.status(400).send(err);
        if(req.file){
            User.findByIdAndUpdate( 
                req.body.user_id, 
                { profile: req.file.filename }, 
                (err, doc) => {
                    if(err) res.status(404).send(err);
                    res.status(200).send(doc);
                }
            );
        }
    })
})


module.exports = router;
