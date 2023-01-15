const { User } = require('../Models/user');

const auth = (req, res, next) => {
    let token = req.body.token;

    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({ error: true })

        req.token = token;
        req.user = user;
        next();
    })
}

module.exports = { auth };
