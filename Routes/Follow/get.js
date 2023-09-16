const express = require('express');
const router = express.Router();

// User Model
const { User } = require('../../Models/user');

router.get('/all-followers/:user_id', (req, res) => {
    User.findOne({ _id: req.params.user_id })
    .then( response => res.status(200).send(response.followers) )
    .catch( err => res.status(400).send(err) )
})

router.get('/all-following/:user_id', (req, res) => {
    User.findOne({ _id: req.params.user_id })
    .then( response => res.status(200).send(res.following) )
    .catch( err => res.status(400).send(err) )
})

module.exports = router;
