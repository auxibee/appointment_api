const db = require("../models");
const { routes, request } = require("./config");

async function createUser(request, email, password) {
  const response = await request
    .post("/auth/signup")
    .send({ email: email, password: password })
    .set("Accept", "application/json");
  return response;
}

async function loginUser(request, email, password) {
  const response = await request
    .post("/auth/login")
    .send({ email: email, password: password })
    .set("Accept", "application/json");
  return response;
}

async function createAppointmentDays(request, token, year, month) {
  const response = await request
    .post(routes.appointmentDays)
    .set("Authorization", `Bearer ${token}`)
    .send({ year, month });
  return response;
}

async function updateAppointmentDaySlot(request, token, slots) {
  const response = await request
    .put(routes.updateAppointmentDay)
    .set("Authorization", `Bearer ${token}`)
    .send({ slots: slots });
  return response;
}

async function createAppointment(request, token, userId, appointmentDayId) {
  const response = await request
    .post(routes.createAppointment)
    .set("Authorization", `Bearer ${token}`)
    .send({ userId, appointmentDayId });
  return response;
}

async function getRequest({ url, token }) {
  return await request
    .get(url)
    .set("Authorization", `Bearer ${token ?? token}`);
}

async function postRequest({ url, token, data }) {
  return await request
    .post(url)
    .set("Authorization", `Bearer ${token}`)
    .send(data);
}

async function resetDb() {
  console.log("Reseting database.....");
  Object.values(db.sequelize.models).map(async function (model) {
    await model.destroy({ truncate: true, restartIdentity: true });
    await db.sequelize.query(
      `DELETE FROM "sqlite_sequence" WHERE "name" = "${model.tableName}"`
    );
  });
}

module.exports = {
  createUser,
  loginUser,
  createAppointmentDays,
  updateAppointmentDaySlot,
  createAppointment,
  resetDb,
  getRequest,
  postRequest,
};
