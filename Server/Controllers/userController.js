const user = require('../Models/userModel');
const bcrypt = require('bcrypt');

exports.signUp = async (req, res) => {
    try {
        const { userName, name, email, password, dateOfBirth } = req.body;

        const findUser = user.findOne({ email: email });

        if (findUser) {
            return res.status(400).json({
                success: false,
                message: 'user already exists'
            })
        }

        const hashedPassword = bcrypt.hash(password, saltRounds, (err) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: 'Something went wrong'
                })
            }
        });

        if (hashedPassword) {
            const newUser = await user.Create({
                userName, name, email, hashedPassword, dateOfBirth
            })
        };

        newUser.password = undefined;
        newUser.id = undefined;
        res.status(200).json({
            success: true,
            data: newUser,
            message: 'user created successfully'
        })
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again later!!'
        })
    }
}