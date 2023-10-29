/* eslint-disable class-methods-use-this */
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

  async deleteUsers() {
    await deleteUsers();
  }
}

module.exports = UserService;
