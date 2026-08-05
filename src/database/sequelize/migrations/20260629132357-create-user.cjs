"use strict";

const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      user_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
        unique: true,
      },

      organization_code: {
        type: Sequelize.STRING(8),
        allowNull: true,
      },

      business_code: {
        type: Sequelize.STRING(8),
        allowNull: true,
      },

      role_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },

      first_name: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },

      last_name: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },

      email: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      phone: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },

      password: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      user_type: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },

      status: {
        type: Sequelize.ENUM("active", "inactive"),
        allowNull: false,
        defaultValue: "active",
      },
      profile_setup_token: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      profile_setup_token_expires_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      profile_completed: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");

    // Clean up ENUM type
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_users_user_type";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_users_status";');
  },
};