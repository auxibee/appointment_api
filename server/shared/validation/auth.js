/* eslint-disable import/no-extraneous-dependencies */
const { check } = require('express-validator');
const { requestValidator } = require('../middlewares/requestValidator');

const authValidation = [
  check('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email should be valid'),

  check('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 5 })
    .withMessage('Password Lenght must be atleat 5 characters'),

  requestValidator,
];

module.exports = { authValidation };
