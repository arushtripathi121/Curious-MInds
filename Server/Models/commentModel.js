const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    user: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    post:{
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }
})

module.exports = mongoose.model("comment", commentSchema);