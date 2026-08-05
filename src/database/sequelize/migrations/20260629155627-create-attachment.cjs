"use strict";

const {DataTypes} = require("sequelize");
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
            "user",
            "influencer",
            "organization",
            "business",
            "event",
            "venue"
        ),
        allowNull: true,
      },

      entity_code: {
        type: Sequelize.STRING(8),
        allowNull: true,
      },

      attachment_category: {
        type: Sequelize.ENUM(
            "profile_picture",
            "cover_image",
            "gallery",
            "logo",
            "banner",
            "portfolio",
            "proof",
            "menu",
            "contract",
            "invoice",
            "document",
            "reference",
            "social_link",
            "other"
        ),
        allowNull: true,
        defaultValue: "other"
      },

      title: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },

      media_type: {
        type: Sequelize.ENUM("image", "video", "document", "link"),
        allowNull: false,
        defaultValue: "image",
      },

      disk: {
        type: Sequelize.ENUM(
            "local",
            "public",
            "cloudinary"
        ),
        allowNull: false,
        defaultValue: "cloudinary",
      },

      folder: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      original_file_name: {
        type: Sequelize.STRING(255),
        allowNull: true,
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

      public_id: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      secure_url: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },

      is_primary: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
        type: Sequelize.ENUM("active", "archived", "deleted"),
        allowNull: false,
        defaultValue: "active",
      },
      file_hash: {
        type: Sequelize.STRING(64),
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