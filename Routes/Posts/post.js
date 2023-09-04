const express = require('express');
const router = express.Router();

// For file upload
const multer = require('multer');

// Time stamp upload
const moment = require('moment');

// Model
const { Post } = require('../../Models/posts');

const storage = multer.diskStorage({
    destination: "./Routes/Posts/Posts",
    filename: function (req, file, cb) {
        const urlName = `${Date.now()}-${file.originalname}`;
        req.body.urlLink = urlName;
        cb(null, urlName);
    },
});

const upload = multer({ storage: storage }).single("File");

// Main Post even with the image
router.post('/new', (req, res) => {
    upload(req, res, (err) => {
        if(err) res.status(400).send(err);

        if(req.file){
            const { user_id, msg } = req.body;

            const post = new Post({ 
                user_id, 
                msg, 
                likes: 0, 
                date: `${moment().format('MMMM Do YYYY, h:mm a')}`, 
                fileUrl: req.file.filename 
            });

            post.save( (err, doc) => {
                if(err) res.status(400).send(err);
                res.status(200).send(doc);
            } )
        }

    })
})

// Main post without an image
router.post('/new-msg', (req, res) => {
    const post = new Post({
        user_id: req.body.user_id,
        msg: req.body.msg,
        date: `${moment().format('MM/DD/YYYY, h:mm a')}`, 
        likes: 0
    });
    post.save( (err, doc) => {
        if(err) res.status(400).send(err);
        res.status(200).send(doc)
    } )
})

// Trting to get current time from now
router.get('/test', (req, res) => {
    console.log(moment("09/04/2023, 05:54 PM", "MM/DD/YYYY, hh:mm A").fromNow())
    res.send(moment("09/04/2023, 05:54 PM", "MM/DD/YYYY, hh:mm A").fromNow());
})

// Like Post
router.post('/like', (req, res) => {
    Post.find( { _id: req.body.id }, (err, doc) => {
        if(err) res.status(400).send(err);

        const checker = doc[0].peopleLike.some( ele => ele === req.body.user_id );

        if(!checker){
            Post.findOneAndUpdate( 
                { _id: req.body.id },
                {
                    $inc: { likes: 1 }
                },
                (err, info) => {
                    if(err) res.status(400).send(err);
                    Post.findOneAndUpdate( 
                        { _id: req.body.id },
                        {
                            $addToSet: {
                                peopleLike: req.body.user_id
                            }
                        },
                        (err, dt) => {
                            if(err) res.status(400).send(err);
                            res.status(200).send(dt);
                        }
                    )
                }
            )
        }
        else{
            res.status(200).send(doc);
        }
    } )
})

// Comment Post
router.post('/comment', (req, res) => {
    Post.findOneAndUpdate( 
        { _id: req.body.id }, 
        { 
            $push: {
                comments: {
                    username: req.body.details.username,
                    user_id: req.body.details.user_id,
                    msg: req.body.details.msg
                }
            }
        }, 
        (err, doc) => {
            if(err) res.status(400).send(err);
            res.status(200).send(doc);
        } )
})

module.exports = router;
