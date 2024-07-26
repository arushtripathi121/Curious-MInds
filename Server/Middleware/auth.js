const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = (req, res, next) => {
    try {
        const token = req.body.token || request.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token not found',
            })
        }

        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.user = payload;
            console.log(payload);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json({
                success: false,
                message: 'Unable to validate token'
                })
        }
    } catch (error) {
        return res.status(401).json({
            success:false,
            message: 'Please try again later'
        })
    }
    next();
}


exports.isUser = (req, res, next) => {
    try {
        const  role  = req.user.role;
        if(role != 'User'){
            return res.status(200).json({
                success: false,
                message: 'Unauthorized'
            })
        }
        next();
    }
    catch(e){
        res.status(401).json({
            success: false,
            message: 'please try again'
        })
    }
}

exports.isAdmin = (req, res, next) => {
    try {
        const  role  = req.user.role;
        if(role != 'Admin'){
            return res.status(200).json({
                success: false,
                message: 'Unauthorized'
            })
        }
        next();
    }
    catch(e){
        res.status(401).json({
            success: false,
            message: 'please try again'
        })
    }
}