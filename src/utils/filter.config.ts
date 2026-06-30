import { Op } from "sequelize";

export const FILTER_CONFIG: any = {
    roleCode: {
        field: "role_code",
        op: Op.eq,
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