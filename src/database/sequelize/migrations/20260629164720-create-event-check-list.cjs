"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("event_checklists", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      checklist_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
        unique: true,
      },

      event_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },

      title: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      checklist_type: {
        type: Sequelize.ENUM(
            "story",
            "reel",
            "post",
            "video",
            "venue_tag",
            "location_tag",
            "custom"
        ),
        allowNull: true,
      },

      points: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      submission_deadline: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      is_required: {
        type: Sequelize.ENUM("yes", "no"),
        allowNull: true,
      },

      display_order: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },

      status: {
        type: Sequelize.ENUM("active", "inactive"),
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

    // Indexes (important for event task queries)
    await queryInterface.addIndex("event_checklists", ["event_code"]);
    await queryInterface.addIndex("event_checklists", ["status"]);
    await queryInterface.addIndex("event_checklists", ["checklist_type"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("event_checklists");
  },
};