"use strict";
let options = {};

if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn(
      { ...options, tableName: "Groups" },
      "organizerId",
      {
        type: Sequelize.INTEGER,
      }
    );

    await queryInterface.addConstraint(
      { ...options, tableName: "Groups" },
      {
        type: "FOREIGN KEY",
        onDelete: "set null",
        onUpdate: "cascade",
        fields: ["organizerId"],
        references: {
          table: "Users",
          field: "id",
        },
      }
    );
    await queryInterface.addColumn(
      { ...options, tableName: "Events" },
      "groupId",
      {
        type: Sequelize.INTEGER,
      }
    );

    await queryInterface.addConstraint(
      { ...options, tableName: "Events" },
      {
        type: "FOREIGN KEY",
        onDelete: "set null",
        onUpdate: "cascade",
        fields: ["groupId"],
        references: {
          table: "Groups",
          field: "id",
        },
      }
    );
    await queryInterface.addColumn(
      { ...options, tableName: "Events" },
      "venueId",
      {
        type: Sequelize.INTEGER,
      }
    );

    await queryInterface.addConstraint(
      { ...options, tableName: "Events" },
      {
        type: "FOREIGN KEY",
        onDelete: "set null",
        onUpdate: "cascade",
        fields: ["venueId"],
        references: {
          table: "Users",
          field: "id",
        },
      }
    );

    await queryInterface.addColumn(
      { ...options, tableName: "Memberships" },
      "groupId",
      {
        type: Sequelize.INTEGER,
      }
    );

    await queryInterface.addConstraint(
      { ...options, tableName: "Memberships" },

      {
        type: "FOREIGN KEY",
        onDelete: "set null",
        onUpdate: "cascade",
        fields: ["groupId"],
        references: {
          table: "Groups",
          field: "id",
        },
      }
    );
    await queryInterface.addColumn(
      { ...options, tableName: "Memberships" },

      "userId",
      {
        type: Sequelize.INTEGER,
      }
    );

    await queryInterface.addConstraint(
      { ...options, tableName: "Memberships" },

      {
        type: "FOREIGN KEY",
        onDelete: "set null",
        onUpdate: "cascade",
        fields: ["userId"],
        references: {
          table: "Users",
          field: "id",
        },
      }
    );
    await queryInterface.addColumn(
      { ...options, tableName: "Venues" },

      "groupId",
      {
        type: Sequelize.INTEGER,
      }
    );

    await queryInterface.addConstraint(
      { ...options, tableName: "Venues" },
      {
        type: "FOREIGN KEY",
        onDelete: "set null",
        onUpdate: "cascade",
        fields: ["groupId"],
        references: {
          table: "Groups",
          field: "id",
        },
      }
    );
    await queryInterface.addColumn(
      { ...options, tableName: "Attendances" },

      "eventId",
      {
        type: Sequelize.INTEGER,
      }
    );

    await queryInterface.addConstraint(
      { ...options, tableName: "Attendances" },
      {
        type: "FOREIGN KEY",
        onDelete: "set null",
        onUpdate: "cascade",
        fields: ["eventId"],
        references: {
          table: "Events",
          field: "id",
        },
      }
    );
    await queryInterface.addColumn(
      { ...options, tableName: "Attendances" },
      "userId",
      {
        type: Sequelize.INTEGER,
      }
    );

    await queryInterface.addConstraint(
      { ...options, tableName: "Attendances" },

      {
        type: "FOREIGN KEY",
        onDelete: "set null",
        onUpdate: "cascade",
        fields: ["userId"],
        references: {
          table: "Users",
          field: "id",
        },
      }
    );

    await queryInterface.addColumn(
      { ...options, tableName: "EventImages" },
      "eventId",
      {
        type: Sequelize.INTEGER,
      }
    );

    await queryInterface.addConstraint(
      { ...options, tableName: "EventImages" },
      {
        type: "FOREIGN KEY",
        onDelete: "set null",
        onUpdate: "cascade",
        fields: ["eventId"],
        references: {
          table: "Events",
          field: "id",
        },
      }
    );

    await queryInterface.addColumn(
      { ...options, tableName: "GroupImages" },
      "groupId",
      {
        type: Sequelize.INTEGER,
      }
    );

    await queryInterface.addConstraint(
      { ...options, tableName: "GroupImages" },
      {
        type: "FOREIGN KEY",
        onDelete: "set null",
        onUpdate: "cascade",
        fields: ["groupId"],
        references: {
          table: "Groups",
          field: "id",
        },
      }
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
