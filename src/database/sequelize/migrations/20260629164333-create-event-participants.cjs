"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("event_participants", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      participant_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
        unique: true,
      },

      event_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },

      influencer_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },

      source: {
        type: Sequelize.ENUM("application", "invitation"),
        allowNull: false,
      },

      source_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },

      status: {
        type: Sequelize.ENUM(
            "approved",
            "checked_in",
            "completed",
            "no_show"
        ),
        defaultValue: "approved",
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

    // Indexes (critical for event systems)
    await queryInterface.addIndex("event_participants", ["event_code"]);
    await queryInterface.addIndex("event_participants", ["influencer_code"]);
    await queryInterface.addIndex("event_participants", ["status"]);
    await queryInterface.addIndex("event_participants", ["source"]);

    // Prevent duplicate participation
    await queryInterface.addConstraint("event_participants", {
      fields: ["event_code", "influencer_code"],
      type: "unique",
      name: "uq_event_influencer",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("event_participants");
  },
};