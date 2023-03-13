'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('project_details', [{
      project_id: '1bc70683-7528-4dc2-bb6a-ca95e65fb08b',
      project_name: 'Project 1',
      client: 'Client 1',
      poc: 'POC 1',
      description: 'Description 1',
      start_date: new Date(),
      end_date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      project_id: '805a1e69-1887-4499-9423-cd62f706eecc',
      project_name: 'Project 2',
      client: 'Client 2',
      poc: 'POC 2',
      description: 'Description 2',
      start_date: new Date(),
      end_date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      project_id: 'e6421a99-1e95-482d-b41c-1120bda9bf14',
      project_name: 'Project 3',
      client: 'Client 3',
      poc: 'POC 3',
      description: 'Description 3',
      start_date: new Date(),
      end_date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }], { returning: true });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('project_details', null, {});
  }
};

//command to run a specific seed file in the terminal
//npx sequelize-cli db:seed --seed 20230313070809-create-projects.js

//command to create a new seed file
//npx sequelize-cli seed:generate --name create-user
