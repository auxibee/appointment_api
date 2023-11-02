/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable class-methods-use-this */

const bcrypt = require('bcrypt');
const { getUserByEmail, create, deleteUsers } = require('../shared/queries/user');
const ApiError = require('../shared/utils/apiError');
const { hashPassword } = require('../shared/utils/hashPassword');

class UserService {
  async createUser(email, password) {
    const user = await getUserByEmail(email);

    if (user) {
      throw new ApiError('User already exits', 403);
    }
    const hashed = await hashPassword(password);
    await create(email, hashed);
  }

  async loginUser(email, password) {
    const user = await getUserByEmail(email);
    if (!user) {
      throw new ApiError('Wrong username or password', 403);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new ApiError('Wrong username or password', 403);
    }
  }

  async deleteUsers() {
    await deleteUsers();
  }
}

module.exports = UserService;
