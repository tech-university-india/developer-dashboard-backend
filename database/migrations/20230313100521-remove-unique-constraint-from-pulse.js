'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    //remove unique constraint of project_id in pulse_score table
    await queryInterface.removeConstraint('pulse_scores', 'pulse_scores_project_id_key');

  },

  async down(queryInterface, Sequelize) {
    //add unique constraint of project_id in pulse_score table
    await queryInterface.addConstraint('pulse_scores', {
      fields: ['project_id'],
      type: 'unique',
      name: 'pulse_scores_project_id_key'
    });
  }
};
