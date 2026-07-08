const CODE_REGEX = /^[A-Za-z0-9]{8}$/;
function isValidCode(code: string): boolean {
    return typeof code === "string" && CODE_REGEX.test(code);
}

const VALID_STATUSES = ["active", "inactive"];


const VALID_WORKING_DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const VALID_SCHEDULE_STATUSES = [true, false];
const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;


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

    validatePhone(phone)

    if (!password || password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
    }

    if (status !== undefined && !VALID_STATUSES.includes(status)) {
        throw new Error("Invalid status. Must be one of: " + VALID_STATUSES.join(", "));
    }
};


export const validateBusiness = (data: any) => {
    const { organizationCode, name, email, phone, status } = data;

    if(!organizationCode || !isValidCode(organizationCode)) {
        throw new Error("Valid 8-character organizationCode is required");
    }

    if (!name || name.trim().length < 2) {
        throw new Error("Business name must be at least 2 characters long");
    }

    if (!email || !isValidEmail(email)) {
        throw new Error("Invalid email address!");
    }

    if(phone){
        validatePhone(phone)
    }

    if (status !== undefined && !VALID_STATUSES.includes(status)) {
        throw new Error("Invalid status. Must be one of: " + VALID_STATUSES.join(", "));
    }
};

export const validateVenue = (data: any, isUpdate: boolean = false) => {
    const { businessCode, name, email, phone, status } = data;

    if (!isUpdate || businessCode !== undefined) {
        if (!businessCode || !isValidCode(businessCode)) {
            throw new Error("Valid 8-character businessCode is required");
        }
    }
    if (!isUpdate || name !== undefined) {
        if (!name || name.trim().length < 2) {
            throw new Error("Venue name must be at least 2 characters long");
        }
    }
    if (!isUpdate || email !== undefined) {
        if (!email || !isValidEmail(email)) {
            throw new Error("Invalid email address!");
        }
    }

    if (phone) {
        validatePhone(phone);
    }

    if (status !== undefined && !VALID_STATUSES.includes(status)) {
        throw new Error("Invalid status. Must be one of: " + VALID_STATUSES.join(", "));
    }
};


export const validateVenueSchedule = (data: any) => {
    const { venueCode ,workingDay, startTime, endTime, status } = data;

    if(!venueCode || !isValidCode(venueCode)) {
        throw new Error("Valid 8-character venueCode is required");
    }

    if (!workingDay || !VALID_WORKING_DAYS.includes(workingDay)) {
        throw new Error("Invalid workingDays. Must be one of: " + VALID_WORKING_DAYS.join(", "));
    }

    if (!startTime || !TIME_REGEX.test(startTime)) {
        throw new Error("Invalid startTime format. Use HH:MM (e.g. 09:00)");
    }

    if (!endTime || !TIME_REGEX.test(endTime)) {
        throw new Error("Invalid endTime format. Use HH:MM (e.g. 17:00)");
    }
    if (status !== undefined && !VALID_SCHEDULE_STATUSES.includes(status)) {
        throw new Error("Invalid status. Must be one of: " + VALID_SCHEDULE_STATUSES.join(", "));
    }
}

export const validateVenueLocation = (data: any) => {
    const { venueCode, status } = data;
    if(!venueCode || !isValidCode(venueCode)) {
        throw new Error("Valid 8-character venueCode is required");
    }

    if (status !== undefined && !VALID_SCHEDULE_STATUSES.includes(status)) {
        throw new Error("Invalid status. Must be one of: " + VALID_SCHEDULE_STATUSES.join(", "));
    }
}