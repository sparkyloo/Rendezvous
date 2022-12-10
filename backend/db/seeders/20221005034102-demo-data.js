"use strict";
const bcrypt = require("bcryptjs");
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
     * await queryInterface.bulkInsert({...options, tableName:'People',} [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "Wes",
          lastName: "Snipes",
          email: "demo@user.io",
          username: "Demo-lition",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Samwise",
          lastName: "Gamgee",
          email: "sam.g@fellowship.org",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Meatloaf",
          lastName: "Erina",
          email: "loafy@meats.net",
          username: "BigBarker",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Babloo",
          lastName: "Fred",
          email: "babs@meats.net",
          username: "babaloon",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Sparky",
          lastName: "Lee",
          email: "sparklee@meats.net",
          username: "sparklingPup",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Fanny",
          lastName: "Fane",
          email: "fun.fanny@fofotus.com",
          username: "NotDanny",
          hashedPassword: bcrypt.hashSync("password"),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Groups",
      [
        {
          organizerId: 1,
          name: "Hill Striders",
          about:
            "Take majestic hikes with like-minded hobbits (men, dwarves, elves and any other fair folk are welcome too).",
          type: "In person",
          private: true,
          city: "The Shire",
          state: "ME",
        },
        {
          organizerId: 2,
          name: "We Love Puppies",
          about:
            "They are just the cutest; come join us and share the love of puppies with us.",
          type: "In person",
          private: true,
          city: "Elk Grove",
          state: "CA",
        },
        {
          organizerId: 2,
          name: "Chocolate Lab Weight Loss Support Group",
          about:
            "Do you have a chunky chocolate lab in your life? Bring them to play with our group to aid in their weight loss journey. (please don't bring any meat)",
          type: "In person",
          private: true,
          city: "Elk Grove",
          state: "CA",
        },
        {
          organizerId: 2,
          name: "We Love Australian Shepherds",
          about:
            "Have you `herd` of how `aussome` Australian Shepherds are? If so join our group.",
          type: "In person",
          private: true,
          city: "Elk Grove",
          state: "CA",
        },
        {
          organizerId: 3,
          name: "Great-Wolf-Lodge Anonymous",
          about:
            "Are you neglecting your work and family focusing all your thoughts on MagiQuest? So are we; come enjoy waterslides and children's activities without your kids.",
          type: "In person",
          private: true,
          city: "Manteca",
          state: "CA",
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
     * await queryInterface.bulkDelete({...options, tableName:'People', null, {}});
     */

    await queryInterface.bulkDelete("Groups", null, {});
    await queryInterface.bulkDelete("Users", null, {});
  },
};
