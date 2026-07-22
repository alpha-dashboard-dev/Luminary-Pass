"use strict"

const bcrypt = require("bcrypt");

module.exports = {
    async up(queryInterface, Sequelize) {

        const now = new Date();

        const password = await bcrypt.hash("123456", 10);

        await queryInterface.bulkInsert("users", [

            {
                user_code: "USR00001",

                organization_code: "ORG00001",

                business_code: "0",

                role_code: "ROL00001", // ADMIN ROLE

                first_name: "System",

                last_name: "Admin",

                email: "admin@system.com",

                phone: "03000000000",

                password: password,

                user_type: null,

                avatar: null,

                status: "active",

                created_at: now,

                updated_at: now,
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("users", {
            user_code: "USR00001"
        });
    }
}

// Single seeder file command
// npx sequelize-cli db:seed --seed fileName with extension