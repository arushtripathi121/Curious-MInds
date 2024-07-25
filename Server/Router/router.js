const express = require('express');
const router = express.Router();

const { testController } = require("../Controllers/test");

const { signUp, logIn } = require("../Controllers/userController");

const { createPost } = require("../Controllers/postController");

router.post('/test', testController);
router.post('/user/signUp', signUp);
router.post('/user/logIn', logIn);
router.post('/user/createPost', createPost);


module.exports = router;