"use strict"

module.exports = { async up(queryInterface, Sequelize) {
        const now = new Date();


        await queryInterface.bulkInsert("role_permissions", [

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

            // ROLE MODULE
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

            // PERMISSION MODULE
            {
                role_permission_code: "RP000008",
                role_code: "ROL00001",
                permission_code: "PER00008",
                created_at: now,
                
            },

            // Organization Module
            {
                role_permission_code: "RP000009",
                role_code: "ROL00001",
                permission_code: "PER00009",
                created_at: now,
                
            },
            {
                role_permission_code: "RP000010",
                role_code: "ROL00001",
                permission_code: "PER00010",
                created_at: now,
                
            },
            {
                role_permission_code: "RP000011",
                role_code: "ROL00001",
                permission_code: "PER00011",
                created_at: now,
                
            },
            {
                role_permission_code: "RP000012",
                role_code: "ROL00001",
                permission_code: "PER00012",
                created_at: now,
                
            },

            // Business Module
            {
                role_permission_code: "RP000013",
                role_code: "ROL00001",
                permission_code: "PER00013",
                created_at: now,
                
            },
            {
                role_permission_code: "RP000014",
                role_code: "ROL00001",
                permission_code: "PER00014",
                created_at: now,
                
            },
            {
                role_permission_code: "RP000015",
                role_code: "ROL00001",
                permission_code: "PER00015",
                created_at: now,
                
            },
            {
                role_permission_code: "RP000016",
                role_code: "ROL00001",
                permission_code: "PER00016",
                created_at: now,
                
            },
            //     Venue Module
            {
                role_permission_code: "RP000017",
                role_code: "ROL00001",
                permission_code: "PER00017",
                created_at: now,
                
            },
            {
                role_permission_code: "RP000018",
                role_code: "ROL00001",
                permission_code: "PER00018",
                created_at: now,
                
            },
            {
                role_permission_code: "RP000019",
                role_code: "ROL00001",
                permission_code: "PER00019",
                created_at: now,
                
            },
            {
                role_permission_code: "RP000020",
                role_code: "ROL00001",
                permission_code: "PER00020",
                created_at: now,
                
            },

            //     Schedule Module
            {
                role_permission_code: "RP000021",
                role_code: "ROL00001",
                permission_code: "PER00021",
                created_at: now,
                
            },
            {
                role_permission_code: "RP000022",
                role_code: "ROL00001",
                permission_code: "PER00022",
                created_at: now,
                
            },
            {
                role_permission_code: "RP000023",
                role_code: "ROL00001",
                permission_code: "PER00023",
                created_at: now,
                
            },
            {
                role_permission_code: "RP000024",
                role_code: "ROL00001",
                permission_code: "PER00024",
                created_at: now,
                
            },
            //     Category Module
            {
                role_permission_code: "RP000025",
                role_code: "ROL00001",
                permission_code: "PER00025",
                created_at: now,
                
            },
            {
                role_permission_code: "RP000026",
                role_code: "ROL00001",
                permission_code: "PER00026",
                created_at: now,
                
            },
            {
                role_permission_code: "RP000027",
                role_code: "ROL00001",
                permission_code: "PER00027",
                created_at: now,
                
            },
            {
                role_permission_code: "RP000028",
                role_code: "ROL00001",
                permission_code: "PER00028",
                created_at: now,
                
            },

            //     Location module
            {
                role_permission_code: "RP000029",
                role_code: "ROL00001",
                permission_code: "PER00029",
                created_at: now,
                
            },
            {
                role_permission_code: "RP000030",
                role_code: "ROL00001",
                permission_code: "PER00030",
                created_at: now,
                
            },
            {
                role_permission_code: "RP000031",
                role_code: "ROL00001",
                permission_code: "PER00031",
                created_at: now,
                
            },
            {
                role_permission_code: "RP000032",
                role_code: "ROL00001",
                permission_code: "PER00032",
                created_at: now,
                
            },
            //     Influencer Module
            {
                role_permission_code: "RP000033",
                role_code: "ROL00001",
                permission_code: "PER00033",
                created_at: now,
                
            },
            {
                role_permission_code: "RP000034",
                role_code: "ROL00001",
                permission_code: "PER00034",
                created_at: now,
                
            },
            {
                role_permission_code: "RP000035",
                role_code: "ROL00001",
                permission_code: "PER00035",
                created_at: now,
                
            },
            {
                role_permission_code: "RP000036",
                role_code: "ROL00001",
                permission_code: "PER00036",
                created_at: now,
                
            },
            //     Event Module
            {
                role_permission_code: "RP000037",
                role_code: "ROL00001",
                permission_code: "PER00037",
                created_at: now,
                
            },
            {
                role_permission_code: "RP000038",
                role_code: "ROL00001",
                permission_code: "PER00038",
                created_at: now,
                
            },
            {
                role_permission_code: "RP000039",
                role_code: "ROL00001",
                permission_code: "PER00039",
                created_at: now,
                
            },
            {
                role_permission_code: "RP000040",
                role_code: "ROL00001",
                permission_code: "PER00040",
                created_at: now,
                
            },
            //     Influencer Rating
            {
                role_permission_code: "RP000041",
                role_code: "ROL00001",
                permission_code: "PER00041",
                created_at: now,
                
            },
            {
                role_permission_code: "RP000042",
                role_code: "ROL00001",
                permission_code: "PER00042",
                created_at: now,
                
            },
            {
                role_permission_code: "RP000043",
                role_code: "ROL00001",
                permission_code: "PER00043",
                created_at: now,
                
            },
            {
                role_permission_code: "RP000044",
                role_code: "ROL00001",
                permission_code: "PER00044",
                created_at: now,
                
            },
            //     Invitation Module
            {
                role_permission_code: "RP000045",
                role_code: "ROL00001",
                permission_code: "PER00045",
                created_at: now,
                
            },
            {
                role_permission_code: "RP000046",
                role_code: "ROL00001",
                permission_code: "PER00046",
                created_at: now,
                
            },
            {
                role_permission_code: "RP000047",
                role_code: "ROL00001",
                permission_code: "PER00047",
                created_at: now,
                
            },
            {
                role_permission_code: "RP000048",
                role_code: "ROL00001",
                permission_code: "PER00048",
                created_at: now,
                
            },
            //     Venue Attachment
            {
                role_permission_code: "RP000049",
                role_code: "ROL00001",
                permission_code: "PER00049",
                created_at: now,
                
            },
            {
                role_permission_code: "RP000050",
                role_code: "ROL00001",
                permission_code: "PER00050",
                created_at: now,
                
            },
            {
                role_permission_code: "RP000051",
                role_code: "ROL00001",
                permission_code: "PER00051",
                created_at: now,
                
            },
            {
                role_permission_code: "RP000052",
                role_code: "ROL00001",
                permission_code: "PER00052",
                created_at: now,
                
            },

            // User Ability Module
            {
                role_permission_code: "RP000053",
                role_code: "ROL00001",
                permission_code: "PER00053",
                created_at: now,
                
            },
            {
                role_permission_code: "RP000054",
                role_code: "ROL00001",
                permission_code: "PER00054",
                created_at: now,
                
            },
            {
                role_permission_code: "RP000055",
                role_code: "ROL00001",
                permission_code: "PER00055",
                created_at: now,
                
            },
            {
                role_permission_code: "RP000056",
                role_code: "ROL00001",
                permission_code: "PER00056",
                created_at: now,
                
            },
            //     Attachment Module
            {
                role_permission_code: "RP000057",
                role_code: "ROL00001",
                permission_code: "PER00057",
                created_at: now,
                
            },
            {
                role_permission_code: "RP000058",
                role_code: "ROL00001",
                permission_code: "PER00058",
                created_at: now,
                
            },
            {
                role_permission_code: "RP000059",
                role_code: "ROL00001",
                permission_code: "PER00059",
                created_at: now,
                
            },
            {
                role_permission_code: "RP000060",
                role_code: "ROL00001",
                permission_code: "PER00060",
                created_at: now,
                
            },
            //     EventParticipant Module
            {
                role_permission_code: "RP000061",
                role_code: "ROL00001",
                permission_code: "PER00061",
                created_at: now,
                
            },
            {
                role_permission_code: "RP000062",
                role_code: "ROL00001",
                permission_code: "PER00062",
                created_at: now,
                
            },
            {
                role_permission_code: "RP000063",
                role_code: "ROL00001",
                permission_code: "PER00063",
                created_at: now,
                
            },
            {
                role_permission_code: "RP000064",
                role_code: "ROL00001",
                permission_code: "PER00064",
                created_at: now,
            },

        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("role_permissions", null, {});
    }
}