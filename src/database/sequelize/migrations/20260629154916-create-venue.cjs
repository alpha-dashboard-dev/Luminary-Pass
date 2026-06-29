"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("venues", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      venue_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
        unique: true,
      },

      business_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },

      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      phone: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },

      description: {
        type: Sequelize.TEXT,
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

    // FK: business
    // await queryInterface.addConstraint("venues", {
    //   fields: ["business_code"],
    //   type: "foreign key",
    //   name: "fk_venues_business",
    //   references: {
    //     table: "businesses",
    //     field: "business_code",
    //   },
    //   onUpdate: "CASCADE",
    //   onDelete: "CASCADE",
    // });
    //
    // // Index for performance
    // await queryInterface.addIndex("venues", ["business_code"]);
    // await queryInterface.addIndex("venues", ["status"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("venues");
  },
};