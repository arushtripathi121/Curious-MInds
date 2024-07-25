const User = require('../Models/userModel');
const Post = require('../Models/postModel');

exports.createPost = async (req, res) => {
    try {
        const { user, body } = req.body;
        const post = new Post({
            user, body
        })

        console.log(user);
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
        const { postId } = req.params;

        const post = await Post.findById(postId);

        if(!post) {
            return res.Status(400).json({
                success: false,
                message: 'something went wrong'
            })
        }

        const userId = post.user;

        await Post.findByIdAndDelete(postId);

        await User.findByIdAndDelete(userId, {$pull: {posts: postId}});

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