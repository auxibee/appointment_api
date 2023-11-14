const { getUserFromToken } = require('../utils/getUserFromToken');
const {User} = require('../../../models')
async function setAuthenticatedUser(req, res, next) {
  const user = await User.findOne({where: {id: 1}})
  req.user = user;

  next();
}

module.exports = { setAuthenticatedUser };
