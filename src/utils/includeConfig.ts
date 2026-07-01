export const INCLUDE_CONFIG = {
    Organization: {
        users: {
            attributes: ["first_name", "last_name", "email", "status"],
        }

    },

    User: {
        role: {
            attributes: ["role", "rank", "description"],

            include:{
                permissions: {
                    attributes: ["module", "name"]
                }
            }
        }
    },


    // RolePermissions: {
    //     permission: {
    //         attributes: ["module","name"]
    //     }
    // },
};