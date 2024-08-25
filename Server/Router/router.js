const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Import controllers
const { testController } = require("../Controllers/test");
const { signUp, logIn, getUserById, getUserByName } = require("../Controllers/userController");
const { createPost, deletePost, getPost, getAllPost } = require("../Controllers/postController");
const { likePost, dislikePost, getLikes } = require("../Controllers/likeController");
const { commentPost, deleteComment, getComments } = require("../Controllers/commentController");
const { follow, unfollow, checkFollowStatus } = require('../Controllers/followerController');
const { auth, isUser, isAdmin } = require('../Middleware/auth');

// Multer setup for file uploads
const storage = multer.memoryStorage(); // Use memoryStorage to get files as Buffer
const upload = multer({ storage });

router.post('/test', testController);

router.post('/user/signUp', signUp);
router.post('/user/logIn', logIn);
router.post('/user/getUserById', getUserById);
router.post('/user/getUserByName', getUserByName);

router.post('/user/createPost', upload.array('file'), createPost);
router.post('/user/deletePost/:id', deletePost);
router.post('/user/getPost', getPost);
router.post('/user/getAllPosts', getAllPost);

router.post('/user/likePost', likePost);
router.post('/user/getLikes', getLikes);
router.post('/user/dislikePost/:id', dislikePost);

router.post('/user/commentPost', commentPost);
router.post('/user/deleteComment/:id', deleteComment);
router.post('/user/getComments', getComments);

router.post('/user/follow', follow);
router.post('/user/unfollow', unfollow);
router.post('/user/checkFollowStatus', checkFollowStatus);

router.get('/user', auth, isUser, (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to the protected route for users'
    });
});

router.get('/admin', auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to the protected route for Admin'
    });
});

module.exports = router;
