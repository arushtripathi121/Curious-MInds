// Router/router.js
const express = require('express');
const router = express.Router();
const upload = require('../Middleware/uploadMiddleware');

// Import controllers
const { signUp, logIn, getUserById, getUserByName } = require("../Controllers/userController");
const { createPost, deletePost, getPost, getAllPost } = require("../Controllers/postController");
const { likePost, dislikePost, getLikes } = require("../Controllers/likeController");
const { commentPost, deleteComment, getComments } = require("../Controllers/commentController");
const { follow, unfollow, checkFollowStatus } = require('../Controllers/followerController');
const { auth, isUser, isAdmin } = require('../Middleware/auth');

// Routes
router.post('/test', (req, res) => res.send('Test route'));

router.post('/user/signUp', signUp);
router.post('/user/logIn', logIn);
router.post('/user/getUserById', getUserById);
router.post('/user/getUserByName', getUserByName);
router.post('/user/createPost', upload.array('files'), createPost);
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
