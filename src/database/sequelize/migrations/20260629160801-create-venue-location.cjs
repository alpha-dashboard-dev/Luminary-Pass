"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("venue_locations", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      venue_location_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
        unique: true,
      },

      venue_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },

      address: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },

      area: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },

      city: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },

      country: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },

      status: {
        type: Sequelize.BOOLEAN,
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

    // Indexes
    await queryInterface.addIndex("venue_locations", ["venue_code"]);
    await queryInterface.addIndex("venue_locations", ["city"]);
    await queryInterface.addIndex("venue_locations", ["country"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("venue_locations");
  },
};