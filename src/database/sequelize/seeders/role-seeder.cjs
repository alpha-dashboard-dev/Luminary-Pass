"use strict"

module.exports = {
    async up(queryInterface, Sequelize) {
        const now = new Date();
        await queryInterface.bulkInsert("roles", [

            {
                role_code: "ROL00001",
                business_code: "0",
                role: "admin",
                rank: 0,
                description: "System Administrator",
                created_at: now,
                updated_at: now,
            },

            {
                role_code: "ROL00002",
                business_code: "0",
                role: "business_owner",
                rank: 1,
                description: "Business Owner",
                created_at: now,
                updated_at: now,
            },

            {
                role_code: "ROL00003",
                business_code: "0",
                role: "influencer",
                rank: 1,
                description: "Influencer",
                created_at: now,
                updated_at: now,
            }

        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("roles", null, {});
    }
}