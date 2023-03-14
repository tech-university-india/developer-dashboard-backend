'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('pulse_scores', [{
      score: 1,
      createdAt: new Date(2021, 0, 1),
      updatedAt: new Date(),
      username: 'user1',
      project_id: '1bc70683-7528-4dc2-bb6a-ca95e65fb08b'
    },
    {
      score: 2,
      createdAt: new Date(2021, 1, 2),
      updatedAt: new Date(),
      username: 'user1',
      project_id: '1bc70683-7528-4dc2-bb6a-ca95e65fb08b'
    },
    {
      score: 3,
      createdAt: new Date(2021, 3, 3),
      updatedAt: new Date(),
      username: 'user1',
      project_id: '1bc70683-7528-4dc2-bb6a-ca95e65fb08b'
    },
    {
      score: 4,
      createdAt: new Date(2021, 4, 4),
      updatedAt: new Date(),
      username: 'user1',
      project_id: '1bc70683-7528-4dc2-bb6a-ca95e65fb08b'
    },
    {
      score: 5,
      createdAt: new Date(2021, 5, 5),
      updatedAt: new Date(),
      username: 'user1',
      project_id: '1bc70683-7528-4dc2-bb6a-ca95e65fb08b'
    },
    {
      score: 2,
      createdAt: new Date(2021, 6, 6),
      updatedAt: new Date(),
      username: 'user1',
      project_id: '1bc70683-7528-4dc2-bb6a-ca95e65fb08b'
    },
    {
      score: 3,
      createdAt: new Date(2021, 7, 7),
      updatedAt: new Date(),
      username: 'user1',
      project_id: '1bc70683-7528-4dc2-bb6a-ca95e65fb08b'
    },
    {
      score: 4,
      createdAt: new Date(2021, 8, 8),
      updatedAt: new Date(),
      username: 'user1',
      project_id: '1bc70683-7528-4dc2-bb6a-ca95e65fb08b'
    },
    {
      score: 5,
      createdAt: new Date(2021, 9, 9),
      updatedAt: new Date(),
      username: 'user1',
      project_id: '1bc70683-7528-4dc2-bb6a-ca95e65fb08b'
    },
    {
      score: 1,
      createdAt: new Date(2021, 10, 10),
      updatedAt: new Date(),
      username: 'user1',
      project_id: '1bc70683-7528-4dc2-bb6a-ca95e65fb08b'
    },
    {
      score: 2,
      createdAt: new Date(2021, 11, 11),
      updatedAt: new Date(),
      username: 'user1',
      project_id: '1bc70683-7528-4dc2-bb6a-ca95e65fb08b'
    },
    {
      score: 3,
      createdAt: new Date(2021, 12, 12),
      updatedAt: new Date(),
      username: 'user3',
      project_id: '1bc70683-7528-4dc2-bb6a-ca95e65fb08b'
    },
    {
      score: 4,
      createdAt: new Date(2021, 1, 1),
      updatedAt: new Date(),
      username: 'user3',
      project_id: '1bc70683-7528-4dc2-bb6a-ca95e65fb08b'
    },
    {
      score: 5,
      createdAt: new Date(2021, 2, 2),
      updatedAt: new Date(),
      username: 'Balkar',
      project_id: '1bc70683-7528-4dc2-bb6a-ca95e65fb08b'
    },
    {
      score: 1,
      createdAt: new Date(2021, 3, 3),
      updatedAt: new Date(),
      username: 'Balkar',
      project_id: '1bc70683-7528-4dc2-bb6a-ca95e65fb08b'
    },
    {
      score: 2,
      createdAt: new Date(2021, 4, 4),
      updatedAt: new Date(),
      username: 'user1',
      project_id: '1bc70683-7528-4dc2-bb6a-ca95e65fb08b'
    },
    {
      score: 3,
      createdAt: new Date(2021, 5, 5),
      updatedAt: new Date(),
      username: 'Balkar',
      project_id: '1bc70683-7528-4dc2-bb6a-ca95e65fb08b'
    },
    {
      score: 2,
      createdAt: new Date(2021, 1, 1),
      updatedAt: new Date(),
      username: 'user3',
      project_id: '1bc70683-7528-4dc2-bb6a-ca95e65fb08b'
    },
    {
      score: 3,
      createdAt: new Date(2021, 2, 2),
      updatedAt: new Date(),
      username: 'Balkar',
      project_id: '1bc70683-7528-4dc2-bb6a-ca95e65fb08b'
    },
    {
      score: 4,
      createdAt: new Date(2021, 3, 3),
      updatedAt: new Date(),
      username: 'Balkar',
      project_id: '1bc70683-7528-4dc2-bb6a-ca95e65fb08b'
    },
    {
      score: 5,
      createdAt: new Date(2021, 4, 4),
      updatedAt: new Date(),
      username: 'user1',
      project_id: '1bc70683-7528-4dc2-bb6a-ca95e65fb08b'
    },
    {
      score: 1,
      createdAt: new Date(2021, 5, 5),
      updatedAt: new Date(),
      username: 'Balkar',
      project_id: '1bc70683-7528-4dc2-bb6a-ca95e65fb08b'
    }
    ], { returning: true });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('pulse_scores', null, {});

  }
};
