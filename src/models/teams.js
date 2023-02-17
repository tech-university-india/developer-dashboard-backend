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
      this.hasMany(models.user, {
        foreignKey: 'username',
      });
      
      // association between teams and project_details
      this.belongsTo(models.project_details, {
        foreignKey: 'project_id',
        sourceKey: 'project_id',
        onUpdate: 'CASCADE'
      });

      // association between teams and user_leaves
      this.hasMany(models.user_leaves, {
        foreignKey: 'username',
        
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