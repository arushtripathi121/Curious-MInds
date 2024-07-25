const express = require('express');
const router = express.Router();

const { testController } = require("../Controllers/test");

const { signUp, logIn } = require("../Controllers/userController");

router.post('/test', testController);
router.post('/user/signUp', signUp);
router.post('/user/logIn', logIn);


module.exports = router;