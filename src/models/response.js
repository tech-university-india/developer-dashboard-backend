'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class response extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // association between response and questions
      response.belongsTo(models.questions, {
        foreignKey: 'question_id',
        sourceKey: 'question_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  response.init({
    question_id: DataTypes.STRING,
    username: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    description: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'response',
  });
  return response;
};