const Post = require('../Models/postModel');
const User = require('../Models/userModel');
const cloudinary = require('cloudinary').v2;
const path = require('path');


fileUploadToCloudinary = async (file, folder, type) => {
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

// Controller to create a post
exports.createPost = async (req, res) => {
  try {
    const { user, body, userName } = req.body;
    const files = req.files || [];

    let imageUrls = [];
    const cloudinaryFolder = "BackEnd-tut";

    if (files.length > 0) {
      // Process files if present
      await Promise.all(files.map(async (file) => {
        if (!file.buffer) {
          throw new Error('File buffer is missing');
        }

        const fileType = path.extname(file.originalname).toLowerCase();
        const isImage = ['.jpg', '.jpeg', '.png'].includes(fileType);
        const isVideo = ['.mp4'].includes(fileType);

        if (!isImage && !isVideo) {
          throw new Error('Unsupported file type');
        }

        try {
          const response = await fileUploadToCloudinary(file, cloudinaryFolder, isVideo ? 'video' : 'image');
          imageUrls.push(response.secure_url);
        } catch (uploadError) {
          console.error(`Error uploading file ${file.originalname}:`, uploadError.message);
        }
      }));
    }

    const postData = {
      user: user,
      body: body,
      userName: userName,
      imageUrl: imageUrls
    };

    const newPost = await Post.create(postData);
    await User.findByIdAndUpdate(user, { $push: { posts: newPost._id } }, { new: true }).populate('posts').exec();

    res.status(200).json({
      success: true,
      message: 'Posted successfully',
    });
  } catch (e) {
    console.error('Error creating post:', e.message);
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
      message: 'Something went wrong',
      error: e
    });
  }
};

exports.getAllPost = async (req, res) => {
  const { followData } = req.body; // Assuming followData is an array of user IDs
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