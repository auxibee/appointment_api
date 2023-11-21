const expresss = require('express');
const { createAppointmentDetailsHandler } = require('./appointmentDetails.controller');
const { appointmentAuth } = require('../shared/middlewares/appointmentAuth');

const router = expresss.Router();

router.post('/:id',appointmentAuth, createAppointmentDetailsHandler);


module.exports = router;
