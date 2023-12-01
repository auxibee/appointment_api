const config = require("../server/config/general");
const { hashPassword } = require("../server/shared/utils/hashPassword");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const hash = await hashPassword(config.ADMIN_PASSWORD);

    await queryInterface.bulkInsert("Users", [
      {
        email: config.ADMIN_EMAIL,
        password: hash,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        role: "admin",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     *
     */
    await queryInterface.delete("Users", {
      where: { email: config.ADMIN_EMAIL },
    });
  },
};
