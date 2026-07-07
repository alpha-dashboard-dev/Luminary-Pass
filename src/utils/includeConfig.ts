export const INCLUDE_CONFIG = {
    Organization: {
        users: {
            attributes: ["first_name", "last_name", "email", "status"],
        }

    },

    Business: {
        users: {
            attributes: ["first_name", "last_name", "email", "status"],
        }
    },

    User: {
        role: {
            attributes: ["role", "rank", "description"],

            // include:{
            //     permissions: {
            //         attributes: ["module", "name"]
            //     }
            // }
        },
        organization: {
            attributes: ["name", "email", "status"],
        },
        business: {
            attributes: ["name", "email", "status"],
        }
    },

    Influencer: {
        user: {
            attributes: ["first_name", "last_name", "email", "status"],
        }
    },

    InfluencerRating: {
        influencer: {
            attributes: ["bio", "gender", "date_of_birth"],
            include: {
                user: {
                    attributes: ["first_name", "last_name", "email", "status"],
                }
            }
        },
        event: {
            attributes: ["title", "description"],
        },
        rater: {
            attributes: ["first_name", "last_name", "email", "status"],
        }

    },

    Venue: {
        business: {
            attributes: ["name", "email", "status"],
        }
    },

    VenueTimeTable: {
        venue: {
            attributes: ["name", "email", "status"],
        }
    },

    VenueLocation: {
        venue: {
            attributes: ["name", "email", "phone", "description", "status"],
        }
    },


    Event: {
        creator: {
            attributes: ["first_name", "last_name", "email", "status"],
        }
    },

    EventInvitation: {
        eventInvitation: {
            attributes: ["title", "description", "influencer_capacity", "dress_code"],
        },
        influencerInvitation: {
            attributes: ["bio", "gender", "date_of_birth"],
        },
        inviter: {
            attributes: ["first_name", "last_name", "email", "status"],
        }
    },

    // EventParticipant: {
    //     eventParticipant: {
    //         attributes: ["first_name", "last_name", "email", "status"],
    //     }
    // },

    Location: {
        business: {
            attributes: ["name", "email", "status"],
        },
        user: {
            attributes: ["name", "email", "phone"],
        },
        event: {
            attributes: ["name"],
        }

    },

    RolePermissions: {
        permission: {
            attributes: ["module","name"]
        }
    },
};