"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_abilities", {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      business_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },

      user_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },

      ability: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      status: {
        type: Sequelize.ENUM("active", "inactive"),
        allowNull: false,
        defaultValue: "active",
      },

      added_by: {
        type: Sequelize.STRING(8),
        allowNull: true,
      },

      updated_by: {
        type: Sequelize.STRING(8),
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

    // Prevent duplicate abilities for the same user
    await queryInterface.addConstraint("user_abilities", {
      fields: ["user_code"],
      type: "unique",
      name: "uq_user_ability",
    });
    },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user_abilities");
  },
};