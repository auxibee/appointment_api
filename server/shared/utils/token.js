/* eslint-disable import/no-extraneous-dependencies */

const jwt = require('jsonwebtoken');
const config = require('../../config/general');

async function generateToken(payload) {
  const token = await jwt.sign(
    payload,
    config.JWT_SECRET,
    { algorithm: config.JWT_AlGORITHM },
  );
  return token;
}

async function decodeToken(token) {
  console.log(token.trim(' ').length);
  console.log('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InlhdyB0d3VtYXNpIiwiaWF0IjoxNjk4Nzc5OTM4fQ.JZrNPNNAlQkP3r9HtIWxHkO1BrQ3Px-D5vvC8D_FO9g'.length);

  const payload = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InlhdyB0d3VtYXNpIiwiaWF0IjoxNjk4Nzc5OTM4fQ.JZrNPNNAlQkP3r9HtIWxHkO1BrQ3Px-D5vvC8D_FO9g', config.JWT_SECRET);

  return payload;
}

module.exports = { generateToken, decodeToken };
