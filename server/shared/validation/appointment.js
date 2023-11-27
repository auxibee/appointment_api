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

module.exports = { appointmentValidation };
