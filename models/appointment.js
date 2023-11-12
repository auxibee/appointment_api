'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      Appointment.belongsTo(models.User, {as: 'user'})
      Appointment.belongsTo(models.AppointmentDay, {as : 'appointmentDay'})
      Appointment.hasMany(models.AppointmentDetail, {as : 'appointmentDetails'})
      
    }
  }
  Appointment.init({
    userId: DataTypes.INTEGER,
    appointmentDayId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};