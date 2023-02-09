"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasOne(models.credential, { foreignKey: "userId" });
    }
  }
  user.init({
    username: DataTypes.STRING,
    fmno: DataTypes.INTEGER,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneno: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {
    sequelize,
    modelName: "user",
  });
  return user;
};