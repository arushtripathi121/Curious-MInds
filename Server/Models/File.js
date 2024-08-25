const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema ({
    name : {
        type: String,
        required: true,
    },
    attachmentUrl: {
        type: String,
    },
})

fileSchema.post("Save" , async function (doc) {
    try{
        console.log("Doc" , doc);
    }
    catch(e) {
        console.log(e);
    }
})

module.exports = mongoose.model("File", fileSchema);