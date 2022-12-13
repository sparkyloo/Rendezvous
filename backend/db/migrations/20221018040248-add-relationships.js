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
    await queryInterface.addColumn("Groups", "organizerId", {
      type: Sequelize.INTEGER,
    });

    await queryInterface.addConstraint("Groups", {
      type: "FOREIGN KEY",
      onDelete: "cascade",
      onUpdate: "cascade",
      fields: ["organizerId"],
      references: {
        table: "Users",
        field: "id",
      },
    });
    await queryInterface.addColumn("Events", "groupId", {
      type: Sequelize.INTEGER,
    });

    await queryInterface.addConstraint("Events", {
      type: "FOREIGN KEY",
      onDelete: "cascade",
      onUpdate: "cascade",
      fields: ["groupId"],
      references: {
        table: "Groups",
        field: "id",
      },
    });
    await queryInterface.addColumn("Events", "venueId", {
      type: Sequelize.INTEGER,
    });

    await queryInterface.addConstraint("Events", {
      type: "FOREIGN KEY",
      onDelete: "cascade",
      onUpdate: "cascade",
      fields: ["venueId"],
      references: {
        table: "Users",
        field: "id",
      },
    });

    await queryInterface.addColumn("Memberships", "groupId", {
      type: Sequelize.INTEGER,
    });

    await queryInterface.addConstraint(
      "Memberships",

      {
        type: "FOREIGN KEY",
        onDelete: "cascade",
        onUpdate: "cascade",
        fields: ["groupId"],
        references: {
          table: "Groups",
          field: "id",
        },
      }
    );
    await queryInterface.addColumn(
      "Memberships",

      "userId",
      {
        type: Sequelize.INTEGER,
      }
    );

    await queryInterface.addConstraint(
      "Memberships",

      {
        type: "FOREIGN KEY",
        onDelete: "cascade",
        onUpdate: "cascade",
        fields: ["userId"],
        references: {
          table: "Users",
          field: "id",
        },
      }
    );
    await queryInterface.addColumn(
      "Venues",

      "groupId",
      {
        type: Sequelize.INTEGER,
      }
    );

    await queryInterface.addConstraint("Venues", {
      type: "FOREIGN KEY",
      onDelete: "cascade",
      onUpdate: "cascade",
      fields: ["groupId"],
      references: {
        table: "Groups",
        field: "id",
      },
    });
    await queryInterface.addColumn(
      "Attendances",

      "eventId",
      {
        type: Sequelize.INTEGER,
      }
    );

    await queryInterface.addConstraint("Attendances", {
      type: "FOREIGN KEY",
      onDelete: "cascade",
      onUpdate: "cascade",
      fields: ["eventId"],
      references: {
        table: "Events",
        field: "id",
      },
    });
    await queryInterface.addColumn("Attendances", "userId", {
      type: Sequelize.INTEGER,
    });

    await queryInterface.addConstraint(
      "Attendances",

      {
        type: "FOREIGN KEY",
        onDelete: "cascade",
        onUpdate: "cascade",
        fields: ["userId"],
        references: {
          table: "Users",
          field: "id",
        },
      }
    );

    await queryInterface.addColumn("EventImages", "eventId", {
      type: Sequelize.INTEGER,
    });

    await queryInterface.addConstraint("EventImages", {
      type: "FOREIGN KEY",
      onDelete: "cascade",
      onUpdate: "cascade",
      fields: ["eventId"],
      references: {
        table: "Events",
        field: "id",
      },
    });

    await queryInterface.addColumn("GroupImages", "groupId", {
      type: Sequelize.INTEGER,
    });

    await queryInterface.addConstraint("GroupImages", {
      type: "FOREIGN KEY",
      onDelete: "cascade",
      onUpdate: "cascade",
      fields: ["groupId"],
      references: {
        table: "Groups",
        field: "id",
      },
    });
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
