"use strict";

const {DataTypes} = require("sequelize");
/** @type {import("sequelize-cli").Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("onboarding_sessions", {
            id: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },

            onboarding_code: {
                type: Sequelize.STRING(8),
                allowNull: false,
                unique: true,
            },

            user_code: {
                type: Sequelize.STRING(8),
                allowNull: false,
            },

            current_step: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },

            completed_step: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },

            status: {
                type: Sequelize.ENUM("pending", "approved", "completed", "in_progress"),
                allowNull: false,
                defaultValue: "pending",
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
        await queryInterface.dropTable("onboarding_sessions");
    },
};