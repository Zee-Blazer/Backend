const express = require('express');
const router = express.Router();

// User Model
const { User } = require('../../../Models/user');

// Friends list(all the users in the collection of users)
router.get("/list", (req, res) => {
    User.find( (err, doc) => {
        if(err) return res.status(404).json({ msg: "There was an err", err });
        res.status(200).send(doc);
    } )
})

// Get those yet to be your friend
router.get('/getall/:user_id', (req, res) => {
    User.find( (err, doc) => {
        if(err) return (res.status(400)).send(err);
        const dataStore = doc;
        let dataRecord = [];
        let mainData = [];

        // console.log(req.params.user_id);
        // res.status(200).send(doc);

        User.find( { _id: req.params.user_id }, (err, doc) => {
            if(err) return res.status(400).send(err);
            for(let i=0; i<doc[0].requests.length; i++){
                dataRecord.push(doc[0].requests[i].user_id.toString());
            }
            
            let newData = dataStore.filter( (item) => ( dataRecord.includes(item._id.toString()) ) ? false : true );
            let currentData = newData.filter( item => item._id != req.params.user_id );
            console.log(currentData);

            res.status(200).send(currentData);
        } )

    } )
})

// Get all the friends list of a specific user
router.get('/myfriends', (req, res) => {
    User.findById(req.query.user_id, (err, doc) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(doc.friends);
    })
})

// Get the friend request of a particular user
router.get('/getrequests/:user_id', (req, res) => {
    User.findOne( { _id: req.params.user_id }, (err, doc) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({ msg: "Accurate Request", data: doc.requests });
    } )
})

// Get a specific user
router.get('/getuser', (req, res) => {
    User.findOne( { _id: req.query.user_id }, (err, doc) => {
        if(err) res.status(400).send(err);
        res.status(200).send(doc);
    } )
})

module.exports = router;
