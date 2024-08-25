const cloudinary = require('cloudinary');

require('dotenv').config();

exports.connectToCloudinary = () => {
    try{
        cloudinary.config({
            cloud_name: process.env.cloud_name,
            api_key: process.env.api_key,
            api_secret: process.env.api_secret
        })
    }
    catch(e){
        console.log(e);
    }
}

exports.fileUploadToCloudinary = async (file, folder, type) => {
    const options = { folder };
    if (type === 'video') {
        options.resource_type = type;
    }
  
    // Check if file.buffer exists
    if (!file.buffer) {
        throw new Error('File buffer is missing');
    }
  
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(options, (error, result) => {
            if (error) {
                return reject(new Error(error.message));
            }
            resolve(result);
        }).end(file.buffer);
    });
  };