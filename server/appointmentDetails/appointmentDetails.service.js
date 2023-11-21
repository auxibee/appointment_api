const { AppointmentDetail } = require('../../models')

class AppointmentDetailsService{
    async addAppointmentDetail(appointmentId, firstName, lastName){
        await AppointmentDetail.create({appointmentId, firstName, lastName})
    }

    async updateAppointmentDetail(id, firstName, lastName){
        await AppointmentDetail.update({firstName, lastName}, {where : {id: id}})
    }
}

module.exports = { AppointmentDetailsService }