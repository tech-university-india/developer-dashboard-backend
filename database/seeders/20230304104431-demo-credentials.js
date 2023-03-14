'use strict';
const generateHashedPassword = require('../../src/utils/generateHashedPasswords');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    return queryInterface.bulkInsert('credentials', [{
      username: 'demo-admin-user',
      password: await generateHashedPassword('1234'),
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      username: 'demo-leadership-user',
      password: await generateHashedPassword('1234'),
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      username: 'demo-manager-user',
      password: await generateHashedPassword('1234'),
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      username: 'demo-developer-user',
      password: await generateHashedPassword('1234'),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('credentials', null, {});
  }
};
