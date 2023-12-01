const statusCodes = require("../shared/statusCodes");
const { AdminService } = require("./admin.service");
const Service = new AdminService();

async function createAppointmentDaysHandler(req, res) {
  const { year, month } = req.body;
  const response = await Service.createDays(year, month);
  res.status(statusCodes.CREATED).json(response);
}

async function updateAppointmentDaySlotsHandler(req, res) {
  const { slots } = req.body;
  const { appointmentDayId } = req.params;
  const appointmentday = await Service.updateAppointmentDaySlots(
    appointmentDayId,
    slots
  );
  res.json({ name: "yaw" });
}

async function loadAppointmentDay(req, res, next, appointmentDayId) {
  const appointmentDay = await Service.findAppointmentDayById(appointmentDayId);
  if (!appointmentDay) {
    res.status(statusCodes.NOT_FOUND).json({ message: "not found" });
  }
  req.appointmentDay = appointmentDay;
  next();
}

async function getAppointmentDayHandler(req, res) {
  res.json(req.appointmentDay);
}

module.exports = {
  getAppointmentDayHandler,
  createAppointmentDaysHandler,
  updateAppointmentDaySlotsHandler,
  loadAppointmentDay,
};
