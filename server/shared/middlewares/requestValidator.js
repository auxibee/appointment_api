/* eslint-disable import/no-extraneous-dependencies */
const { validationResult } = require('express-validator');
const ApiError = require('../utils/apiError');

function requestValidator(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(errors.array(), 403);
  }
  next();
}

module.exports = { requestValidator };
