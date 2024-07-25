const express = require('express');
const router = express.Router();

const { testController } = require("../Controllers/test");

router.post('/test', testController);