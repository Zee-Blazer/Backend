const express = require('express');
const router = express.Router();

// User model
const { User, DeleteUser } = require('../../../Models/user');

router.delete('/delete', (req, res) => {
    User.findOne({ _id: req.body.id }, (err, doc) => {
        if(err) res.status(400).send(err);

        const deleteUser = new DeleteUser({
            username: doc.username && doc.username,
            email: doc.email && doc.email,
            followers: doc.followers && doc.followers,
            following: doc.following && doc.following,
            friends: doc.friends && doc.friends,
            requests: doc.requests && doc.requests,
            profile: doc.profile && doc.profile
        });
        deleteUser.save( (err, info) => {
            if(err) res.status(400).send(err);

            User.deleteOne({ _id: req.body.id }, (err, item) => {
                if(err) res.status(400).send(err);

                res.status(200).send(item);
            })
        } )
    })
})

module.exports = router;
