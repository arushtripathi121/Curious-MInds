const User = require('../Models/userModel');
const Post = require('../Models/postModel');
const Like = require('../Models/likeModel');

exports.likePost = async (req, res) => {
    try {
        const { user, post } = req.body;


        const postExists = await Post.findById({ _id: post });
        console.log(postExists);
        const likeExist = postExists.likes.find(like => like.user === user);
        console.log(likeExist);
        const userExists = await User.findById({ _id: user });
        if (!postExists) {
            return res.status(400).json({
                success: false,
                message: 'Post does not exists'
            })
        }


        if (!userExists) {
            return res.status(400).json({
                success: false,
                message: 'User does not exists'
            })
        }

        if (likeExist) {
            return res.status(400).json({
                success: true,
                message: 'already liked the post'
            })
        }
        const like = new Like({
            user, post
        })

        const savesLike = await like.save();

        await Post.findByIdAndUpdate(post, { $push: { likes: savesLike._id } }, { new: true }).populate('likes').exec();
        await User.findByIdAndUpdate(user, { $push: { likes: savesLike._id } }, { new: true }).populate('likes').exec();
        res.status(200).json(
            {
                success: true,
                message: 'Liked successfully'
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


exports.dislikePost = async (req, res) => {
    try {
        const likeId = req.params.id;
        console.log(likeId);

        const dislike = await Like.findById({ _id: likeId });

        if (!dislike) {
            return res.Status(400).json({
                success: false,
                message: 'something went wrong'
            })
        }

        const userId = dislike.user;
        const postId = dislike.post;

        await Like.findByIdAndDelete(likeId);

        await User.findByIdAndUpdate(userId, { $pull: { likes: likeId } });
        await Post.findByIdAndUpdate(postId, { $pull: { likes: likeId } });

        res.status(200).json(
            {
                success: true,
                message: 'unliked successfully'
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