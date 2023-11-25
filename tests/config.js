const app = require('../app')
const request = require('supertest')(app)
const expect = require('chai').expect


const commonHeaders = {
    'Accept' : 'application/json'
}

const routes = {
    signUp : '/auth/signup',
    login: '/auth/login'
}
module.exports = { request, expect, commonHeaders, routes }