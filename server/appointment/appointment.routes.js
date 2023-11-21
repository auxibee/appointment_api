const expresss = require('express');
const { createAppointmentHandler, deleteAppointmentHandler, updateAppointmentHandler, addAppointmentDetailHandler, deleteAppointmentDetailHandler, getUserAppointmentHandler } = require('./appointment.controller');
const { appointmentAuth } = require('../shared/middlewares/appointmentAuth');

const router = expresss.Router();

router.get('/',getUserAppointmentHandler)
router.post('/', createAppointmentHandler);
router.put('/:id',appointmentAuth, updateAppointmentHandler)
router.delete('/:id',appointmentAuth,deleteAppointmentHandler)
router.post('/:id/appointmentDetails', appointmentAuth, addAppointmentDetailHandler)
router.delete('/:id/appointmentDetails', appointmentAuth, deleteAppointmentDetailHandler)

module.exports = router;
