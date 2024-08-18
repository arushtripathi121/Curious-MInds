const user = require('../Models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signUp = async (req, res) => {
    try {
        const { userName, name, email, password, dateOfBirth } = req.body;
        console.log(userName, name, email, password, dateOfBirth);

        const findUser = await user.findOne({ email });

        if (findUser) {
            return res.status(400).json({
                success: false,
                message: 'user already exists'
            })
        }

        let hashedPassword
        try {
            hashedPassword = await bcrypt.hash(password, 10)
        }
        catch (e) {
            return res.status(400).json({
                success: false,
                message: 'password hashing failed'
            })
        }

        const newUser = await user.create({
            userName, name, email, password: hashedPassword, dateOfBirth
        })

        const data = {
            userName: newUser.userName,
            email: newUser.email
        }
        res.status(200).json({
            success: true,
            data: data,
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

exports.logIn = async (req, res) => {
    try {
        const { userName, password, email } = req.body;

        const User = await user.findOne({ userName }) || await user.findOne({ email });

        if (!User) {
            return res.status(400).json({
                success: 'false',
                message: 'Some thing went wrong'
            })
        }

        const compare = await bcrypt.compare(password, User.password);

        if (!compare) {
            return res.status(400).json({
                success: 'false',
                message: 'Incorrect password'
            })
        }

        const payload = {
            email: user.email,
            id: user._id,
            role: user.role,
        }

        let token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 3600,
        });

        user.token = token;

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }

        res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            User,
            message: 'logged in successfully'
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again later!!'
        })
    }
}


exports.getUserById = async (req, res) => {
    try {
        const { userId } = req.body;
        console.log(userId);

        const userData = await user.findById({ _id: userId });

        if (!userData) {
            res.status(400).json(
                {
                    success: false,
                    message: 'No user found'
                }
            )
        }

        res.status(200).json({
            success: true,
            user: userData
        })
    }
    catch (e) {
        console.log(e);
        res.status(400).json(
            {
                success: false,
                message: 'Something went wrong'
            }
        )
    }
}

exports.getUserByName = async (req, res) => {
    try {
        const { search } = req.body;

        if(!search) {
            return res.status(400).json({
                success: false,
                message: 'No user found'
            });
        }
        const userData = await user.find({
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { userName: { $regex: search, $options: 'i' } }
            ]
        });

        if (!userData) {
            return res.status(400).json({
                success: false,
                message: 'No user found'
            });
        }

        let userDetails;
        if (userData) {
            userDetails = userData.map(userData => ({
                name: userData.name,
                id: userData._id
            }));
        }

        res.status(200).json({
            success: true,
            data: userDetails
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }

}