const express = require('express');
const router = express.Router();

// Models 
const { Status, DeletedStatus } = require('../../Models/status');

router.delete("/delete", (req, res) => {
    Status.findOne({ _id: req.body.id }, (err, doc) => {
        if(err) res.status(400).send(err);
        
        const deletedStatus = new DeletedStatus({
            user_id: doc.user_id,
            msg: doc.msg,
            time: doc.msg,
            fileUrl: doc.fileUrl
        })

        deletedStatus.save( err, info => {
            if(err) res.status(400).send(err);
            
            Status.deleteOne({ _id: req.body.id }, (err, item) => {
                if(err) res.status(400).send(err);
                res.status(200).send(item)
            });
        } )
    })
})

module.exports = router;
