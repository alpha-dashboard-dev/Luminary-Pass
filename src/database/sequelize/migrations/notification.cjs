"use strict";

const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("notifications", {
            id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            notification_code: {
                type: Sequelize.STRING(8),
                allowNull: false,
                unique: true,
            },

            user_code: {
                type: Sequelize.STRING(8),
                allowNull: false,
            },
            title: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            body: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            type: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            reference_code: {
                type: Sequelize.STRING(8),
                allowNull: true,
            },
            is_read: {
                type: Sequelize.BOOLEAN,
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
        await queryInterface.dropTable("notifications");

    },
};