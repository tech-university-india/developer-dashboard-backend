"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class credential extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      credential.belongsTo(models.user, {
        foreignKey: "userid",
      });
    }
  }
  credential.init({
    userid: DataTypes.INTEGER,
    password: DataTypes.TEXT
  }, {
    sequelize,
    modelName: "credential",
  });
  return credential;
};