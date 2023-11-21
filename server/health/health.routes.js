const express = require('express');
const { checkApiHealth } = require('./health.controller');

const router = express.Router();

router.get('/', checkApiHealth);

module.exports = router;
