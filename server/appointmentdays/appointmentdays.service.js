/* eslint-disable class-methods-use-this */
const { generateDays } = require('../shared/utils/generateDays');
const { create, getAppointmentDate, updateSlot } = require('../shared/queries/appointmentdays');
const ApiError = require('../shared/utils/apiError');

class AppointmentDaysService {
  async createDays(year, month) {
    const days = generateDays(year, month);
    const isDaysCreated = await getAppointmentDate(days[0]);

    if (isDaysCreated !== 0) {
      throw new ApiError('Days already created', 403);
    }

    days.map(async (day) => {
      await create(day);
    });
  }

  async updateAppointmentDaySlots(id, slots) {
    await updateSlot(id, slots);
  }
}

module.exports = { AppointmentDaysService };
