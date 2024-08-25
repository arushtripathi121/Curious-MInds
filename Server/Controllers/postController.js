const User = require('../Models/userModel');
const Post = require('../Models/postModel');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

// Configure multer for file handling
const storage = multer.memoryStorage(); // Use memoryStorage to get files as Buffer
const upload = multer({ storage });

const fileUploadToCloudinary = async (file, folder, type) => {
    const options = { folder };
    if (type === 'video') {
        options.resource_type = type;
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

exports.createPost = async (req, res) => {
    try {
        const { user, body, userName } = req.body;
        const files = req.files; // req.files is an array of files

        if (!files || !Array.isArray(files)) {
            return res.status(400).json({
                success: false,
                message: "No files uploaded or files are not in an array"
            });
        }

        let imageUrls = [];
        const cloudinaryFolder = `BackEnd-tut/${Date.now()}`;

        await Promise.all(files.map(async (file) => {
            const fileType = file.originalname.split('.').pop().toLowerCase();
            const isImage = ["jpg", "jpeg", "png"].includes(fileType);
            const isVideo = ["mp4", "webm", "wmv"].includes(fileType);

            if (!isImage && !isVideo) {
                throw new Error('Unsupported file type');
            }

            const response = await fileUploadToCloudinary(file, cloudinaryFolder, isVideo ? 'video' : undefined);
            imageUrls.push(response.secure_url);
        }));

        const postData = {
            user: user,
            body: body,
            userName: userName,
            imageUrl: imageUrls // Array of image/video URLs
        };

        const newPost = await Post.create(postData);
        await User.findByIdAndUpdate(user, { $push: { posts: newPost._id } }, { new: true }).populate("posts").exec();

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
};

exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        console.log(postId);

        const post = await Post.findById({ _id: postId });

        if (!post) {
            return res.status(400).json({
                success: false,
                message: 'Post not found'
            });
        }

        const userId = post.user;

        await Post.findByIdAndDelete(postId);

        await User.findByIdAndUpdate(userId, { $pull: { posts: postId } });

        res.status(200).json({
            success: true,
            message: 'Post deleted successfully'
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            message: 'Something went wrong'
        });
    }
};

exports.getPost = async (req, res) => {
    try {
        const { user } = req.body;
        console.log('user-> ', user);
        const posts = await Post.find({ user }).populate("comments").populate("likes").populate("user").exec();
        res.json({
            posts,
        });
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            success: false,
            message: 'Something went wrong'
        });
    }
};

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
};
