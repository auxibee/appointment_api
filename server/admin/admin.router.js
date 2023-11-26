const express = require('express');
const { createAppointmentDaysHandler, updateAppointmentDaySlotsHandler, loadAppointmentDay } = require('./admin.controller');
const { appointmentDaysValidation, updateAppointmentDaySlotsValidation } = require('../shared/validation/appointmentdays');

const router = express.Router();

router.post('/appointmentdays', appointmentDaysValidation, createAppointmentDaysHandler);
router.param('appointmentDayId', loadAppointmentDay)
router.put('/appointmentday/:appointmentDayId', updateAppointmentDaySlotsValidation, updateAppointmentDaySlotsHandler);

module.exports = router;
