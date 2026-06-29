"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("venue_time_table", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      venue_schedule_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
        unique: true,
      },

      venue_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },

      working_day: {
        type: Sequelize.ENUM(
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday"
        ),
        allowNull: false,
      },

      start_time: {
        type: Sequelize.TIME,
        allowNull: false,
      },

      end_time: {
        type: Sequelize.TIME,
        allowNull: false,
      },

      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });

    // Prevent duplicate schedule per day
    // await queryInterface.addConstraint("venue_time_table", {
    //   fields: ["venue_code", "working_day"],
    //   type: "unique",
    //   name: "uq_venue_day_schedule",
    // });
    //
    // // Indexes
    // await queryInterface.addIndex("venue_time_table", ["venue_code"]);
    // await queryInterface.addIndex("venue_time_table", ["working_day"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("venue_time_table");
  },
};