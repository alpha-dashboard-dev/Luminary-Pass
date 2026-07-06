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
            attributes: []
        }
    },

    Venue: {
        business: {
            attributes: ["name", "email", "status"],
        }
    },

    Event: {
        creator: {
            attributes: ["first_name", "last_name", "email", "status"],
        }
    },

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

    VenueTimeTable: {
        venue: {
            attributes: ["name", "email", "status"],
        }
    }


    // RolePermissions: {
    //     permission: {
    //         attributes: ["module","name"]
    //     }
    // },
};