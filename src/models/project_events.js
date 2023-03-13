'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class project_events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // define association here
      this.belongsTo(models.project_details, {
        foreignKey: 'project_id',
        sourceKey: 'project_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

    }
  }
  project_events.init({
    project_id: DataTypes.STRING,
    event_id: DataTypes.STRING,
    event_name: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'project_events',
  });
  return project_events;
};