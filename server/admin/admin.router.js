const express = require('express');
const { createAppointmentDaysHandler, updateAppointmentDaySlotsHandler } = require('./admin.controller');
const { appointmentDaysValidation, updateAppointmentDaySlotsValidation } = require('../shared/validation/appointmentdays');

const router = express.Router();

router.post('/appointmentdays', appointmentDaysValidation, createAppointmentDaysHandler);
router.put('/appointmentday/:id', updateAppointmentDaySlotsValidation, updateAppointmentDaySlotsHandler);

module.exports = router;
