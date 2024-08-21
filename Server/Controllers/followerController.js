const User = require('../Models/userModel');
const Follower = require('../Models/followerModel')


exports.follow = async (req, res) => {
    try {
        const { user, userFollowed } = req.body;
        console.log(user, userFollowed);

        // Await the result of the findOne query
        const ifAlreadyFollowed = await Follower.findOne({user:user, userFollowed: userFollowed});

        if (ifAlreadyFollowed) {
            return res.status(400).json({
                success: false,
                followStatus: true,
                message: 'Already Following',
                data: ifAlreadyFollowed,
            });
        }

        const newFollower = new Follower({
            user, userFollowed
        })

        const savedFollower = await newFollower.save();

        await User.findByIdAndUpdate(user, { $push: { followers: userFollowed } }, { new: true }).populate('followers').exec();
        await User.findByIdAndUpdate(userFollowed, { $push: { following: user } }, { new: true }).populate('following').exec();
        res.status(200).json({
            success: true,
            followStatus: true,
            message: 'followed successfully',
            data: savedFollower
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};


exports.checkFollowStatus = async (req, res) => {
    try {
        const { user, userFollowed } = req.body;
        console.log(user, userFollowed);

        const ifAlreadyFollowed = await Follower.findOne({user:user, userFollowed: userFollowed});

        if (ifAlreadyFollowed) {
            return res.status(200).json({
                success: true,
                followStatus: true,
                message: 'Already Following',
                data: ifAlreadyFollowed,
            });
        }

        return res.status(400).json({
            success: false,
            followStatus: false,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};


exports.unfollow = async (req, res) => {
    try {
        const { followId } = req.body;
        const follow = await Follower.findOne({_id: followId});
        console.log(follow);

        if(!follow){
            res.status(400).json({
                success: false,
                message: 'Somwthing went wrong',
            });
        }

        await Follower.findByIdAndDelete(followId);
        await User.findByIdAndUpdate(follow.user, { $pull: { followers: follow.userFollowed }});
        await User.findByIdAndUpdate(follow.userFollowed, { $pull: { following: follow.user }});

        res.status(200).json({
            success: true,
            message: 'unfollowed successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: 'Somwthing went wrong',
        });
    }
};