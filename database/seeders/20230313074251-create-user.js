'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      id: '1bc70683-7528-4dc2-bb6a-ca95e65fb08b',
      username: 'user1',
      name: 'User 1',
      email: 'abc@gmail.com',
      phoneno: '1234567890',
      github: 'github.com/user1',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: '805a1e69-1887-4499-9423-cd62f706eecc',
      username: 'Balkar',
      name: 'User 2',
      email: 'abc@gmail.com',
      phoneno: '1234567890',
      github: 'github.com/user2',
      role: 'developer',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 'e6421a99-1e95-482d-b41c-1120bda9bf14',
      username: 'user3',
      name: 'User 3',
      email: 'abc@gmail.com',
      phoneno: '1234567890',
      github: 'github.com/user3',
      role: 'developer',
      createdAt: new Date(),
      updatedAt: new Date()
    }], { returning: true });

  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};

//command to run a specific seed file in the terminal
//npx sequelize-cli db:seed --seed 20230313074251-create-user.js