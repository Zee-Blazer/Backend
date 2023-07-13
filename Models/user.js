const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require("../Config/config").get(process.env.NODE_ENV);

//DOTENV CONFIGURATION
require('dotenv').config();

const SALT_I = 10;


const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    friends: [ String ],
    requests: [ 
        { username: String, user_id: String, accepted: Boolean }
    ],
    profile: {
        type: String,
    },
    token: {
        type: String
    }
}, { timestamps: true });


userSchema.pre('save', function(next) {
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(SALT_I, function(err, salt) {
            if(err) return next(err);

            bcrypt.hash( user.password, salt, function(err, hash) {
                if(err) return next(err);

                user.password = hash;
                next();
            } )
        })
    }
    else{
        next();
    }

});

userSchema.methods.comparePassword = function(cPassword, cb) {
    bcrypt.compare(cPassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch)
    })
}

userSchema.methods.changePwd = function(newPwd, cb) {
    var user = this;

    user.password = newPwd;
    user.save( function(err, user) {
        if(err) return cb(err);
        cb(null, user);
    } )
}

userSchema.methods.generateToken = function(cb) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), process.env.SECRET); // '18000s'

    user.token = token;
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user);
    })
}

userSchema.statics.findByToken = function(token, cb) {
    var user = this;

    jwt.verify(token, process.env.SECRET, function(err, decode) {
        if(err) return cb(err);

        user.findOne({"_id": decode, "token": token}, function(err, user) {
            if(err) return cb(err)
            cb(null, user)
        })
    })

}

userSchema.methods.deleteToken = function(token, cb) {
    var user = this;

    user.updateOne({$unset: {token: 1}}, (err, user) => {
        if(err) return cb(err);
        cb(null, user);
    })
}

const User = mongoose.model("User", userSchema);


module.exports = { User };

