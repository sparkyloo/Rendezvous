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
          name: "Second Breakfast Meet and Great",
          type: "Online",
          startDate: "2021-11-20 20:00:00",
          endDate: "2021-11-19 22:00:00",
        },
        {
          groupId: 1,
          venueId: 1,
          name: "A Simple Walk into Mordor",
          type: "In Person",
          startDate: "2021-11-20 20:00:00",
          endDate: "2021-11-19 22:00:00",
        },
        {
          groupId: 2,
          venueId: 2,
          name: "Puppy Love",
          type: "In Person",
          startDate: "2021-11-20 20:00:00",
          endDate: "2021-11-19 22:00:00",
        },
        {
          groupId: 2,
          venueId: 2,
          name: "Puppy Parade",
          type: "In Person",
          startDate: "2021-11-20 20:00:00",
          endDate: "2021-11-19 22:00:00",
        },
        {
          groupId: 3,
          venueId: 3,
          name: "Calorie Counting Seminar",
          type: "In Person",
          startDate: "2021-11-20 20:00:00",
          endDate: "2021-11-19 22:00:00",
        },
        {
          groupId: 3,
          venueId: 4,
          name: "Chocolate Calisthenics",
          type: "In Person",
          startDate: "2021-11-20 20:00:00",
          endDate: "2021-11-19 22:00:00",
        },
        {
          groupId: 3,
          venueId: 4,
          name: "Walk for Weight Loss",
          type: "In Person",
          startDate: "2021-11-20 20:00:00",
          endDate: "2021-11-19 22:00:00",
        },
        {
          groupId: 4,
          venueId: 5,
          name: "Herding Lessons",
          type: "In Person",
          startDate: "2021-11-20 20:00:00",
          endDate: "2021-11-19 22:00:00",
        },
        {
          groupId: 4,
          venueId: 5,
          name: "Beginners Agility",
          type: "In Person",
          startDate: "2021-11-20 20:00:00",
          endDate: "2021-11-19 22:00:00",
        },
        {
          groupId: 5,
          venueId: 6,
          name: "Dragon Hunt",
          type: "In Person",
          startDate: "2021-11-20 20:00:00",
          endDate: "2021-11-19 22:00:00",
        },
        {
          groupId: 5,
          venueId: 6,
          name: "Water Park Life Hacks",
          type: "Online",
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
          address: "1418 Hobbiton Hill",
          city: "The Shire",
          state: "ME",
          lat: 37.7645358,
          lng: -122.4730327,
        },
        {
          groupId: 2,
          address: "456 Park Rd",
          city: "Elk Grove",
          state: "CA",
          lat: 37.7645358,
          lng: -122.4730327,
        },
        {
          groupId: 3,
          address: "5540 Bellaterra Dr",
          city: "Elk Grove",
          state: "CA",
          lat: 37.7645358,
          lng: -122.4730327,
        },
        {
          groupId: 3,
          address: "9950 Elk Grove Florin Rd",
          city: "Elk Grove",
          state: "CA",
          lat: 37.7645358,
          lng: -122.4730327,
        },
        {
          groupId: 4,
          address: "7895 Freeport Blvd",
          city: "Elk Grove",
          state: "CA",
          lat: 37.7645358,
          lng: -122.4730327,
        },
        {
          groupId: 5,
          address: "2500 Daniels St",
          city: "Manteca",
          state: "CA",
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
          status: "pending",
        },
        {
          eventId: 2,
          userId: 2,
          status: "member",
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "EventImages",
      [
        {
          eventId: 1,
          url: "https://i.picsum.photos/id/127/800/500.jpg?hmac=tKr-vWrTHHgW0vuh1rJ65GgZqZ8pjTIlQp4KgP0uYnM",
          preview: true,
        },
        {
          eventId: 2,
          url: "/hobbiton.jpeg",
          preview: true,
        },
        {
          eventId: 3,
          url: "https://i.picsum.photos/id/158/800/500.jpg?hmac=vydxMu8BAfVibEdyHB2KPDG0KpUNv4LuUBTO-44XiSk",
          preview: true,
        },
        {
          eventId: 4,
          url: "/puppy-parade.jpeg",
          preview: true,
        },
        {
          eventId: 5,
          url: "/classroom.jpeg",
          preview: true,
        },
        {
          eventId: 6,
          url: "/dog-workout.jpeg",
          preview: true,
        },
        {
          eventId: 7,
          url: "/dog-running.jpeg",
          preview: true,
        },
        {
          eventId: 8,
          url: "/herding.jpeg",
          preview: true,
        },
        {
          eventId: 9,
          url: "/agility.jpeg",
          preview: true,
        },
        {
          eventId: 10,
          url: "/dragon-hunt.jpeg",
          preview: true,
        },
        {
          eventId: 11,
          url: "/waterpark.jpeg",
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
