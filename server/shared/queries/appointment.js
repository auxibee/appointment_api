const { query } = require('../connection/connection');

async function insertAppointment(userId, appointmentDateId) {
  const statement = 'INSERT INTO appointment (user_id, appointment_day_id) VALUES ($1, $2)';
  await query(statement, [userId, appointmentDateId]);
}

async function updateAppointment(appointmentId, appointmentDateId, userId) {
  const statement = 'Update appointment Set appointment_day_id = $2 Where id=$1 and user_id= $3';
  await query(statement, [appointmentId, appointmentDateId, userId]);
}

async function deleteAppointment(appointmentId, userId) {
  const statement = 'Delete From appointment Where id= $1 and user_id = $2';
  await query(statement, [appointmentId, userId]);
}

async function getAppoitmentByUserId(userId) {
  const statement = 'Select user_id From appointment Where user_id = $1';
  const results = await query(statement, [userId]);
  return results.rowCount;
}

module.exports = {
  insertAppointment, updateAppointment, deleteAppointment, getAppoitmentByUserId,
};
