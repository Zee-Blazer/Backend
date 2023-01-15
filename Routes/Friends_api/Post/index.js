const express = require('express');
const router = express.Router();

// User Model
const { User } = require('../../../Models/user');


// Adding a new friend
router.post("/new", (req, res) => {
    User.findOneAndUpdate(
        { _id: req.body.user_id },
        { $addToSet: { friends: req.body.details.new } },
        (err, doc) => {
            if(err) return res.status(400).send(err);
            res.status(200).send(doc);
        }
    )
})

// Making the friends as an notification.
// And also for the purpose of accepting friend requests.
router.post('/check', (req, res) => {
    const mainDetails = req.body.details;
    let allData;
    User.findById( req.body.user_id, (err, doc) => {
        if(err) return res.status(400).json({ msg: "There was an error", err });
        allData = doc.requests;
        console.log(allData);

        let mainData = allData.filter( item => item._id == req.body.details._id );
        console.log(mainData);
        let newData = [...mainData, req.body.details];
        console.log(newData);

        User.findOneAndUpdate(
            { _id: req.body.user_id },
            { $pull: { requests: { user_id: req.body.details.user_id } } },
            (err, doc) => {
                if(err) return res.status(400).send(err);
                User.findOneAndUpdate(
                    { _id: req.body.user_id },
                    { $addToSet: { requests: [...newData] } },
                    (err, doc) => {
                        if(err) return res.status(400).send(err);
                        res.status(200).send(doc);
                    }
                )
            }
        )

    } )

})

module.exports = router;
