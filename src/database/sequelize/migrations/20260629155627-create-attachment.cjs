"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("attachments", {
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

      entity_type: {
        type: Sequelize.ENUM(
            "users",
            "influencers",
            "organization",
            "business",
            "events"
        ),
        allowNull: false,
        defaultValue: "users",
      },

      entity_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },

      title: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },

      media_type: {
        type: Sequelize.ENUM("image", "video", "document", "website"),
        allowNull: false,
        defaultValue: "image",
      },

      file_name: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      file_extension: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },

      file_size: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },

      url: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },

      is_primary: {
        type: Sequelize.ENUM("yes", "no"),
        allowNull: false,
        defaultValue: "no",
      },

      visibility: {
        type: Sequelize.ENUM("public", "private"),
        allowNull: false,
        defaultValue: "private",
      },

      uploaded_by: {
        type: Sequelize.STRING(8),
        allowNull: true,
      },

      display_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },

      status: {
        type: Sequelize.ENUM("active", "deleted"),
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

    // Indexes for performance (important for media systems)
    await queryInterface.addIndex("attachments", ["entity_type"]);
    await queryInterface.addIndex("attachments", ["entity_code"]);
    await queryInterface.addIndex("attachments", ["status"]);
    await queryInterface.addIndex("attachments", ["media_type"]);
    await queryInterface.addIndex("attachments", ["is_primary"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("attachments");
  },
};