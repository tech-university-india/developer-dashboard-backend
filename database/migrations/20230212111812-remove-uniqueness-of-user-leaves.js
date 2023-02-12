'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('user_leaves', 'user_leaves_username_fkey');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('user_leaves', ['username'], {
      type: 'foreign key',
      name: 'user_leaves_username_fkey',
      references: {
        table: 'teams',
        field: 'username',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },
};
