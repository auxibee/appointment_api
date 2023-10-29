/* eslint-disable import/no-extraneous-dependencies */
const { Pool } = require('pg');
const config = require('../../config/general');

const pool = new Pool({ max: 10, connectionString: config.DATABASE_URI });

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
