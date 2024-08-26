const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    body: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    imageUrl: [{
        type: String,
    }],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "like"
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment"
        }
    ],
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('post', postSchema);
