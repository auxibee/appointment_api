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



module.exports = { generateToken };
