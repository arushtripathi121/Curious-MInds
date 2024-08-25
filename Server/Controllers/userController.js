const user = require('../Models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fileUploadToCloudinary = require("../Config/cloudinary");

exports.signUp = async (req, res) => {
    try {
        const { userName, name, email, password, dateOfBirth } = req.body;
        console.log(userName, name, email, password, dateOfBirth);

        // Check if a user already exists with the provided email
        const findUser = await user.findOne({ email });
        if (findUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        // Hash the password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (e) {
            return res.status(400).json({
                success: false,
                message: 'Password hashing failed'
            });
        }

        // Handle file upload for profile photo
        let profilePhoto = '';
        const cloudinaryFolder = "BackEnd-tut";

        if (req.file) { // Use req.file for a single file
            const file = req.file; // Access the single file object

            if (!file.buffer) {
                throw new Error('File buffer is missing');
            }

            const fileType = path.extname(file.originalname).toLowerCase();
            const isImage = ['.jpg', '.jpeg', '.png'].includes(fileType);

            if (!isImage) {
                return res.status(400).json({
                    success: false,
                    message: 'Unsupported file type. Only image files are allowed.'
                });
            }

            try {
                const response = await fileUploadToCloudinary(file, cloudinaryFolder, 'image');
                profilePhoto = response.secure_url;
                console.log('Profile photo uploaded successfully:', profilePhoto);
            } catch (uploadError) {
                console.error(`Error uploading file ${file.originalname}:`, uploadError.message);
                // Continue user creation even if file upload fails
            }
        }

        // Create the new user
        const newUser = await user.create({
            userName,
            name,
            email,
            password: hashedPassword,
            dateOfBirth,
            profilePhoto // Save the profile photo URL with the user
        });

        const data = {
            userName: newUser.userName,
            email: newUser.email,
            profilePhoto: newUser.profilePhoto // Include profile photo URL in response
        };

        res.status(200).json({
            success: true,
            data: data,
            message: 'User created successfully'
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again later!'
        });
    }
};

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

        if (!search) {
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

exports.updateUserById = async (req, res) => {
    try {
        const userId = req.params.id; // Get user ID from request parameters
        const { userName, name, email, dateOfBirth } = req.body;
        const file = req.file; // Assuming single file upload

        // Validate input
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required'
            });
        }

        // Prepare update data
        let updateData = { userName, name, email, dateOfBirth };

        // Handle file upload for profile photo
        if (file && file.buffer) {
            const fileType = path.extname(file.originalname).toLowerCase();
            const isImage = ['.jpg', '.jpeg', '.png'].includes(fileType);

            if (!isImage) {
                return res.status(400).json({
                    success: false,
                    message: 'Unsupported file type. Only image files are allowed.'
                });
            }

            try {
                const response = await fileUploadToCloudinary(file, 'BackEnd-tut', 'image');
                updateData.profilePhoto = response.secure_url;
            } catch (uploadError) {
                console.error(`Error uploading file ${file.originalname}:`, uploadError.message);
                // Continue update even if file upload fails
            }
        }

        // Update user in the database
        const updatedUser = await user.findByIdAndUpdate(userId, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const data = {
            userName: updatedUser.userName,
            email: updatedUser.email,
            profilePhoto: updatedUser.profilePhoto
        };

        res.status(200).json({
            success: true,
            data: data,
            message: 'User updated successfully'
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again later!'
        });
    }
};
