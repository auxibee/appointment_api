/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */

const request = require('supertest');

const app = require('../app');

describe('GET /health', async () => {
  it('responds with status 200 ok', (done) => {
    request(app)
      .get('/health')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, { message: 'okay' }, done);
  });
});
