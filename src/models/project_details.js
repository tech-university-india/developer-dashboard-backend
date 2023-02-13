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
    //   this.hasMany(models.project_events);
    //   this.hasMany(models.survey);
    //   this.hasMany(models.teams);
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