'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class survey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.hasMany(models.questions);
      this.hasOne(models.project_details, {
        foreignKey: 'project_id'
      });
    }
  }
  survey.init({
    survey_id: DataTypes.STRING,
    survey_name: DataTypes.STRING,
    project_id: DataTypes.STRING,
    frequency: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'survey',
  });
  return survey;
};