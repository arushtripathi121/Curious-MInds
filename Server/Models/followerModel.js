const mongoose = require('mongoose');

const followerSchema = new mongoose.Schema({
    user: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
    },
    userFollowed: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
    }
})

module.exports = mongoose.model('follower', followerSchema);