'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class project_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  project_details.init({
    project_id: DataTypes.STRING,
    project_name: DataTypes.STRING,
    client: DataTypes.STRING,
    poc: DataTypes.STRING,
    description: DataTypes.TEXT,
    github: DataTypes.TEXT,
    jira: DataTypes.TEXT,
    misc: DataTypes.TEXT,
    start_date: DataTypes.DATEONLY,
    end_date: DataTypes.DATEONLY,
    pulsescore: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'project_details',
  });
  return project_details;
};