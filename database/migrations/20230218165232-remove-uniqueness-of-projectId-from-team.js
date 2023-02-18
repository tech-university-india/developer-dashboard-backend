/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('teams', 'teams_project_id');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex('teams', ['project_id'], { name: 'teams_project_id' });
  }
};