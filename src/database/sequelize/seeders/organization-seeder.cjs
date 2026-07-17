"use strict"

const bcrypt = require("bcrypt");

module.exports = {
    async up(queryInterface, Sequelize) {

        const now = new Date();

        const password = await bcrypt.hash("123456", 10);

        await queryInterface.bulkInsert("organizations", [

            {
                organization_code: "ORG00001",

                name: "Organization 1",

                email: "admin@system.com",

                phone: "03000000000",

                password: password,

                status: "active",

                created_at: now,

                updated_at: now,
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("organizations", {
            organization_code: "ORG00001"
        });
    }
}

// Single seeder file command
// npx sequelize-cli db:seed --seed fileName with extension