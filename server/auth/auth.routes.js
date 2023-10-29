const express = require('express');
const { newUserHandler } = require('./auth.controller');

const router = express.Router();

router.post('/', newUserHandler);

module.exports = router;
