const { AppointmentDaysService } = require('./appointmentdays.service');

const Service = new AppointmentDaysService();

async function createAppointmentDaysHandler(req, res) {
  const { year, month } = req.body;
  await Service.createDays(year, month);
  res.json({ message: 'created' });
}

async function updateAppointmentDaySlotsHandler(req, res) {
  const { slots } = req.body;
  const { id } = req.params;
  await Service.updateAppointmentDaySlots(id, slots);
  res.json({ message: 'updated' });
}

module.exports = { createAppointmentDaysHandler, updateAppointmentDaySlotsHandler };
