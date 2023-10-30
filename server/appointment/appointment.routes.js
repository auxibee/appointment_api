const expresss = require('express');
const { createAppointmentHandler } = require('./appointment.controller');

const router = expresss.Router();

router.post('/', createAppointmentHandler);

module.exports = router;
