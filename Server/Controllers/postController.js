const User = require('../Models/userModel');
const Post = require('../Models/postModel');
const Follower = require('../Models/followerModel')

exports.createPost = async (req, res) => {
    try {

        const { user, body, userName } = req.body;
        console.log(user, " ", body, " ", userName);
        const post = new Post({
            user, body, userName
        })
        const savedPost = await post.save();


        const updatePost = await User.findByIdAndUpdate(user, { $push: { posts: savedPost._id } }, { new: true }).populate('posts').exec();

        res.status(200).json(
            {
                success: true,
                message: 'Posted successfully'
            }
        )
    }
    catch (e) {
        console.log(e);
        console.log(e.message);
        res.status(404).json(
            {
                success: false,
                data: 'failed',
                message: e.message
            }
        )
    }
}

exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        console.log(postId);

        const post = await Post.findById({ _id: postId });

        if (!post) {
            return res.Status(400).json({
                success: false,
                message: 'something went wrong'
            })
        }

        const userId = post.user;

        await Post.findByIdAndDelete(postId);

        await User.findByIdAndUpdate(userId, { $pull: { posts: postId } });

        res.status(200).json(
            {
                success: true,
                message: 'Posted deleted successfully'
            }
        )
    }
    catch (e) {
        res.status(400).json(
            {
                success: false,
                message: 'Something went wrong'
            }
        )
    }
}

exports.getPost = async (req, res) => {
    try {
        const { user } = req.body;
        console.log('user-> ', user);
        const posts = await Post.find({ user }).populate("comments").populate("likes").populate("user").exec();
        res.json({
            posts,
        })
    }
    catch (e) {
        console.log(e);
        return res.status(400).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}

exports.getAllPost = async (req, res) => {
    const { followData } = req.body;  // Assuming followData is an array of user IDs
    console.log('following -> ', followData);

    try {
        const posts = await Post.find({ user: { $in: followData } })
            .populate("comments")
            .populate("likes")
            .populate("user") // Populates the user details for each post
            .exec();

        if (!posts.length) {
            return res.status(404).json({
                success: false,
                message: 'No posts found for the followed users'
            });
        }

        // Return the posts data in the response
        res.json({
            success: true,
            posts,
        });
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            success: false,
            message: 'Something went wrong'
        });
    }
}






///////////////////////////////////////////////////////////////////////////////////////////////



const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

const isFileTypeSupported = (type, supported) => {
    return supported.includes(type);
}

const fileUploadToCloudinary = async (file, folder, type) => {
    const options = { folder }
    if (type === 'video') {
        options.resource_type = type;
    }
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.upload = async (req, res) => {
    try {
        const { user, body, userName } = req.body;
        const files = req.files.file; // req.files.file can be an array of files

        if (!files || !Array.isArray(files)) {
            return res.status(400).json({
                success: false,
                message: "No files uploaded or files are not in an array"
            });
        }

        let imageUrls = [];

        // Create a Cloudinary folder based on the current timestamp
        const cloudinaryFolder = `BackEnd-tut/${Date.now()}`;

        // Use Promise.all to handle all files
        await Promise.all(files.map(async (file) => {
            const fileType = file.name.split('.').pop().toLowerCase();

            // Determine if the file is an image or a video
            const isImage = ["jpg", "jpeg", "png"].includes(fileType);
            const isVideo = ["mp4", "webm", "wmv"].includes(fileType);

            if (!isImage && !isVideo) {
                throw new Error('Unsupported file type');
            }

            // Upload the file to Cloudinary
            const response = await fileUploadToCloudinary(file, cloudinaryFolder, isVideo ? 'video' : undefined);
            imageUrls.push(response.secure_url);
        }));

        // Create post data
        const postData = {
            user: user,
            body: body,
            userName: userName,
            imageUrl: imageUrls // Array of image/video URLs
        };

        // Save to database
        const newPost = await Post.create(postData);
        await User.findByIdAndUpdate(user, {$push : {posts: newPost._id}} , {new: true}).populate("posts").exec();

        res.status(200).json({
            success: true,
            message: 'Posted successfully',
            data: newPost
        });

    } catch (e) {
        console.log(e.message);
        res.status(500).json({
            success: false,
            message: e.message
        });
    }
}
