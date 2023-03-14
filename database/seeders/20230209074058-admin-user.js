/* eslint-disable no-unused-vars */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * 
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('users', [{
      username: 'admin',
      fmno: 0,
      firstname: 'admin',
      lastname: '',
      email: 'admin_dashboard@mckinsey.com',
      phoneno: '0123456789',
      role: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }], { returning: true }).then((user) => {
      // console.log(user);
      return queryInterface.bulkInsert('credentials', [{
        userid: user[0].id,
        password: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('credentials', null, {})
      .then(() => {
        return queryInterface.bulkDelete('users', null, {});
      });
  }
};


