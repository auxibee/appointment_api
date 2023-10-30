const express = require('express');
const { createAppointmentDaysHandler, updateAppointmentDaySlotsHandler } = require('./appointmentdays.controller');
const { appointmentDaysValidation, updateAppointmentDaySlotsValidation } = require('../shared/validation/appointmentdays');

const router = express.Router();

router.post('/', appointmentDaysValidation, createAppointmentDaysHandler);
router.put('/:id', updateAppointmentDaySlotsValidation, updateAppointmentDaySlotsHandler);

module.exports = router;
