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

module.exports = router;
