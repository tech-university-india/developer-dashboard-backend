'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pulse_score extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pulse_score.init({
    project_id: DataTypes.NUMBER,
    username: DataTypes.STRING,
    score: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'pulse_score',
  });
  return pulse_score;
};