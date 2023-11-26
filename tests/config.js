const app = require('../app')
const request = require('supertest')(app)
const expect = require('chai').expect


const commonHeaders = {
    'Accept' : 'application/json'
}

const routes = {
    signUp : '/auth/signup',
    login: '/auth/login',
    appointmentDays: '/admin/appointmentdays',
    updateAppointmentDay: '/admin/appointmentday/1',
    createAppointment: '/appointment'
}
module.exports = { request, expect, commonHeaders, routes }