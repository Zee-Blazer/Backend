const express = require('express');
const router = express.Router();

// User Model
const { User } = require('../../Models/user');

router.post('/new-follower', (req, res) => {
    User.findOneAndUpdate(
        { _id: req.body.id },
        { $addToSet: { following: { username: req.body.personname, user_id: req.body.user_id } } },
        (err, doc) => {
            if(err) res.status(400).send(err);
            
            User.findOneAndUpdate(
                { _id: req.body.user_id },
                { $addToSet: { followers: { username: req.body.username, user_id: req.body.id  } } },
                ( err, info ) => {
                    if(err) res.status(400).send(err);
                    res.status(200).json({ Following: doc, Followers: info });
                }
            )
        }
    )
})

router.post('/unfollow', (req, res) => {
    User.findOneAndUpdate(
        { _id: req.body.id },
        { $pull: { following: { username: req.body.personname, user_id: req.body.user_id } } },
        (err, doc) => {
            if(err) res.status(400).send(err);
            
            User.findOneAndUpdate(
                { _id: req.body.user_id },
                { $pull: { followers: { username: req.body.username, user_id: req.body.id  } } },
                ( err, info ) => {
                    if(err) res.status(400).send(err);
                    res.status(200).json({ Following: doc, Followers: info });
                }
            )
        }
    )
})

module.exports = router;
