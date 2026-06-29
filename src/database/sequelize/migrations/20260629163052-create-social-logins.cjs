"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("social_logins", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      social_login_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
        unique: true,
      },

      user_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },

      provider: {
        type: Sequelize.ENUM(
            "google",
            "facebook",
            "instagram",
            "apple"
        ),
        allowNull: false,
      },

      provider_user_id: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      access_token: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      refresh_token: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      token_expires_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      last_login_at: {
        type: Sequelize.DATE,
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

    // Indexes (important for auth lookup speed)
  //   await queryInterface.addIndex("social_logins", ["user_code"]);
  //   await queryInterface.addIndex("social_logins", ["provider"]);
  //   await queryInterface.addIndex("social_logins", ["provider_user_id"]);
  //
  //   // Unique constraint to prevent duplicate provider accounts
  //   await queryInterface.addConstraint("social_logins", {
  //     fields: ["provider", "provider_user_id"],
  //     type: "unique",
  //     name: "uq_provider_user",
  //   });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("social_logins");
  },
};