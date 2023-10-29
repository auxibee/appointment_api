/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();

const config = {
  PORT: process.env.PORT || 8080,
  DATABASE_URI: process.env.DATABASE_URI,
};

module.exports = config;
