/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable class-methods-use-this */

const bcrypt = require('bcrypt');
const {User} = require('../../models')
const ApiError = require('../shared/utils/apiError');
const { hashPassword } = require('../shared/utils/hashPassword');
const errorCodes = require('../shared/statusCodes');


class UserService {
  async createUser(email, password) {
    const  user = await User.findOne({where: {email: email}})
    
    if (user) {
      throw new ApiError('User already exits', errorCodes.FORBIDDEN);
    }
    const hash = await hashPassword(password)
    const newuser = await User.create({email, password: hash})
    return newuser

  }

  async loginUser(email, password) {
    const user = await User.findOne({where: {email: email}});
    if (!user) {
      throw new ApiError('Wrong username or password', errorCodes.FORBIDDEN);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new ApiError('Wrong username or password', errorCodes.FORBIDDEN);
    }

    return user.toJSON()
  }

  
}

module.exports = UserService;
