"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("badges", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      entity_badge_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
        unique: true,
      },

      entity_type: {
        type: Sequelize.ENUM(
            "influencer",
            "business",
            "venue",
            "event"
        ),
        allowNull: false,
      },

      entity_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },

      badge_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      badge_description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      badge_icon: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },

      badge_type: {
        type: Sequelize.ENUM(
            "attendance",
            "engagement",
            "performance",
            "milestone",
            "special"
        ),
        allowNull: false,
      },

      badge_level: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },

      score: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: true,
      },

      awarded_by: {
        type: Sequelize.STRING(8),
        allowNull: true,
      },

      awarded_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },

      expires_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      status: {
        type: Sequelize.ENUM(
            "active",
            "expired",
            "revoked"
        ),
        allowNull: false,
        defaultValue: "active",
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

    await queryInterface.addIndex("badges", ["entity_type", "entity_code"]);
    await queryInterface.addIndex("badges", ["badge_type"]);
    await queryInterface.addIndex("badges", ["status"]);
    await queryInterface.addIndex("badges", ["badge_level"]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("badges");
  },
};