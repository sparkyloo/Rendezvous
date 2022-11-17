"use strict";
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
/** @type {import('sequelize-cli')} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert({...options, tableName: 'People'}, [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      { ...options, tableName: "Memberships" },
      [
        {
          userId: 1,
          groupId: 1,
          status: "member",
        },
        {
          userId: 2,
          groupId: 1,
          status: "co-host",
        },
        {
          userId: 3,
          groupId: 1,
          status: "pending",
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      { ...options, tableName: "GroupImages" },
      [
        {
          groupId: 1,
          url: "https://example.com",
          preview: true,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete({...options, tableName: 'People'}, null, {});
     */
    await queryInterface.bulkDelete(
      { ...options, tableName: "Memberships" },
      null,
      {}
    );
    await queryInterface.bulkDelete(
      { ...options, tableName: "GroupImages" },
      null,
      {}
    );
  },
};
