const { query } = require('../connection/connection');

async function create(email, password) {
  const statement = 'INSERT INTO users (email, password) VALUES ($1, $2)';
  await query(statement, [email, password]);
}

async function getUserByEmail(email) {
  const statement = 'Select id from users Where email = $1';
  const results = await query(statement, [email]);
  return results.rows[0];
}

async function deleteUsers() {
  // used for testing
  await query('Delete * From users');
}

module.exports = { create, getUserByEmail, deleteUsers };
