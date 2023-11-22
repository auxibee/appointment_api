'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.addColumn(
      'AppointmentDays',
      'slots',
     {
      type: Sequelize.NUMBER,
      defaultValue: 100
     }
      
    );
  },

  async down (queryInterface, Sequelize) {
   
    await queryInterface.removeColumn(
      'AppointmentDays',
      'slots',
      {
        type: Sequelize.NUMBER,
        defaultValue: 100
       }
    );
  }
};
