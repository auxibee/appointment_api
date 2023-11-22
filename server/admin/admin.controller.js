const statusCodes = require('../shared/statusCodes');
const { AdminService } = require('./admin.service')
const Service = new AdminService()

async function createAppointmentDaysHandler(req, res) {
    const { year, month } = req.body;
    const response = await Service.createDays(year, month);
    res.status(statusCodes.CREATED).json(response);
  }
  
  async function updateAppointmentDaySlotsHandler(req, res) {
    const { slots } = req.body;
    const { id } = req.params;
    await Service.updateAppointmentDaySlots(id, slots);
    res.json({ message: 'updated' });
  }
  
  module.exports = { createAppointmentDaysHandler, updateAppointmentDaySlotsHandler };
  