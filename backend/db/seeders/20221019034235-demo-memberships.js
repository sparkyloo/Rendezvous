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

    try {
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
            status: "host",
          },
          {
            userId: 3,
            groupId: 2,
            status: "member",
          },
          {
            userId: 3,
            groupId: 3,
            status: "host",
          },
          {
            userId: 5,
            groupId: 2,
            status: "host",
          },
          {
            userId: 4,
            groupId: 4,
            status: "host",
          },
          {
            userId: 2,
            groupId: 5,
            status: "host",
          },
          {
            userId: 1,
            groupId: 5,
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
            url: "https://i.picsum.photos/id/177/2515/1830.jpg?hmac=G8-2Q3-YPB2TreOK-4ofcmS-z5F6chIA0GHYAe5yzDY",
            preview: true,
          },
          {
            groupId: 2,
            url: "https://i.picsum.photos/id/237/800/500.jpg?hmac=HN1WJb4ZR7VuBNTwAhkuPwv-3ZtPWK0MWFRmh9X5__w",
            preview: true,
          },
          {
            groupId: 3,
            url: "/chocolate-lab.jpg",
            preview: true,
          },
          {
            groupId: 4,
            url: "/ausie.jpg",
            preview: true,
          },
          {
            groupId: 5,
            url: "/shush.jpeg",
            preview: true,
          },
        ],
        {}
      );
    } catch (caught) {
      console.log(__filename, caught);
      throw caught;
    }
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
