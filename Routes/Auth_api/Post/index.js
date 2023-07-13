const express = require('express');
const router = express.Router();

// User model
const { User } = require('../../../Models/user');

// Middleware
const { auth } = require('../../../Middlewares/auth');

router.post('/signup', (req, res) => {
    const user = new User(req.body);

    user.save( (err, doc) => {
        if(err) return res.status(400).send(err);
        user.generateToken( (err, id) => {
            if(err) res.status(400).send(err);
            
            res.status(200).send(doc)
        } )
    } )
})

router.post('/login', (req, res) => {

    User.findOne({ email: req.body.email }, (err, user) => {
        if(!user) return res.json({ 
            isAuth: false, 
            msg: "User not found, Check email" 
        });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) return res.json({ 
                isAuth: false, 
                msg: "Incorrect Password" 
            })

            user.generateToken( (err, user) => {
                if(err) return res.status(400).send(err);
                res.status(200).json({ isAuth: true, user });
            } )
        })

    })

})

router.post('/change-pwd', (req, res) => {
    
    User.findOne( { email: req.body.email }, (err, user) => {
        if(!user) return res.json({ 
            isAuth: false, 
            msg: "User not found, Check email" 
        });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) return res.json({ 
                isAuth: false, 
                msg: "Incorrect Password" 
            })

            user.changePwd(req.body.newPwd, (err, user) => {
                if(err) return res.status(400).send(err);
                res.status(200).json({ isAuth: true, user })
            } )
        })
    } )

})

router.post('/logout', auth, (req, res) => {
    req.user.deleteToken(req.token, (err, user) => {
        if(err) return res.status(400).send(err);
        res.sendStatus(200);
    })
})

module.exports = router;
