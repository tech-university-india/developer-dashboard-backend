'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('teams', 'teams_project_id_key');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addConstraint('teams', {
      fields: ['project_id'],
      type: 'unique',
      name: 'teams_project_id_key'
    });
  }
};
