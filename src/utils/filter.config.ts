import { Op } from "sequelize";

export const FILTER_CONFIG: any = {

    // User: {
    //
    // },

    roleCode: {
        field: "role_code",
        op: Op.eq,
    },

    businessCode: {
        field: "business_code",
        op: Op.eq,
    },
    userCode: {
        field: "user_code",
        op: Op.eq,
    },
    organizationCode: {
        field: "organization_code",
        op: Op.eq,
    },

    city: {
        field: "city",
        op: Op.eq,
    }
};


// export const FILTER_CONFIG = {
//     User: {
//         business_code: {...},
//         user_type: {...}
//     },
//
//     Organization: {
//         is_active: {...}
//     }
// };