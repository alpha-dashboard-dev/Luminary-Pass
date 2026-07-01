const CODE_REGEX = /^[A-Za-z0-9]{8}$/;

const phoneRegex = /^\+?[1-9]\d{7,14}$/;

const VALID_ORG_STATUSES = ["active", "inactive"];

function validatePhone(phone) {
    if (!phone) {
        throw new Error("Phone is required");
    }

    phone = phone.trim();

    // Normalize PK numbers
    if (phone.startsWith("0")) {
        phone = "+92" + phone.slice(1);
    }

    const regex = /^\+[1-9]\d{7,14}$/;

    if (!regex.test(phone)) {
        throw new Error("Invalid phone number format");
    }

    return phone;
}


function isValidCode(code: string): boolean {
    return typeof code === "string" && CODE_REGEX.test(code);
}

function isValidEmail(email: string): boolean {
    return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const validateOrganization = (data: any) => {
    const { name, email, phone, password, status } = data;

    if (!name || name.trim().length < 2) {
        throw new Error("Organization name must be at least 2 characters long");
    }

    if (!email || !isValidEmail(email)) {
        throw new Error("Invalid email address");
    }

    // if (!phone || phone.trim().length < 5) {
    //     throw new Error("Phone number is required and must be at least 5 characters");
    // }
    validatePhone(phone)
    if (!password || password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
    }

    if (status !== undefined && !VALID_ORG_STATUSES.includes(status)) {
        throw new Error("Invalid status. Must be one of: " + VALID_ORG_STATUSES.join(", "));
    }
};


export const validateBusiness = (data: any) => {
    const { name, email, phone, password, status } = data;

    // if (!name || name.trim().length < 2) {
    //     throw new Error("Organization name must be at least 2 characters long");
    // }
    //
    // if (!email || !isValidEmail(email)) {
    //     throw new Error("Invalid email address");
    // }
    //
    // // if (!phone || phone.trim().length < 5) {
    // //     throw new Error("Phone number is required and must be at least 5 characters");
    // // }
    // validatePhone(phone)
    // if (!password || password.length < 6) {
    //     throw new Error("Password must be at least 6 characters long");
    // }
    //
    // if (status !== undefined && !VALID_ORG_STATUSES.includes(status)) {
    //     throw new Error("Invalid status. Must be one of: " + VALID_ORG_STATUSES.join(", "));
    // }
};