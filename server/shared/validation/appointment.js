/* eslint-disable import/no-extraneous-dependencies */
const { check } = require("express-validator");
const { requestValidator } = require("../middlewares/requestValidator");

const appointmentValidation = [
  check("appointmentDayId")
    .notEmpty()
    .withMessage("appointmentDayId is required")
    .isNumeric()
    .withMessage("appointmentDayId should be valid"),

  requestValidator,
];

const appointmentDetailsValidation = [
  check("firstName")
    .notEmpty()
    .withMessage("First Name is required")
    .isString()
    .withMessage("First Name should be valid"),

  check("lastName")
    .notEmpty()
    .withMessage("Last Name is required")
    .isString()
    .withMessage("Last Name should be valid"),

  requestValidator,
];

module.exports = { appointmentValidation, appointmentDetailsValidation };
