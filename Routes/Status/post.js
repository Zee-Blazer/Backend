const express = require('express');
const router = express.Router();

// Models 
const { Status } = require('../../Models/status');

// For file upload
const multer = require('multer');

// Time stamp upload
const moment = require('moment');

const storage = multer.diskStorage({
    destination: "./Backend/Routes/Status/Statuses",
    filename: function (req, file, cb) {
        const urlName = `${Date.now()}-${file.originalname}`;
        req.body.urlLink = urlName;
        cb(null, urlName);
    },
});

const upload = multer({ storage: storage }).single("File");

router.post("/new", (req, res) => {
    upload(req, res, (err) => {
        if(err) res.status(400).send(err);
        const { user_id, msg } = req.body;

        if(req.file){
            const status = new Status({ 
                user_id,
                msg,
                time: `${moment().format('l')}, ${moment(moment()).format("hh:mm A")}`,
                fileUrl: req.file.filename
            })

            status.save( (err, doc) => {
                if(err) res.status(400).send(err);
                res.status(200).send(doc);
            } )
        }
    })
})

module.exports = router;
