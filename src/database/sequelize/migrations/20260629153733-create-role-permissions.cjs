"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("role_permissions", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      role_permission_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
        unique: true,
      },

      role_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },

      permission_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });

    // Prevent duplicate assignment of same permission to same role
    // await queryInterface.addConstraint("role_permissions", {
    //   fields: ["role_code", "permission_code"],
    //   type: "unique",
    //   name: "uq_role_permission",
    // });
    //
    // // FK: role_code → roles
    // await queryInterface.addConstraint("role_permissions", {
    //   fields: ["role_code"],
    //   type: "foreign key",
    //   name: "fk_role_permissions_role",
    //   references: {
    //     table: "roles",
    //     field: "role_code",
    //   },
    //   onUpdate: "CASCADE",
    //   onDelete: "CASCADE",
    // });
    //
    // // FK: permission_code → permissions
    // await queryInterface.addConstraint("role_permissions", {
    //   fields: ["permission_code"],
    //   type: "foreign key",
    //   name: "fk_role_permissions_permission",
    //   references: {
    //     table: "permissions",
    //     field: "permission_code",
    //   },
    //   onUpdate: "CASCADE",
    //   onDelete: "CASCADE",
    // });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("role_permissions");
  },
};