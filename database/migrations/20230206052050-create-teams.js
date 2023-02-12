'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      project_id: {
        type: Sequelize.STRING,
        // references: {
        //   model: 'project_details',
        //   key: 'project_id'
        // },
        allowNull: false,
        unique: true
      },
      username: {
        type: Sequelize.STRING,
        references: {
          model: 'users',
          key: 'username'
        },
        allowNull: false,
        unique: true
      },
      emp_name: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      emp_status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('teams');
  }
};