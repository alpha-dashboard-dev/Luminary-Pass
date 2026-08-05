"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("social_medias", {
            id: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },

            social_media_code: {
                type: Sequelize.STRING(8),
                allowNull: false,
                unique: true,
            },

            venue_code: {
                type: Sequelize.STRING(8),
                allowNull: false,
            },
            social_platform: {
                type: Sequelize.STRING(200),
                allowNull: true,
            },
            user_name: {
                type: Sequelize.STRING(100),
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
        await queryInterface.dropTable("social_medias");
    },
};