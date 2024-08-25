const File = require('../Models/File');
const cloudinary = require('cloudinary').v2;

exports.localFileUpload = async (req, res) => {
    try {
        const file = req.files.file;
        console.log('File printed: ', file);
        let path = __dirname + "/files/" + Date.now() + '.' + `${file.name.split('.')[1]}`;
        console.log(path);
        file.mv(path, (e) => {
            console.log(e);
        });

        res.status(200).json({
            success: true,
            message: "Local file uploaded successfully"
        });
    }
    catch (e) {
        console.log('not able to upload files on server');
        console.log(e);
    }
}

const isFileTypeSupported = (type, supported) => {
    return supported.includes(type);
}


const fileUploadToCloudinary = async (file, folder, type) => {
    const options = { folder }
    console.log('tempFilePath=>', file.tempFilePath);

    if(type == 'video'){
        options.resource_type = type;
    }
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req, res) => {
    try {
        const { name} = req.body;
        console.log(name);
        const file = req.files.imageFile;
        console.log(file);
        //validation

        const supportedType = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        const fileSupported = isFileTypeSupported(fileType, supportedType);

        if (!fileSupported) {
            return res.status(400).json({
                success: false,
                message: 'Wrong type of file'
            })
        }

        const response = await fileUploadToCloudinary(file, "BackEnd-tut");
        console.log(response);
        // save entry to db

        const fileData = await File.create({
            name, imageUrl: response.secure_url
        })
        res.status(200).json({
            success: true,
            data: response.secure_url,
            message: 'File uploaded succesfully'
        })
    }
    catch (e) {
        console.log(e);
        res.status(400).json({
            success: false,
            message: 'failed'
        })
    }
}


exports.videoUpload = async (req, res) => {
    try {
        const { name} = req.body;
        console.log(name, email, tag);
        const file = req.files.videoFile;
        console.log(file);
        //validation

        const supportedType = ["mp4", "webm", "wmv"];
        const fileType = file.name.split('.')[1].toLowerCase();

        const fileSupported = isFileTypeSupported(fileType, supportedType);

        if (!fileSupported) {
            return res.status(400).json({
                success: false,
                message: 'Wrong type of file'
            })
        }

        const response = await fileUploadToCloudinary(file, "BackEnd-tut", "video");
        console.log(response);
        // save entry to db

        const fileData = await File.create({
            name, tag, email, imageUrl:response.secure_url
        })

        res.status(200).json({
            success: true,
            // data: response.secure_url,
            message: 'File uploaded succesfully'
        })
    }
    catch (e) {
        console.log(e);
        res.status(400).json({
            success: false,
            message: 'failed'
        })
    }
}