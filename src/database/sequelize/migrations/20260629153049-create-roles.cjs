"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("roles", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      role_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
        unique: true,
      },

      role: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      business_code: {
        type: Sequelize.STRING(8),
        allowNull: true,
      },

      rank: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
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
    await queryInterface.dropTable("roles");
  },
};