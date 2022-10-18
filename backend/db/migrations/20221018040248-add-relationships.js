'use strict';

const { FOREIGNKEYS } = require('sequelize/types/query-types');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface.addColumn('Groups', 'organizerId', {
      type: DataTypes.INTEGER,
      allowNull: false
    });

    queryInterface.addConstraint('Groups', {
      type: 'FOREIGN KEY',
      fields: 'organizerId',
      references: {
        table: 'Users',
        field: 'id'
      }
    })

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
