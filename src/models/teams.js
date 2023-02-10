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
      this.hasOne(models.project_details, { foreignKey: 'project_id' });
      this.hasMany(models.user_leaves);
      this.belongsTo(models.user, { foreignKey: 'username' });
    }
  }
  teams.init({
    project_id: DataTypes.STRING,
    username: DataTypes.STRING,
    emp_name: DataTypes.STRING,
    role: DataTypes.STRING,
    emp_status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'teams',
  });
  return teams;
};