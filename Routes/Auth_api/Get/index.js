const express = require('express');
const router = express.Router();

// Middlewares
const { auth } = require('../../../Middlewares/auth');

const { User } = require('../../../Models/user');

router.get('/isAuth', auth, (req, res) => {
    res.json({
        isAuth: true,
        id: req.user._id,
        email: req.user.email,
        username: req.user.username
    })
})

router.get('/users', (req, res) => {
    User.find( (err, doc) => {
        if(err) return res.status(404).send(err);
        res.status(200).send(doc)
    } )
} )

router.get('/specific/user/:user_id', (req, res) => {
    User.findOne({_id: req.params.user_id}, (err, doc) => {
        if(err) return res.status(500).send(err);
        res.status(200).send(doc);
    })
})


module.exports = router;
