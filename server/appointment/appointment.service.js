/* eslint-disable class-methods-use-this */
const {
  insertAppointment, updateAppointment, deleteAppointment, getAppoitmentByUserId,
} = require('../shared/queries/appointment');
const ApiError = require('../shared/utils/apiError');

class AppointmentService {
  async createAppointment(userId, appointmentDateId) {
    const appointment = await getAppoitmentByUserId(userId);
    console.log(appointment);
    if (appointment !== 0) {
      throw new ApiError('Delete appointment before creating another one', 403);
    }
    await insertAppointment(userId, appointmentDateId);
  }

  async updateAppointment(appointmentId, appointmentDateId, userId) {
    await updateAppointment(appointmentId, appointmentDateId, userId);
  }

  async deleteAppointment(appointmentId, userId) {
    await deleteAppointment(appointmentId, userId);
  }
}

module.exports = { AppointmentService };
