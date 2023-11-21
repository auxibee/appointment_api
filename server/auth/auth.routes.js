const express = require('express');
const { newUserHandler, loginHandler } = require('./auth.controller');
const { authValidation } = require('../shared/validation/auth');

const router = express.Router();

router.post('/signup', authValidation, newUserHandler);
router.post('/login', authValidation, loginHandler);

module.exports = router;
