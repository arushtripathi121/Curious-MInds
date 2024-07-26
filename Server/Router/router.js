const express = require('express');
const router = express.Router();

const { testController } = require("../Controllers/test");

const { signUp, logIn } = require("../Controllers/userController");

const { createPost, deletePost } = require("../Controllers/postController");

const { likePost, dislikePost } = require("../Controllers/likeController");

const { commentPost, deleteComment } = require("../Controllers/commentController");

const { follow } = require('../Controllers/followerController');

const {auth, isUser, isAdmin} = require('../Middleware/auth');

router.post('/test', testController);

router.post('/user/signUp', signUp);
router.post('/user/logIn', logIn);

router.post('/user/createPost', createPost);
router.post('/user/deletePost/:id', deletePost);

router.post('/user/likePost', likePost);
router.post('/user/dislikePost/:id', dislikePost);

router.post('/user/commentPost', commentPost);
router.post('/user/deleteComment/:id', deleteComment);

router.post('/user/follow/:id', follow);


router.get('/user', auth, isUser, (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to the protected route for students'
    })
})

router.get('/admin', auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to the protected route for Admin'
    })
})

module.exports = router;