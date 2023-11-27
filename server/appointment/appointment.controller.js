const statusCodes = require("../shared/statusCodes");
const { AppointmentService } = require("./appointment.service");

const Service = new AppointmentService();

async function getUserAppointmentHandler(req, res) {
  const appointment = await Service.getUserAppointment(req.user.id);
  res.json(appointment);
}

async function createAppointmentHandler(req, res) {
  const { appointmentDayId } = req.body;

  const appointment = await Service.createAppointment(
    req.user,
    appointmentDayId
  );

  res.status(statusCodes.CREATED).json(appointment);
}

async function addAppointmentDetailHandler(req, res) {
  const { firstName, lastName } = req.body;
  const { id } = req.params;
  Service.addAppointmentDetail(id, firstName, lastName);
  res.json({ message: "created" });
}

async function updateAppointmentHandler(req, res) {
  const { appointmentDayId } = req.body;
  const { id } = req.params;
  await Service.updateAppointment(id, appointmentDayId);
  res.json({ message: "updated" });
}

async function deleteAppointmentHandler(req, res) {
  const { id } = req.params;
  await Service.deleteAppointment(id);
  res.json({ message: "deleted" });
}

async function deleteAppointmentDetailHandler(req, res) {
  const { detailId } = req.query;
  await Service.deleteAppointmentDetail(detailId);
  res.json({ message: "deleted" });
}

module.exports = {
  createAppointmentHandler,
  deleteAppointmentHandler,
  updateAppointmentHandler,
  addAppointmentDetailHandler,
  deleteAppointmentDetailHandler,
  getUserAppointmentHandler,
};
