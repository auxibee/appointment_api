/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();

const config = {
  PORT: process.env.PORT || 8080,
  DATABASE_URI: process.env.DATABASE_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES: process.env.JWT_EXPIRES,
  JWT_AlGORITHM: process.env.JWT_AlGORITHM,
  ADMIN_EMAIL : process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  NODE_ENV : process.env.NODE_ENV
};

module.exports = config;
