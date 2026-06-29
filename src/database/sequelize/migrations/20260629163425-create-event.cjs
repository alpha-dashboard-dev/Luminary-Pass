"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("events", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      event_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
        unique: true,
      },

      business_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },

      venue_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },

      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      start_datetime: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      end_datetime: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      application_deadline: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      influencer_capacity: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },

      dress_code: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      special_instructions: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      visibility: {
        type: Sequelize.ENUM("public", "private"),
        defaultValue: "public",
      },

      created_by: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },

      status: {
        type: Sequelize.ENUM(
            "draft",
            "published",
            "closed",
            "live",
            "completed",
            "cancelled"
        ),
        defaultValue: "draft",
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

    // Indexes (important for event search)
    await queryInterface.addIndex("events", ["business_code"]);
    await queryInterface.addIndex("events", ["venue_code"]);
    await queryInterface.addIndex("events", ["status"]);
    await queryInterface.addIndex("events", ["visibility"]);
    await queryInterface.addIndex("events", ["start_datetime"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("events");
  },
};