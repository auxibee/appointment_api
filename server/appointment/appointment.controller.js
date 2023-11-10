const { AppointmentService } = require('./appointment.service');

const Service = new AppointmentService();

async function createAppointmentHandler(req, res) {
  const { userId, appointmentDateId } = req.body;

  await Service.createAppointment(userId, appointmentDateId);

  res.json({ message: 'created' });
}

module.exports = { createAppointmentHandler };
