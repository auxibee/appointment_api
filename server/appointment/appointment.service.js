/* eslint-disable class-methods-use-this */
const { Appointment,AppointmentDetail } = require('../../models')
const ApiError = require('../shared/utils/apiError');

class AppointmentService {
  async createAppointment(userId, appointmentDayId) {
    const appointment = await Appointment.findOne({where: {userId: userId}});
    
    if (appointment) {
      throw new ApiError('Delete appointment before creating another one', 403);
    }
    await Appointment.create({userId, appointmentDayId});
  }

  async addAppointmentDetail(appointmentId, firstName, lastName){
    await AppointmentDetail.create({appointmentId, firstName, lastName})
}

async getUserAppointment(userId){
  const appointment = await Appointment.findOne({where: {userId: userId}, include: ['user','appointmentDay','appointmentDetails']})
  return appointment ? appointment : {}
}

async deleteAppointmentDetail(appointmentDetailId){
  const appointmentDetail = await AppointmentDetail.findOne({where: {id: appointmentDetailId}})
  console.log(appointmentDetail);
  // throw error when detail does not exits
  if(!appointmentDetail){
    throw new ApiError('Resource could not be deleted ', 403)
  }
  await appointmentDetail.destroy()
}



  async updateAppointment(appointmentId, appointmentDayId) {
    await Appointment.update({appointmentDayId: appointmentDayId}, {where : {id: appointmentId}})
  }

  async deleteAppointment(appointmentId) {
    const appointment = await Appointment.findOne({where: {id: appointmentId}});
    await appointment.destroy()
  }
}

module.exports = { AppointmentService };
