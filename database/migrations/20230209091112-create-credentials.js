'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('credentials', {
      id: {
        allowNull: false,
        autoIncrement: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'users',
          key: 'username',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      password: {
        type: Sequelize.TEXT
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('credentials');
  }
};
