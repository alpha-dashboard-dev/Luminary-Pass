"use strict"

const bcrypt = require("bcrypt");

module.exports = { async up(queryInterface, Sequelize) {
        const now = new Date();
        const {Op} = Sequelize;

        const password = await bcrypt.hash("123456", 10);

        await queryInterface.bulkInsert("permissions", [

            // USER MODULE
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

        ]);

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

        await queryInterface.bulkInsert("role_permissions", [

            // ADMIN → ALL PERMISSIONS
            {
                role_permission_code: "RP000001",
                role_code: "ROL00001",
                permission_code: "PER00001",
                created_at: now,
            },
            {
                role_permission_code: "RP000002",
                role_code: "ROL00001",
                permission_code: "PER00002",
                created_at: now,
            },
            {
                role_permission_code: "RP000003",
                role_code: "ROL00001",
                permission_code: "PER00003",
                created_at: now,
            },
            {
                role_permission_code: "RP000004",
                role_code: "ROL00001",
                permission_code: "PER00004",
                created_at: now,
            },
            {
                role_permission_code: "RP000005",
                role_code: "ROL00001",
                permission_code: "PER00005",
                created_at: now,
            },
            {
                role_permission_code: "RP000006",
                role_code: "ROL00001",
                permission_code: "PER00006",
                created_at: now,
            },
            {
                role_permission_code: "RP000007",
                role_code: "ROL00001",
                permission_code: "PER00007",
                created_at: now,
            },
            {
                role_permission_code: "RP000008",
                role_code: "ROL00001",
                permission_code: "PER00008",
                created_at: now,
            },

            // OWNER → LIMITED (example)
            // {
            //     role_permission_code: "RP000009",
            //     role_code: "ROL00002",
            //     permission_code: "PER00001",
            //     created_at: now,
            // },
            // {
            //     role_permission_code: "RP000010",
            //     role_code: "ROL00002",
            //     permission_code: "PER00002",
            //     created_at: now,
            // },
            // {
            //     role_permission_code: "RP000011",
            //     role_code: "ROL00002",
            //     permission_code: "PER00003",
            //     created_at: now,
            // },
            // {
            //     role_permission_code: "RP000012",
            //     role_code: "ROL00002",
            //     permission_code: "PER00004",
            //     created_at: now,
            // },
        ]);

        await queryInterface.bulkInsert("users", [

            {
                user_code: "USR00001",

                organization_code: "0",

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
        await queryInterface.bulkDelete("role_permissions", null, {});
        await queryInterface.bulkDelete("roles", null, {});
        await queryInterface.bulkDelete("permissions", null, {});
        await queryInterface.bulkDelete("users", {
            user_code: "USR00001"
        });
    }
}