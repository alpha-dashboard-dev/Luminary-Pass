const CODE_REGEX = /^[A-Za-z0-9]{8}$/;
function isValidCode(code: string): boolean {
    return typeof code === "string" && CODE_REGEX.test(code);
}

const VALID_STATUSES = ["active", "inactive"];

const VALID_ATTACHMENT_TYPES = ["image", "video", "link"];
const VALID_ATTACHMENT_PLATFORM_CATEGORY = ["instagram", "facebook", "twitter", "youtube", "website", "tiktok"];
const VALID_VISIBILITY = ["public", "private"]
const VALID_ATTACHMENT_PRIMARY = ["yes", "no"]
const VALID_ATTACHMENT_STATUSES = ["active", "deleted"]
const VALID_CATEGORY_ENTITY_TYPES = ["venue", "influencer"];


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

// Validation for User

export const validateUser = (data: any) => {
    const { organizationCode, businessCode, roleCode, firstName, lastName, email, phone, password, status } = data;

    if(organizationCode && !isValidCode(organizationCode)) {
        throw new Error("Valid 8-character organizationCode is required");
    }

    if(businessCode && !isValidCode(businessCode)) {
        throw new Error("Valid 8-character businessCode is required");
    }

    if(!roleCode || !isValidCode(roleCode)) {
        throw new Error("Valid 8-character roleCode is required");
    }

    if (!firstName || firstName.trim().length < 2) {
        throw new Error("First name must be at least 2 characters long");
    }

    if (!lastName || lastName.trim().length < 2) {
        throw new Error("Last name must be at least 2 characters long");
    }

    if (!email || !isValidEmail(email)) {
        throw new Error("Invalid email address!");
    }

    if(phone){
        validatePhone(phone)
    }

    if (!password || password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
    }
    if(businessCode && !isValidCode(businessCode)) {
        throw new Error("Valid 8-character businessCode is required");
    }

    if (status !== undefined && !VALID_STATUSES.includes(status)) {
        throw new Error("Invalid status. Must be one of: " + VALID_STATUSES.join(", "));
    }
}

// Validation for Influencer

export const validateInfluencer = (data: any) => {
    const { userCode, gender, dateOfBirth } = data

    if(userCode && !isValidCode(userCode)) {
        throw new Error("Valid 8-character userCode is required");
    }

    const VALID_INFLUENCER_GENDER = ["male", "female", "other"];

    if(gender && !VALID_INFLUENCER_GENDER.includes(gender)) {
        throw new Error("Invalid gender. Must be one of: " + VALID_INFLUENCER_GENDER.join(", "));
    }
}


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


// Validation for Venue Attachment
export const validateVenueAttachment = (data: any) => {

    const { venueCode, attachmentType, attachmentPlatformCategory, isPrimary, visibility, status } = data;

    if(!venueCode || !isValidCode(venueCode)) {
        throw new Error("Valid 8-character venueCode is required");
    }

    if(!attachmentType || !VALID_ATTACHMENT_TYPES.includes(attachmentType)) {
        throw new Error("Invalid attachment type. must be one of: " + VALID_ATTACHMENT_TYPES.join(", "));
    }

    if(!attachmentPlatformCategory || !VALID_ATTACHMENT_PLATFORM_CATEGORY.includes(attachmentPlatformCategory)) {
        throw new Error("Invalid Platform. Must be one of: " + VALID_ATTACHMENT_PLATFORM_CATEGORY.join(", "));
    }

    if(!isPrimary || !VALID_ATTACHMENT_PRIMARY.includes(isPrimary)) {
        throw new Error("Invalid attachment primary value. Must be one of: " + VALID_ATTACHMENT_PRIMARY.join(", ") );
    }

    if(!visibility || !VALID_VISIBILITY.includes(visibility)) {
        throw new Error("Invalid attachment visibility. Must be one of: " + VALID_VISIBILITY.join(", ") );
    }

    if(!status || !VALID_ATTACHMENT_STATUSES.includes(status)) {
        throw new Error("Invalid attachment status. Must be one of: " + VALID_ATTACHMENT_STATUSES.join(", "));
    }
}

