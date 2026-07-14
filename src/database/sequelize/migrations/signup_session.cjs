"use strict";

const {DataTypes} = require("sequelize");
/** @type {import("sequelize-cli").Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("signup_sessions", {
            id: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },

            session_code: {
                type: Sequelize.STRING(8),
                allowNull: false,
                unique: true,
            },

            user_code: {
                type: Sequelize.STRING(8),
                allowNull: false,
            },

            account_type: {
                type: Sequelize.STRING(150),
                allowNull: false,

            },

            current_step: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },

            status: {
                type: Sequelize.ENUM("draft", "pending", "approved", "completed", "in_progress"),
                allowNull: false,
                defaultValue: "draft",
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
        await queryInterface.dropTable("signup_sessions");
    },
};