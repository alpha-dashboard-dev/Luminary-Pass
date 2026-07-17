'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await Promise.all([
            queryInterface.addColumn('businesses', 'email_verification_token', {
                type: Sequelize.STRING(255),
                allowNull: true,
            }),

            queryInterface.addColumn('businesses', 'email_verification_token_expires_at', {
                type: Sequelize.DATE,
                allowNull: true,
            }),

            queryInterface.addColumn('businesses', 'email_verified', {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            }),
        ]);
    },

    async down(queryInterface) {
        await Promise.all([
            queryInterface.removeColumn('businesses', 'activation_token'),
            queryInterface.removeColumn('businesses', 'activation_token_expires_at'),
            queryInterface.removeColumn('businesses', 'email_verified'),
        ]);
    },
};