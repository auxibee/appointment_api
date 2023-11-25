const { generateDays } = require('../shared/utils/generateDays');
const {AppointmentDay} = require('../../models')
const ApiError = require('../shared/utils/apiError');
const errorCodes = require('../shared/statusCodes');

class AdminService{

    async createDays(year, month) {
        const days = generateDays(year, month);
        const isDaysCreated = await AppointmentDay.findOne({where: {day: days[0].day}})
    
        if (isDaysCreated) {
          throw new ApiError('Days already created', errorCodes.FORBIDDEN);
        }
     
        const response = await AppointmentDay.bulkCreate(days, {returned: true})
        return response
      }
    
      async updateAppointmentDaySlots(id, slots) {
         const appointmentDay = await  AppointmentDay.findOne({where : { id : id}})
         console.log(appointmentDay);
         appointmentDay.slots = slots
         await appointmentDay.save()
         return appointmentDay 
        
        }
}

module.exports = { AdminService }