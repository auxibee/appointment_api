/* eslint-disable import/no-extraneous-dependencies */
const { check } = require('express-validator');
const { requestValidator } = require('../middlewares/requestValidator');

const appointmentDaysValidation = [
  check('year')
    .notEmpty()
    .withMessage('Year is required')
    .isNumeric()
    .withMessage('Year should be valid'),

  check('month')
    .notEmpty()
    .withMessage('Month cannot be empty')
    .isInt({min: 1, max: 12})
    .withMessage('Month should be valid'),

  requestValidator,
];

const updateAppointmentDaySlotsValidation = [
  check('slots')
    .notEmpty()
    .withMessage('Slots cannot be empty')
    .isInt({ min: 0, max: 10 })
    .withMessage('slots should be between 0 and 100'),
];

module.exports = { appointmentDaysValidation, updateAppointmentDaySlotsValidation };
