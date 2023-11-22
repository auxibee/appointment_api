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
     
        const res = await AppointmentDay.bulkCreate(days, {returned: true})
        return res
      }
    
      async updateAppointmentDaySlots(id, slots) {
        await updateSlot(id, slots);
      }
}

module.exports = { AdminService }