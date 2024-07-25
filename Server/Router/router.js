const express = require('express');
const router = express.Router();

const { testController } = require("../Controllers/test");

const { signUp } = require("../Controllers/userController");

router.post('/test', testController);
router.post('/user/signUp', signUp);

module.exports = router;