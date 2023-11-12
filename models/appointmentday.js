'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AppointmentDay extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // AppointmentDay.belongsTo(models.Appointment)
    }
  }
  AppointmentDay.init({
    day: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'AppointmentDay',
  });
  return AppointmentDay;
};