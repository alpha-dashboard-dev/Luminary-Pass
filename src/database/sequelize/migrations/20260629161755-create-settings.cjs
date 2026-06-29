"use strict";

const {DataTypes} = require("sequelize");
/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("settings", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      setting_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
        unique: true,
      },

      entity_type: {
        type: Sequelize.ENUM("system", "business", "user"),
        allowNull: false,
      },

      entity_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },

      setting_key: {
        type: Sequelize.STRING(100),
        allowNull: false
      },

      setting_value: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      description: {
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("settings");
  },
};