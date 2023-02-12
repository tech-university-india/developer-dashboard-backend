'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class teams extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // association between teams and user
      teams.belongsTo(models.user, {
        foreignKey: 'username'
      });
      
      // association between teams and project_details
      teams.belongsTo(models.project_details, {
        foreignKey: 'project_id',
        sourceKey: 'project_id',
        onUpdate: 'CASCADE'
      });
    }
  }
  teams.init({
    project_id: DataTypes.STRING,
    username: DataTypes.STRING,
    role: DataTypes.STRING,
    emp_status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'teams',
  });
  return teams;
};