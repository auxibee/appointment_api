/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable class-methods-use-this */

const bcrypt = require('bcrypt');
const {User} = require('../../models')
const ApiError = require('../shared/utils/apiError');
const { hashPassword } = require('../shared/utils/hashPassword');


class UserService {
  async createUser(email, password) {
    const user = await User.findOne({where: {email: email}})
    
    if (user) {
      throw new ApiError('User already exits', 403);
    }
    const hash = await hashPassword(password)
    await User.create({email, password: hash})
   
  }

  async loginUser(email, password) {
    const user = await User.findOne({where: {email: email}});
    if (!user) {
      throw new ApiError('Wrong username or password', 403);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new ApiError('Wrong username or password', 403);
    }
  }

  
}

module.exports = UserService;
