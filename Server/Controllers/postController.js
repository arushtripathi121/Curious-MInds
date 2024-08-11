const User = require('../Models/userModel');
const Post = require('../Models/postModel');
const Follower = require('../Models/followerModel')

exports.createPost = async (req, res) => {
    try {
        
        const { user, body, userName } = req.body;
        console.log(user, " " ,body, " ", userName);
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
        console.log('user-> ',user);
        const posts = await Post.find({user}).populate("comments").populate("likes").populate("user").exec();
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
    try {
        const posts = await Post.find().populate("comments").populate("likes").exec();
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