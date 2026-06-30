"use strict"

module.exports = {
    async up(queryInterface, Sequelize) {
        const now = new Date();
        const {Op} = Sequelize;

        await queryInterface.bulkInsert("roles", [
            {
                role_code: "ADM00001",
                business_code: "0",
                role: "admin",
                rank: 0,
                description: "Administrador have all rights.",
                created_at: now,
                updated_at: now,
            }
        ])
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("roles",                    null, {});
    }
}