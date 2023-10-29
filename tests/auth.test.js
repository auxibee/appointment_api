/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */

const request = require('supertest');
const app = require('../app');
const Service = require('../server/auth/auth.service');

const AuthService = new Service();

before(async () => {
  AuthService.deleteUsers();
});

describe('POST /auth ', async () => {
  describe('Given that user is created succesfully', () => {
    it('responds with status 201 {message : created}', (done) => {
      request(app)
        .post('/auth')
        .send({ email: 'test@gmail.com', password: 'samplepassword' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201, { message: 'created' }, done);
    });
  });
});
