'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      username: 'demo-admin-user',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      username: 'demo-leadership-user',
      role: 'leadership',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      username: 'demo-manager-user',
      role: 'manager',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      username: 'demo-developer-user',
      role: 'developer',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
