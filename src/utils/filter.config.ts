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
    },
    phone: {
        field: "phone",
        op: Op.eq,
    },
    search: {
        type: "or",
        fields: [
            {   field: "description", op: Op.like}
            // { field: "name", op: Op.like },
            // { field: "email", op: Op.like },
            // { field: "phone", op: Op.like },
            // { field: "street", op: Op.like },
            // { field: "working_days", op: Op.like },
        ]
    },
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