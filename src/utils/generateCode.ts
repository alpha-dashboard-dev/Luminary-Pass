import crypto from "crypto";
export function generateCode(): string {
    return crypto.randomBytes(4).toString("hex").toUpperCase();
}


// export async function generateCode(model: any, prefix: string, codeField: string): Promise<string> {
//     const lastRecord = await model.findOne({
//         attributes: [codeField],
//         order: [["id", "DESC"]],
//     });
//
//     let nextNumber = 1;
//
//     if (lastRecord) {
//         const lastCode = lastRecord[codeField];
//         nextNumber = Number(lastCode.replace(prefix, "")) + 1;
//     }
//
//     return `${prefix}${nextNumber.toString().padStart(5, "0")}`;
// }

/*
const organizationCode = await generateCode(
    Organization,
    "ORG",
    "organization_code"
);

const businessCode = await generateCode(
    Business,
    "BUS",
    "business_code"
);

const userCode = await generateCode(
    User,
    "USR",
    "user_code"
);
 */