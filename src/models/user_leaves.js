'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_leaves extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    //   // define association here
    //   this.hasOne(models.teams, { foreignKey: 'username' });
    }
  }
  user_leaves.init({
    username: DataTypes.STRING,
    start_date: DataTypes.DATEONLY,
    end_date: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'user_leaves',
  });
  return user_leaves;
};