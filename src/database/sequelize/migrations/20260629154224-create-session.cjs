"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_sessions", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      session_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
        unique: true,
      },

      user_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },

      refresh_token: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      ip_address: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },

      user_agent: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      device_name: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      device_type: {
        type: Sequelize.ENUM("desktop", "mobile", "tablet", "other"),
        allowNull: false,
        defaultValue: "desktop",
      },

      timezone: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },

      fcm_token: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      status: {
        type: Sequelize.ENUM("active", "expired", "revoked"),
        allowNull: false,
        defaultValue: "active",
      },

      expires_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      last_activity_at: {
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

    // FK: user_code → users
    // await queryInterface.addConstraint("user_sessions", {
    //   fields: ["user_code"],
    //   type: "foreign key",
    //   name: "fk_user_sessions_user",
    //   references: {
    //     table: "users",
    //     field: "user_code",
    //   },
    //   onUpdate: "CASCADE",
    //   onDelete: "CASCADE",
    // });
    //
    // // Index for faster session lookup
    // await queryInterface.addIndex("user_sessions", ["user_code"]);
    // await queryInterface.addIndex("user_sessions", ["status"]);
    // await queryInterface.addIndex("user_sessions", ["expires_at"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user_sessions");
  },
};