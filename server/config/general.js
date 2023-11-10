/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();

const config = {
  PORT: process.env.PORT || 8080,
  DATABASE_URI: process.env.DATABASE_URI,
  DATABASE_URI_TEST: process.env.DATABASE_URI_TEST,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES: process.env.JWT_EXPIRES,
  JWT_AlGORITHM: process.env.JWT_AlGORITHM,
};

module.exports = config;
