const { User, AppointmentDay } = require("../../../models");
const statusCodes = require("../statusCodes");
const ApiError = require("../utils/apiError");

async function isValidAppointment(req, res, next) {
  const { appointmentDayId } = req.body;

  const appointmentDay = await AppointmentDay.findByPk(appointmentDayId);

  if (!appointmentDay) {
    throw new ApiError("Something went wrong", statusCodes.FORBIDDEN);
  }

  next();
}

module.exports = { isValidAppointment };
