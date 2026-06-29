"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("categories", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      category_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
        unique: true,
      },

      entity_type: {
        type: Sequelize.ENUM("venue", "influencer"),
        allowNull: false,
        defaultValue: "influencer",
      },

      entity_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },

      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      description: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      status: {
        type: Sequelize.ENUM("active", "inactive"),
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

    // Optional: performance index
    await queryInterface.addIndex("categories", ["entity_type"]);
    await queryInterface.addIndex("categories", ["entity_code"]);
    await queryInterface.addIndex("categories", ["status"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("categories");
  },
};