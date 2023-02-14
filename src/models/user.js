'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.credential, { 
        foreignKey: 'username',
        sourceKey: 'username',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'

      });

      this.belongsToMany(models.teams, {
        through: 'models.teams',
        foreignKey: 'username',
        otherKey: 'project_id'
      });
    }
  }
  user.init({
    username: DataTypes.STRING,
    fmno: DataTypes.INTEGER,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    github: DataTypes.TEXT,
    email: DataTypes.STRING,
    phoneno: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};