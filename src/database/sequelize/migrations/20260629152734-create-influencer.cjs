"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("influencers", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      influencer_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
        unique: true,
      },

      user_code: {
        type: Sequelize.STRING(8),
        allowNull: true,
      },

      bio: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      gender: {
        type: Sequelize.ENUM("male", "female", "other"),
        allowNull: true,
      },

      date_of_birth: {
        type: Sequelize.DATEONLY,
        allowNull: true,
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
    await queryInterface.dropTable("influencers");
  },
};