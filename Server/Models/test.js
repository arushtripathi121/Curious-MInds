const mongoose = require('mongoose');

const test = new mongoose.Schema({
    name:{
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
    }
})

module.exports = mongoose.model('test', test);