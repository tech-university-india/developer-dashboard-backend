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
      // association between project_details and project_events
      project_details.hasMany(models.project_events, {
        foreignKey: 'project_id',
        sourceKey: 'project_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      // association between project_details and teams
      project_details.hasOne(models.teams, {
        foreignKey: 'project_id',
        sourceKey: 'project_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'

      });
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
    end_date: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'project_details',
  });
  return project_details;
};