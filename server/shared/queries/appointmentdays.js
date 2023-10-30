const { query } = require('../connection/connection');

async function create(day) {
  const statement = 'INSERT INTO appointment_days (day) VALUES ($1)';
  await query(statement, [day]);
}

// used to check if appointment day has already been created
async function getAppointmentDate(day) {
  const statement = 'Select day From appointment_days Where day = $1';
  const result = await query(statement, [day]);
  return result.rowCount;
}

async function updateSlot(id, slots) {
  const statement = 'Update appointment_days Set slots = $2 where id = $1';
  await query(statement, [id, slots]);
}

module.exports = { create, getAppointmentDate, updateSlot };
