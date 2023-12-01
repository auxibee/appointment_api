const { decodeToken } = require('./token');

function getUserFromToken(token) {
  const payload = decodeToken(token);
  return payload;
}

module.exports = { getUserFromToken };
