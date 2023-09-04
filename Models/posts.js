const mongoose = require('mongoose');

const important = {
    type: String,
    required: true
};

const postSchema = mongoose.Schema({
    user_id: important,
    msg: {
        type: String
    },
    likes: {
        type: Number,
    },
    comments: [
        { username: String, user_id: String, msg: String }
    ],
    peopleLike: [ String ],
    fileUrl: String,
    date: important
});

const Post = mongoose.model("Posts", postSchema);
const DeletePost = mongoose.model("DeletedPosts", postSchema);

module.exports = { Post, DeletePost };
