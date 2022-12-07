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
      "Memberships",
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
      "GroupImages",
      [
        {
          groupId: 1,
          url: "https://i.picsum.photos/id/158/800/500.jpg?hmac=vydxMu8BAfVibEdyHB2KPDG0KpUNv4LuUBTO-44XiSk",
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
    await queryInterface.bulkDelete("Memberships", null, {});
    await queryInterface.bulkDelete("GroupImages", null, {});
  },
};