export const validateCategory = (data: any) => {
    const { entityType, entityCode, name, status } = data;

    if(!entityType || !VALID_CATEGORY_ENTITY_TYPES.includes(entityType)) {
        throw new Error("Invalid Entity Type. Must be one of: " + VALID_CATEGORY_ENTITY_TYPES.join(", "));
    }

    if(!entityCode || !isValidCode(entityCode)) {
        throw new Error("Valid 8-character entityCode is required")
    }

    if (!name || name.trim().length < 2) {
        throw new Error("Category name must be at least 2 characters long");
    }

    if (status !== undefined && !VALID_STATUSES.includes(status)) {
        throw new Error("Invalid status. Must be one of: " + VALID_STATUSES.join(", "));
    }
}


// Validation for Event
export const validateEvent = (data: any) => {
    const { businessCode, venueCode, visibility, status } = data;

    const VALID_EVENT_STATUSES = ["draft", "published", "closed", "live", "completed", "cancelled"];

    if(businessCode && !isValidCode(businessCode)) {
        throw new Error("Valid 8-character businessCode is required");
    }

    if(!venueCode || !isValidCode(venueCode)) {
        throw new Error("Valid 8-character venueCode is required");
    }

    if(!visibility || !VALID_VISIBILITY.includes(visibility)) {
        throw new Error("Invalid attachment visibility. Must be one of: " + VALID_VISIBILITY.join(", ") );
    }

    if(!status || !VALID_EVENT_STATUSES.includes(status)) {
        throw new Error("Invalid Event status. Must be one of: " + VALID_EVENT_STATUSES.join(", "));
    }
}

// Validation for Influencer Rating
export const validateInfluencerRating = (data: any) => {
    const { influencerCode, eventCode, ratedBy, ratingSource, ratingType, rating } = data

    const VALID_RATING_SOURCE = ["event", "social"]
    const VALID_RATING_TYPE = ["attendance", "content_quality", "engagement", "professionalism", "communication", "overall"]

    if(!influencerCode || !isValidCode(influencerCode)) {
        throw new Error("Valid 8-character influencerCode is required")
    }

    if(!eventCode || !isValidCode(eventCode)) {
        throw new Error("Valid 8-character eventCode is required")
    }

    if(!ratedBy || !isValidCode(ratedBy)) {
        throw new Error("Valid 8-character userCode is required, to confirm who rated the influencer")
    }

    if(!ratingSource || !VALID_RATING_SOURCE.includes(ratingSource)) {
        throw new Error("Invalid Rating Source. Must be one of: " + VALID_RATING_SOURCE.join(", "));
    }

    if(!ratingType || !VALID_RATING_TYPE.includes(ratingType)) {
        throw new Error("Invalid Rating Type. Must be one of: " + VALID_RATING_TYPE.join(", "));
    }
}

export const validateEventInvitation = (data: any) => {

    const { eventCode, entityType, entityCode, influencerCode, invitedBy, status } = data

    const VALID_INVITATION_ENTITY_TYPE = ["influencer", "business", "customer"]
    const VALID_INVITATION_STATUSES = ["pending", "accepted", "declined", "expired"]

    if(!eventCode || !isValidCode(eventCode)) {
        throw new Error("Valid 8-character eventCode is required")
    }

    if(!entityType || !VALID_INVITATION_ENTITY_TYPE.includes(entityType)) {
        throw new Error("Invalid Entity Type. Must be one of: " + VALID_INVITATION_ENTITY_TYPE.join(", "));
    }

    if(!entityCode || !isValidCode(entityCode)) {
        throw new Error("Valid 8-character entityCode is required")
    }

    if(!influencerCode || !isValidCode(influencerCode)) {
        throw new Error("Valid 8-character influencerCode is required")
    }

    if(!invitedBy || !isValidCode(invitedBy)) {
        throw new Error("Valid 8-character userCode is required, who invite the influencer")
    }

    if(!status || !VALID_INVITATION_STATUSES.includes(status)) {
        throw new Error("Invalid Event status. Must be one of: " + VALID_INVITATION_STATUSES.join(", "));
    }

}


