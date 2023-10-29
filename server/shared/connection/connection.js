/* eslint-disable import/no-extraneous-dependencies */
const { Pool } = require('pg');
const config = require('../../config/general');

const DATABASE_URI = process.env.NODE_ENV === 'development' ? config.DATABASE_URI : config.DATABASE_URI_TEST;

const pool = new Pool({ max: 10, connectionString: DATABASE_URI });

async function query(statement, values) {
  const client = await pool.connect();
  const result = await client.query(statement, values);
  client.release();
  return result;
}

function getClient() {
  return pool.connect();
}

module.exports = { query, getClient };
