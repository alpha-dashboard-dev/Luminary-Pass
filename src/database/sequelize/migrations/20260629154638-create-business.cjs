"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("businesses", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      business_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
        unique: true,
      },
      organization_code: {
        type: Sequelize.STRING(8),
        allowNull: true,
      },

      owner_user_code: {
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

      timezone: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      billing_plan: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      status: {
        type: Sequelize.ENUM(
            "lead",
            "qualified",
            "demo_scheduled",
            "active",
            "inactive",
            "rejected"
        ),
        allowNull: false,
        defaultValue: "lead",
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
    await queryInterface.dropTable("businesses");
  },
};