export const validateLocation = (data: any) => {
    const { entityType, entityCode, } = data

    const VALID_LOCATION_ENTITY_TYPE = ["business", "event", "user"]

    if(!entityType || !VALID_LOCATION_ENTITY_TYPE.includes(entityType)) {
        throw new Error("Invalid Entity Type. Must be one of: " + VALID_LOCATION_ENTITY_TYPE.join(", "));
    }

    if(!entityCode || !isValidCode(entityCode)) {
        throw new Error("Valid 8-character entityCode is required")
    }
}


export const validateAttachment = (data: any) => {
    const { entityType, entityCode, mediaType, isPrimary, visibility, status } = data

    const VALID_MEDIA_ENTITY_TYPE = ["users", "influencers", "organization", "business", "events"]
    const VALID_MEDIA_TYPE = ["image", "video", "document", "website"]

    if(!entityType || !VALID_MEDIA_ENTITY_TYPE.includes(entityType)) {
        throw new Error("Invalid Entity Type. Must be one of: " + VALID_MEDIA_ENTITY_TYPE.join(", "));
    }

    if(!entityCode || !isValidCode(entityCode)) {
        throw new Error("Valid 8-character entityCode is required")
    }

    if(!mediaType || !VALID_MEDIA_TYPE.includes(mediaType)) {
        throw new Error("Invalid Media Type. Must be one of: " + VALID_MEDIA_TYPE.join(", "));
    }

    if(!isPrimary || !VALID_ATTACHMENT_PRIMARY.includes(isPrimary)) {
        throw new Error("Invalid Attachment primary value. Must be one of: " + VALID_ATTACHMENT_PRIMARY.join(", ") );
    }

    if(!visibility || !VALID_VISIBILITY.includes(visibility)) {
        throw new Error("Invalid Attachment visibility. Must be one of: " + VALID_VISIBILITY.join(", ") );
    }

    if(!status || !VALID_ATTACHMENT_STATUSES.includes(status)) {
        throw new Error("Invalid Attachment status. Must be one of: " + VALID_ATTACHMENT_STATUSES.join(", "));
    }
}

export const validateEventParticipant = (data: any) => {
    const { eventCode, influencerCode, source, sourceCode } = data

    const VALID_SOURCE = ["invitation", "application"]

    if(!influencerCode || !isValidCode(influencerCode)) {
        throw new Error("Valid 8-character influencerCode is required")
    }

    if(!eventCode || !isValidCode(eventCode)) {
        throw new Error("Valid 8-character eventCode is required")
    }

    if(!source || !VALID_SOURCE.includes(source)) {
        throw new Error("Invalid Event Participant source. Must be one of: " + VALID_SOURCE.join(", "));
    }

    if(!sourceCode || !isValidCode(sourceCode)) {
        throw new Error("Valid 8-character sourceCode is required")
    }
}

export const validateEventChecklist = (data: any) => {
    const { eventCode, checklistType, status, isRequired } = data

    const VALID_CHECKLIST_TYPE = ["story", "reel", "post", "video", "venue_tag", "location_tag", "custom"]
    const VALID_CHECKLIST_IS_REQUIRED = ["yes", "no"]

    if(!eventCode || !isValidCode(eventCode)) {
        throw new Error("Valid 8-character eventCode is required")
    }

    if(!checklistType || !VALID_CHECKLIST_TYPE.includes(checklistType)) {
        throw new Error("Invalid Event Checklist Type. Must be one of: " + VALID_CHECKLIST_TYPE.join(", "));
    }

    if(!isRequired || !VALID_CHECKLIST_IS_REQUIRED.includes(isRequired)) {
    throw new Error("Invalid isRequired value of event checklist. Must be one of: " + VALID_CHECKLIST_IS_REQUIRED.join(", ") );
    }

    if (status !== undefined && !VALID_STATUSES.includes(status)) {
        throw new Error("Invalid status. Must be one of: " + VALID_STATUSES.join(", "));
    }

}


