const express = require('express');
const router = express.Router();

// Model
const { Post, DeletePost } = require('../../Models/posts');

router.delete('/delete', (req, res) => {
    Post.findOne({ _id: req.body.id }, (err, doc) => {
        if(err) res.status(400).send(err);

        const deletePost = new DeletePost({
            user_id: doc.user_id,
            msg: doc.msg,
            likes: doc.likes,
            comments: doc.comments,
            peopleLike: doc.peopleLike,
            fileUrl: doc.fileUrl,
            date: doc.date
        });
        deletePost.save( (err, info) => {
            if(err) res.status(400).send(err);
            
            Post.deleteOne({ _id: req.body.id }, (err, item) => {
                if(err) res.status(400).send(err);
                res.status(200).send(item);
            })
        } )
    })
})

module.exports = router;
