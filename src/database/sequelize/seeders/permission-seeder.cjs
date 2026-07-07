"use strict"

module.exports = { async up(queryInterface, Sequelize) {
        const now = new Date();


        await queryInterface.bulkInsert("permissions", [

            {
                permission_code: "PER00001",
                module: "user",
                name: "create",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00002",
                module: "user",
                name: "read",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00003",
                module: "user",
                name: "update",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00004",
                module: "user",
                name: "delete",
                created_at: now,
                updated_at: now,
            },

            // ROLE MODULE
            {
                permission_code: "PER00005",
                module: "role",
                name: "create",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00006",
                module: "role",
                name: "read",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00007",
                module: "role",
                name: "update",
                created_at: now,
                updated_at: now,
            },

            // PERMISSION MODULE
            {
                permission_code: "PER00008",
                module: "permission",
                name: "assign",
                created_at: now,
                updated_at: now,
            },

            // Organization Module


            // Business Module
            {
                permission_code: "PER00009",
                module: "business",
                name: "create",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00010",
                module: "business",
                name: "read",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00011",
                module: "business",
                name: "update",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00012",
                module: "business",
                name: "delete",
                created_at: now,
                updated_at: now,
            },



        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("permissions", null, {});
    }
}