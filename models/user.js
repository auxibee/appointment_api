"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Appointment, {
        foreignKey: "userId",
        as: "appointment",
      });
    }

    async getUserByEmail(email) {
      return await User.findOne({ where: { email: email } });
    }

    async addUser(user) {
      const response = await User.create(user);
      return response.dataValues;
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    },
    {
      scopes: {
        withoutPassword: {
          attributes: { exclude: ["password"] },
        },
      },
    }
  );
  return User;
};
