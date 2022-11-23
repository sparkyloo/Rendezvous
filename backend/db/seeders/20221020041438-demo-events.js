"use strict";
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
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
      "Events",
      [
        {
          groupId: 1,
          venueId: null,
          name: "Tennis Group First Meet and Greet",
          type: "Online",
          startDate: "2021-11-20 20:00:00",
          endDate: "2021-11-19 22:00:00",
        },
        {
          groupId: 1,
          venueId: 1,
          name: "Tennis Singles",
          type: "In Person",
          startDate: "2021-11-20 20:00:00",
          endDate: "2021-11-19 22:00:00",
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Venues",
      [
        {
          groupId: 1,
          address: "123 Disney Lane",
          city: "New York",
          state: "NY",
          lat: 37.7645358,
          lng: -122.4730327,
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Attendances",
      [
        {
          eventId: 1,
          userId: 1,
          status: "member",
        },
        {
          eventId: 1,
          userId: 2,
          status: "member",
        },
        {
          eventId: 2,
          userId: 1,
          status: "member",
        },
        {
          eventId: 2,
          userId: 2,
          status: "pending",
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "EventImages",
      [
        {
          eventId: 1,
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
    await queryInterface.bulkDelete("Events", null, {});
    await queryInterface.bulkDelete("Venues", null, {});
    await queryInterface.bulkDelete("Attendances", null, {});
    await queryInterface.bulkDelete("EventImages", null, {});
  },
};
