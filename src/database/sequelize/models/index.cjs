const { sequelize } = require('../sequelize');

const User = require('./user');
const UserAbility = require('./userability');
const Role = require('./roles');
const Permission = require('./permissions');
const RolePermissions = require('./role.permissions');
const Organization = require('./organization');
const Business = require("./business.js");
const UserSession = require('./session');
const Venue = require('./venue');
const Category = require('./category');
const VenueTimeTable = require('./venue_timetable');
const Location = require('./location');
const Influencer = require('./influencer');
const InfluencerRating = require('./influencer_ratings');

const Event = require('./event');
const EventInvitation = require('./event_invitation');
const EventParticipant = require('./event_participants');
const EventCheckList = require('./event_checklist');
const ChecklistAttachment = require('./checklist_attachment');
const EventParticipantChecklist = require('./event_participant_checklist');

const VenueLocation = require('./venue-location');
const VenueAttachment = require('./venue_attachment');
const Attachment = require('./attachment');

const Badge = require('./badges');
const SocialLogin = require('./social_logins');
const Settings = require("./settings");
const OnboardingSession = require('./onboarding_sessions.js');



const initModels = () => {
    const models = {

        User: User.initModel(sequelize),
        UserAbility: UserAbility.initModel(sequelize),
        Role: Role.initModel(sequelize),
        Permission: Permission.initModel(sequelize),
        RolePermissions: RolePermissions.initModel(sequelize),
        Organization: Organization.initModel(sequelize),
        Business: Business.initModel(sequelize),
        UserSession: UserSession.initModel(sequelize),
        Category: Category.initModel(sequelize),

        Venue: Venue.initModel(sequelize),
        VenueTimeTable: VenueTimeTable.initModel(sequelize),
        VenueLocation: VenueLocation.initModel(sequelize),
        VenueAttachment: VenueAttachment.initModel(sequelize),

        Location: Location.initModel(sequelize),
        Influencer: Influencer.initModel(sequelize),
        InfluencerRating: InfluencerRating.initModel(sequelize),

        Event: Event.initModel(sequelize),
        EventInvitation: EventInvitation.initModel(sequelize),
        EventParticipant: EventParticipant.initModel(sequelize),
        EventCheckList: EventCheckList.initModel(sequelize),
        ChecklistAttachment: ChecklistAttachment.initModel(sequelize),
        EventParticipantChecklist: EventParticipantChecklist.initModel(sequelize),

        Attachment: Attachment.initModel(sequelize),
        Badge: Badge.initModel(sequelize),
        SocialLogin: SocialLogin.initModel(sequelize),
        Settings: Settings.initModel(sequelize),

        OnboardingSession: OnboardingSession.initModel(sequelize),
    };

    Object.values(models).forEach((model) => {
        if (typeof model.associate === 'function') {
            model.associate(models);
        }
    });

    return {
        sequelize,
        ...models,
    };
};

module.exports = initModels;