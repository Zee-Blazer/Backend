const express = require('express');
const router = express.Router();

// Models
const { Post } = require('../../Models/posts');

router.get('/all/posts', (req, res) => {
    Post.find( {}, (err, doc) => {
        if(err) res.status(400).send(err);
        res.status(200).send(doc);
    } )
})

router.get('/image/:name', (req, res) => {
    res.sendFile(__dirname + `/Posts/${req.params.name}`);
})

router.get("/specific/user/:user_id", (req, res) => {
    Post.find( {user_id: req.params.user_id}, (err, doc) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(doc);
    } )
})

router.get("/specific/comment/:user_id", (req, res) => {
    Post.find( { _id: req.params.user_id }, (err, doc) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(doc[0].comments)
    } )
})

module.exports = router;
