'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('venue_attachments', 'venue_code', {
            type: Sequelize.STRING(8),
            allowNull: false,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('venue_attachments', 'venue_code');
    },
};
