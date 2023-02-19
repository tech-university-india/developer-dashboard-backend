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
      // association between question and survey

      this.belongsTo(models.survey, {
        foreignKey: 'survey_id',
        sourceKey: 'survey_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      this.hasMany(models.survey_responses, {
        foreignKey: 'question_id',
        sourceKey: 'question_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
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
    modelName: 'survey_questions',
  });
  return question;
};