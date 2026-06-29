"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("venue_attachments", {
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

      attachment_type: {
        type: Sequelize.ENUM("image", "video", "link"),
        allowNull: false,
      },

      attachment_platform_category: {
        type: Sequelize.ENUM(
            "instagram",
            "facebook",
            "youtube",
            "website",
            "twitter",
            "tiktok"
        ),
        allowNull: false,
        defaultValue: "instagram",
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

    // Indexes (important for media queries)
    // await queryInterface.addIndex("venue_attachments", ["attachment_type"]);
    // await queryInterface.addIndex("venue_attachments", ["attachment_platform_category"]);
    // await queryInterface.addIndex("venue_attachments", ["status"]);
    // await queryInterface.addIndex("venue_attachments", ["is_primary"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("venue_attachments");
  },
};