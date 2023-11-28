/* eslint-disable class-methods-use-this */
const { Appointment, AppointmentDetail } = require("../../models");
const ApiError = require("../shared/utils/apiError");

const errorCodes = require("../shared/statusCodes");

class AppointmentService {
  async createAppointment(userId, appointmentDayId) {
    // a user can create only one appointment
    const appointment = await Appointment.findOne({
      where: { userId: userId },
    });

    if (appointment) {
      throw new ApiError(
        "Delete appointment before creating another one",
        errorCodes.FORBIDDEN
      );
    }
    return await Appointment.create(
      { userId, appointmentDayId },
      { returned: true }
    );
  }

  async addAppointmentDetail(appointmentId, firstName, lastName) {
    const details = await AppointmentDetail.create(
      { appointmentId, firstName, lastName },
      { returned: true }
    );

    return details;
  }

  async getUserAppointment(userId) {
    const appointment = await Appointment.findOne({
      where: { userId: userId },
      include: ["user", "appointmentDay", "appointmentDetails"],
    });
    return appointment ? appointment : {};
  }

  async deleteAppointmentDetail(appointmentDetailId) {
    const appointmentDetail = await AppointmentDetail.findOne({
      where: { id: appointmentDetailId },
    });
    console.log(appointmentDetail);
    // throw error when detail does not exits
    if (!appointmentDetail) {
      throw new ApiError(
        "Resource could not be deleted ",
        errorCodes.FORBIDDEN
      );
    }
    await appointmentDetail.destroy();
  }

  async updateAppointment(appointmentId, appointmentDayId) {
    await Appointment.update(
      { appointmentDayId: appointmentDayId },
      { where: { id: appointmentId } }
    );
  }

  async deleteAppointment(appointmentId) {
    const appointment = await Appointment.findOne({
      where: { id: appointmentId },
    });
    await appointment.destroy();
  }
}

module.exports = { AppointmentService };
