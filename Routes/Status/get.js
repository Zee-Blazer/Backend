const express = require('express');
const router = express.Router();

// Models
const { Status } = require('../../Models/status');

router.get('/all/status', (req, res) => {
    Status.find( {}, (err, doc) => {
        if(err) res.status(400).send(err)
        res.status(200).send(doc);
    } )
})

router.get('/image/:name', (req, res) => {
    res.sendFile(__dirname + `/Statuses/${req.params.name}`);
})

module.exports = router;
