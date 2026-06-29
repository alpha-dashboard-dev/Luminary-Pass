"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("locations", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      location_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
        unique: true,
      },

      entity_type: {
        type: Sequelize.ENUM("business", "event", "user"),
        allowNull: false,
      },

      entity_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },

      address_line_1: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      address_line_2: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      city: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },

      state: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },

      country: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },

      postal_code: {
        type: Sequelize.STRING(50),
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

    // Index for polymorphic lookup
    await queryInterface.addIndex("locations", ["entity_type", "entity_code"], {
      name: "idx_entity",
    });

    // Optional performance indexes
    await queryInterface.addIndex("locations", ["city"]);
    await queryInterface.addIndex("locations", ["country"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("locations");
  },
};