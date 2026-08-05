"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("event_invitations", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      invitation_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
        unique: true,
      },

      event_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },

      entity_type: {
        type: Sequelize.ENUM("influencer", "customer", "business"),
        allowNull: true,
      },

      entity_code: {
        type: Sequelize.STRING(8),
        allowNull: true,
      },

      // influencer_code: {
      //   type: Sequelize.STRING(8),
      //   allowNull: false,
      // },

      invited_by: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },

      invitation_message: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      status: {
        type: Sequelize.ENUM(
            "pending",
            "accepted",
            "declined",
            "expired"
        ),
        defaultValue: "pending",
      },

      responded_at: {
        type: Sequelize.DATE,
        allowNull: true,
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

    // Indexes (important for event systems)
    await queryInterface.addIndex("event_invitations", ["event_code"]);
    // await queryInterface.addIndex("event_invitations", ["influencer_code"]);
    await queryInterface.addIndex("event_invitations", ["status"]);
    await queryInterface.addIndex("event_invitations", ["entity_type"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("event_invitations");
  },
};