const app = require("../app");
const request = require("supertest")(app);
const expect = require("chai").expect;

const commonHeaders = {
  Accept: "application/json",
};

const routes = {
  signUp: "/auth/signup",
  login: "/auth/login",
  appointmentDays: "/admin/appointmentdays",
  updateAppointmentDay: "/admin/appointmentday/1",
  appointment: "/appointment",
};

const appointmentDays = {
  year: 2023,
  month: 2,
};
module.exports = { request, expect, commonHeaders, routes, appointmentDays };
