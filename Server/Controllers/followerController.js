const User = require('../Models/userModel');

exports.follow = async (req, res) => {
    try {
        const { user } = req.body;
        console.log(user);
        const followeeId = req.params.id;

        // Await the result of the findOne query
        const ifAlreadyFollowed = await User.findOne({ _id: user, followers: followeeId });

        if (ifAlreadyFollowed) {
            return res.status(400).json({
                success: false,
                message: 'Already Following'
            });
        }

        await User.findByIdAndUpdate(user, { $push: { followers: followeeId } }, { new: true }).populate('followers').exec();
        await User.findByIdAndUpdate(followeeId, { $push: { following: user } }, { new: true }).populate('following').exec();
        res.status(200).json({
            success: true,
            message: 'followed successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};
