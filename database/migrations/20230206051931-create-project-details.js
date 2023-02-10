'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('project_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      project_id: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      project_name: {
        type: Sequelize.STRING
      },
      client: {
        type: Sequelize.STRING
      },
      poc: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      github: {
        type: Sequelize.TEXT
      },
      jira: {
        type: Sequelize.TEXT
      },
      misc: {
        type: Sequelize.TEXT
      },
      start_date: {
        type: Sequelize.DATEONLY
      },
      end_date: {
        type: Sequelize.DATEONLY
      },
      pulsescore: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('project_details');
  }
};