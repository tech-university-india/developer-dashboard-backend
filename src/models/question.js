'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.survey, {
        foreignKey: 'survey_id'
      });
      this.hasMany(models.responses);

    }
  }
  question.init({
    question_id: DataTypes.STRING,
    question_name: DataTypes.STRING,
    survey_id: DataTypes.STRING,
    min_rating: DataTypes.INTEGER,
    max_rating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'question',
  });
  return question;
};