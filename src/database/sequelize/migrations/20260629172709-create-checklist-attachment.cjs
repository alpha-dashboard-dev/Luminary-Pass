"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("checklist_attachments", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      attachment_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
        unique: true,
      },

      checklist_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },

      file_name: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      file_url: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },

      attachment_type: {
        type: Sequelize.ENUM(
            "image",
            "video",
            "pdf",
            "document",
            "link"
        ),
        allowNull: false,
      },

      file_extension: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },

      file_size: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },

      uploaded_by: {
        type: Sequelize.STRING(8),
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });

    await queryInterface.addIndex("checklist_attachments", ["checklist_code"]);
    await queryInterface.addIndex("checklist_attachments", ["attachment_type"]);
    await queryInterface.addIndex("checklist_attachments", ["uploaded_by"]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("checklist_attachments");
  },
};