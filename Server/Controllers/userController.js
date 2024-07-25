const user = require('../Models/userModel');
const bcrypt = require('bcrypt');

exports.signUp = async (req, res) => {
    try {
        const { userName, name, email, password, dateOfBirth } = req.body;

        const findUser = await user.findOne({email});

        if (findUser) {
            return res.status(400).json({
                success: false,
                message: 'user already exists'
            })
        }

        let hashedPassword
        try{
            hashedPassword = await bcrypt.hash(password, 10)
        }
        catch(e){
            return res.status(400).json({
                success: false,
                message: 'Something went wrong'
            })
        }

        const newUser = await user.create({
            userName, name, email, password: hashedPassword, dateOfBirth
        })

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