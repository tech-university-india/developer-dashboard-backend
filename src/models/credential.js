'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class credential extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // define association here
      // association between credential and user
      this.belongsTo(models.user, {
        foreignKey: 'username'
      });
    }
  }
  credential.init({
    username: {
      type:DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    password: {
      type:DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'credential',
  });
  return credential;
};