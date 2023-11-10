const { getUserFromToken } = require('../utils/getUserFromToken');

async function setAuthenticatedUser(req, res, next) {
  const { user } = getUserFromToken(req.token);
  req.user = user;

  next();
}

module.exports = { setAuthenticatedUser };
