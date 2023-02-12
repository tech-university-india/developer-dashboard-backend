'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('teams', 'teams_project_id_unique');
    await queryInterface.removeIndex('teams', 'teams_username_unique');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex('teams', {
      fields: ['project_id'],
      unique: true,
      name: 'teams_project_id_unique',
    });
    await queryInterface.addIndex('teams', {
      fields: ['username'],
      unique: true,
      name: 'teams_username_unique',
    });
  },
};