export const validateSetting = (data: any) => {
        const { entityType, entityCode } = data

    const VALID_SETTING_ENTITY_TYPE = ["system", "business", "user"]

    if(!entityType || !VALID_SETTING_ENTITY_TYPE.includes(entityType)) {
        throw new Error("Invalid Entity Type. Must be one of: " + VALID_SETTING_ENTITY_TYPE.join(", "));
    }

    if(!entityCode || !isValidCode(entityCode)) {
        throw new Error("Valid 8-character entityCode is required")
    }
}


export const validateBadge = (data: any) => {
    const { entityType, entityCode, badgeType, awardedBy, status } = data

    const VALID_BADGE_ENTITY_TYPE = ["influencer", "business", "venue", "event"]
    const VALID_BADGE_TYPE = ["attendance", "engagement", "performance", "milestone", "special"]
    const VALID_BADGE_STATUSES = ["active", "expired", "invoked"]

    if(!entityType || !VALID_BADGE_ENTITY_TYPE.includes(entityType)) {
        throw new Error("Invalid Badge Entity Type. Must be one of: " + VALID_BADGE_ENTITY_TYPE.join(", "));
    }

    if(!entityCode || !isValidCode(entityCode)) {
        throw new Error("Valid 8-character entityCode is required")
    }

    if(!badgeType || !VALID_BADGE_TYPE.includes(badgeType)) {
        throw new Error("Invalid Badge Type. Must be one of: " + VALID_BADGE_TYPE.join(", "));
    }

    if(!awardedBy || !isValidCode(awardedBy)) {
        throw new Error("Valid 8-character userCode is required, who awarded the badge")
    }

    if (status !== undefined && !VALID_BADGE_STATUSES.includes(status)) {
        throw new Error("Invalid Badge status. Must be one of: " + VALID_BADGE_STATUSES.join(", "));
    }
}

export const validateAbility = (data: any) => {
    const { businessCode, userCode, status, addedBy } = data

    if(businessCode && !isValidCode(businessCode)) {
        throw new Error("Valid 8-character businessCode is required");
    }

    if(userCode && !isValidCode(userCode)) {
        throw new Error("Valid 8-character userCode is required");
    }

    if (status !== undefined && !VALID_STATUSES.includes(status)) {
        throw new Error("Invalid status. Must be one of: " + VALID_STATUSES.join(", "));
    }

    if(addedBy && !isValidCode(addedBy)) {
        throw new Error("Valid 8-character userCode is required, who added the ability");
    }
}

export const accountValidation = (data: any) => {
    const { fullName, email, phone, password, confirmPassword,
        instagram, bio, category, country, city, verificationScreenshot,
        portfolioImages} = data;

    if (!fullName || fullName.trim().length < 2) {
        throw new Error("Name must be at least 2 characters long");
    }

    if (!email || !isValidEmail(email)) {
        throw new Error("Invalid email address");
    }

    if(phone){
        validatePhone(phone)
    }

    if (!password || password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
    }

    if(password !== confirmPassword){
        throw new Error("Passwords do not match");
    }

}

export const validateBusinessAccountRegistration = (data: any) => {

    const { firstName, businessName, email, phone } = data

    if (!firstName || firstName.trim().length < 2) {
        throw new Error("First name must be at least 2 characters long");
    }

    if (!businessName || businessName.trim().length < 2) {
        throw new Error("Business name must be at least 2 characters long");
    }

    if (!email || !isValidEmail(email)) {
        throw new Error("Invalid email address!");
    }

    if(phone){
        validatePhone(phone)
    }
}

export const validateInfluencerAccountRegistration = (data: any) => {

    const { fullName, userName, email, phone } = data

    if (!fullName || fullName.trim().length < 2) {
        throw new Error("Name must be at least 2 characters long");
    }

    if (!userName || userName.trim().length < 2) {
        throw new Error("User Name must be at least 2 characters long");
    }

    if (!email || !isValidEmail(email)) {
        throw new Error("Invalid email address!");
    }

    if(phone){
        validatePhone(phone)
    }
}