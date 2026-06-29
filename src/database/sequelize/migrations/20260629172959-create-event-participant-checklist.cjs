"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("event_participants_checklists", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      participant_checklist_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
        unique: true,
      },

      participant_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },

      checklist_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },

      submission_url: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },

      submission_type: {
        type: Sequelize.ENUM(
            "image",
            "video",
            "link"
        ),
        allowNull: true,
      },

      submitted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      review_status: {
        type: Sequelize.ENUM(
            "pending",
            "approved",
            "rejected",
            "revision_requested"
        ),
        allowNull: false,
        defaultValue: "pending",
      },

      reviewed_by: {
        type: Sequelize.STRING(8),
        allowNull: true,
      },

      reviewed_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      review_notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      completion_status: {
        type: Sequelize.ENUM(
            "pending",
            "submitted",
            "completed"
        ),
        allowNull: false,
        defaultValue: "pending",
      },

      points_awarded: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
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

    await queryInterface.addIndex("event_participants_checklists", ["participant_code"]);
    await queryInterface.addIndex("event_participants_checklists", ["checklist_code"]);
    await queryInterface.addIndex("event_participants_checklists", ["review_status"]);
    await queryInterface.addIndex("event_participants_checklists", ["completion_status"]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("event_participants_checklists");
  },
};ss