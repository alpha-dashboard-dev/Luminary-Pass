"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("influencer_ratings", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      rating_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
        unique: true,
      },

      influencer_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },

      event_code: {
        type: Sequelize.STRING(8),
        allowNull: true,
      },

      rated_by: {
        type: Sequelize.STRING(8),
        allowNull: true,
      },

      rating_source: {
        type: Sequelize.ENUM("event", "social"),
        allowNull: false,
      },

      rating_type: {
        type: Sequelize.ENUM(
            "attendance",
            "content_quality",
            "professionalism",
            "engagement",
            "communication",
            "overall"
        ),
        allowNull: false,
      },

      rating: {
        type: Sequelize.DECIMAL(3, 2),
        allowNull: false,
      },

      comments: {
        type: Sequelize.TEXT,
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

    // Indexes (important for analytics)
    await queryInterface.addIndex("influencer_ratings", ["influencer_code"]);
    await queryInterface.addIndex("influencer_ratings", ["event_code"]);
    await queryInterface.addIndex("influencer_ratings", ["rating_type"]);
    await queryInterface.addIndex("influencer_ratings", ["rating_source"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("influencer_ratings");
  },
};