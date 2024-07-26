const mongoose = require('mongoose');
const mailSender = require('../Config/mailSender');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['Admin', 'User'],
        default: 'User',
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"post"
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"like"
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"comment"
    }],
    dateAdded: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now(),
    }
})

userSchema.post("save", async function (doc) {
    try {
        console.log("Doc", doc);
        const info = await mailSender(doc);
        console.log(info);
    }
    catch (e) {
        console.log(e);
    }
})

module.exports = mongoose.model('user', userSchema);