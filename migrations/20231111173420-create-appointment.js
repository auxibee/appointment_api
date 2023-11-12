'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Appointments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model : 'Users',
          id: 'id'
        }
      },
      appointmentDayId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'AppointmentDays',
          id: 'id'
        }
      },
      status:{
        type: Sequelize.ENUM('pending','completed'),
        defaultValue: 'completed'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Appointments');
  }
};