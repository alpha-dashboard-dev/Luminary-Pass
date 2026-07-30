'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await Promise.all([
            queryInterface.addColumn('users', 'profile_setup_token', {
                type: Sequelize.STRING(255),
                allowNull: true,
            }),

            queryInterface.addColumn('users', 'profile_setup_token_expires_at', {
                type: Sequelize.DATE,
                allowNull: true,
            }),
            queryInterface.addColumn('users', 'profile_completed', {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: false,
            }),
        ]);
    },

    async down(queryInterface) {
        await Promise.all([
            queryInterface.removeColumn('users', 'profile_setup_token'),
            queryInterface.removeColumn('users', 'profile_setup_token_expires_at'),
            queryInterface.removeColumn('users', 'profile_completed'),
        ]);
    },
};