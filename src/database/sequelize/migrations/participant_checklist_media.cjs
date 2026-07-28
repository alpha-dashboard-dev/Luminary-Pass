"use strict";

const {DataTypes} = require("sequelize");
/** @type {import("sequelize-cli").Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("participant_checklist_media", {
            id: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },

            participant_checklist_media_code:{
                type: Sequelize.STRING(8),
                unique:true,
                allowNull:false
            },

            participant_checklist_code: {
                type: Sequelize.STRING(8),
                allowNull: false,
            },

            instagram_media_id:{
                type: Sequelize.STRING(50),
                allowNull:true
            },
            remarks:{
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            remarks_by:{
                type: Sequelize.STRING(8),
                allowNull: true
            },
            status: {
                type: Sequelize.STRING(100),
                allowNull: true
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

    async down(queryInterface) {
        await queryInterface.dropTable("participant_checklist_media");
    },
};