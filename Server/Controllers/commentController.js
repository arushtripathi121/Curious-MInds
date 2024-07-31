const Comment = require('../Models/commentModel');
const User = require('../Models/userModel');
const Post = require('../Models/postModel');

exports.commentPost = async (req, res) => {
    try {
        const { user, post, body } = req.body;
        console.log(user, " ", post, " ", body);
        const postExists = await Post.findById({ _id: post });
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
        const comment = new Comment({
            user, post, body
        })

        const savesComment = await comment.save();

        await Post.findByIdAndUpdate(post, { $push: { comments: savesComment._id } }, { new: true }).populate('comments').exec();
        await User.findByIdAndUpdate(user, { $push: { comments: savesComment._id } }, { new: true }).populate('comments').exec();
        res.status(200).json(
            {
                success: true,
                message: 'commented successfully'
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


exports.deleteComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        console.log(commentId);

        const deleteComment = await Comment.findById({ _id: commentId });

        if (!deleteComment) {
            return res.Status(400).json({
                success: false,
                message: 'something went wrong'
            })
        }

        const userId = deleteComment.user;
        const postId = deleteComment.post;

        await Comment.findByIdAndDelete(commentId);

        await User.findByIdAndUpdate(userId, { $pull: { comments: commentId } });
        await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } });

        res.status(200).json(
            {
                success: true,
                message: 'comment deleted successfully'
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

exports.getComments = async (req, res) => {
    try {
        const postId = req.body;
        console.log(postId.post);
        const id = postId.post;
        const findComments = await Comment.find({ post: id }).populate("user").exec();
        const userComments = findComments.map((comment) => ({
            id: comment._id,
            body: comment.body,
            user: comment.user,
            date: comment.date,
        }));

        res.status(200).json({
            userComments
        });
    }
    catch (e) {
        console.log(e);
        return res.status(400).json({
            success: false,
            message: 'Something went wrong'
        });
    }
};
