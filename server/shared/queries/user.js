const { query } = require('../connection/connection');

async function create(email, password) {
  const statement = 'INSERT INTO users (email, password) VALUES ($1, $2)';
  await query(statement, [email, password]);
}

module.exports = { create };
