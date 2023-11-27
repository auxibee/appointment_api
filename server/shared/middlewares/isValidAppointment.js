const { User, AppointmentDay } = require("../../../models");
const statusCodes = require("../statusCodes");
const ApiError = require("../utils/apiError");

async function isValidAppointment(req, res, next) {
  const { userId, appointmentDayId } = req.body;
  const user = await User.findByPk(userId);
  const appointmentDay = await AppointmentDay.findByPk(appointmentDayId);

  if (!user || !appointmentDay) {
    throw new ApiError("Something went wrong", statusCodes.FORBIDDEN);
  }

  next();
}

module.exports = { isValidAppointment };
