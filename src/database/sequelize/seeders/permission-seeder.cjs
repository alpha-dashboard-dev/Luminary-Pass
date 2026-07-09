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
            {
                permission_code: "PER00009",
                module: "organization",
                name: "create",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00010",
                module: "organization",
                name: "read",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00011",
                module: "organization",
                name: "update",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00012",
                module: "organization",
                name: "delete",
                created_at: now,
                updated_at: now,
            },

            // Business Module
            {
                permission_code: "PER00013",
                module: "business",
                name: "create",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00014",
                module: "business",
                name: "read",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00015",
                module: "business",
                name: "update",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00016",
                module: "business",
                name: "delete",
                created_at: now,
                updated_at: now,
            },
             //     Venue Module
            {
                permission_code: "PER00017",
                module: "venue",
                name: "create",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00018",
                module: "venue",
                name: "read",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00019",
                module: "venue",
                name: "update",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00020",
                module: "venue",
                name: "delete",
                created_at: now,
                updated_at: now,
            },

        //     Schedule Module
            {
                permission_code: "PER00021",
                module: "schedule",
                name: "create",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00022",
                module: "schedule",
                name: "read",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00023",
                module: "schedule",
                name: "update",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00024",
                module: "schedule",
                name: "delete",
                created_at: now,
                updated_at: now,
            },
        //     Category Module
            {
                permission_code: "PER00025",
                module: "category",
                name: "create",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00026",
                module: "category",
                name: "read",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00027",
                module: "category",
                name: "update",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00028",
                module: "category",
                name: "delete",
                created_at: now,
                updated_at: now,
            },

        //     Location module
            {
                permission_code: "PER00029",
                module: "location",
                name: "create",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00030",
                module: "location",
                name: "read",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00031",
                module: "location",
                name: "update",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00032",
                module: "location",
                name: "delete",
                created_at: now,
                updated_at: now,
            },
        //     Influencer Module
            {
                permission_code: "PER00033",
                module: "influencer",
                name: "create",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00034",
                module: "influencer",
                name: "read",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00035",
                module: "influencer",
                name: "update",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00036",
                module: "influencer",
                name: "delete",
                created_at: now,
                updated_at: now,
            },
        //     Event Module
            {
                permission_code: "PER00037",
                module: "event",
                name: "create",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00038",
                module: "event",
                name: "read",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00039",
                module: "event",
                name: "update",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00040",
                module: "event",
                name: "delete",
                created_at: now,
                updated_at: now,
            },
        //     Influencer Rating
            {
                permission_code: "PER00041",
                module: "rating",
                name: "create",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00042",
                module: "rating",
                name: "read",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00043",
                module: "rating",
                name: "update",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00044",
                module: "rating",
                name: "delete",
                created_at: now,
                updated_at: now,
            },
        //     Invitation Module
            {
                permission_code: "PER00045",
                module: "invitation",
                name: "create",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00046",
                module: "invitation",
                name: "read",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00047",
                module: "invitation",
                name: "update",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00048",
                module: "invitation",
                name: "delete",
                created_at: now,
                updated_at: now,
            },
        //     Venue Attachment
            {
                permission_code: "PER00049",
                module: "venueAttachment",
                name: "create",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00050",
                module: "venueAttachment",
                name: "read",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00051",
                module: "venueAttachment",
                name: "update",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00052",
                module: "venueAttachment",
                name: "delete",
                created_at: now,
                updated_at: now,
            },

            // User Ability Module
            {
                permission_code: "PER00053",
                module: "ability",
                name: "create",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00054",
                module: "ability",
                name: "read",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00055",
                module: "ability",
                name: "update",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00056",
                module: "ability",
                name: "delete",
                created_at: now,
                updated_at: now,
            },
        //     Attachment Module
            {
                permission_code: "PER00057",
                module: "attachment",
                name: "create",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00058",
                module: "attachment",
                name: "read",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00059",
                module: "attachment",
                name: "update",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00060",
                module: "attachment",
                name: "delete",
                created_at: now,
                updated_at: now,
            },
        //     EventParticipant Module
            {
                permission_code: "PER00061",
                module: "eventParticipant",
                name: "create",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00062",
                module: "eventParticipant",
                name: "read",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00063",
                module: "eventParticipant",
                name: "update",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00064",
                module: "eventParticipant",
                name: "delete",
                created_at: now,
                updated_at: now,
            },

        //     Venue Location

            {
                permission_code: "PER00065",
                module: "venueLocation",
                name: "create",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00066",
                module: "venueLocation",
                name: "read",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00067",
                module: "venueLocation",
                name: "update",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00068",
                module: "venueLocation",
                name: "delete",
                created_at: now,
                updated_at: now,
            },
            // Event Checklist
            {
                permission_code: "PER00069",
                module: "eventChecklist",
                name: "create",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00070",
                module: "eventChecklist",
                name: "read",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00071",
                module: "eventChecklist",
                name: "update",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00072",
                module: "eventChecklist",
                name: "delete",
                created_at: now,
                updated_at: now,
            },

        //     Event Checklist Attachment
            {
                permission_code: "PER00073",
                module: "checklistAttachment",
                name: "create",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00074",
                module: "checklistAttachment",
                name: "read",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00075",
                module: "checklistAttachment",
                name: "update",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00076",
                module: "checklistAttachment",
                name: "delete",
                created_at: now,
                updated_at: now,
            },

            // Badge Module

            {
                permission_code: "PER00077",
                module: "badge",
                name: "create",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00078",
                module: "badge",
                name: "read",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00079",
                module: "badge",
                name: "update",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00080",
                module: "badge",
                name: "delete",
                created_at: now,
                updated_at: now,
            },

        //     Setting Module
            {
                permission_code: "PER00081",
                module: "setting",
                name: "create",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00082",
                module: "setting",
                name: "read",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00083",
                module: "setting",
                name: "update",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00084",
                module: "setting",
                name: "delete",
                created_at: now,
                updated_at: now,
            },

        //     Social Login Module
            {
                permission_code: "PER00085",
                module: "socialLogin",
                name: "create",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00086",
                module: "socialLogin",
                name: "read",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00087",
                module: "socialLogin",
                name: "update",
                created_at: now,
                updated_at: now,
            },
            {
                permission_code: "PER00088",
                module: "socialLogin",
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