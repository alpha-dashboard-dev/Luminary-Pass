import businessRepo from "../../../repositories/business/business.repository";
import userRepo from "../../../repositories/user/user.repository";
import influencerRepo from "../../../repositories/influencer/influencer.repository";
import venueRepo from "../../../repositories/venue/venue.repository";
import eventRepo from "../../../repositories/event/event.repository";

class EntityResolver {

    static async exists(entityType: string, entityCode: string) {

        switch (entityType) {

            case "user":
                return userRepo.findOne({
                    user_code: entityCode,
                });

            case "business":
                return businessRepo.findOne({
                    business_code: entityCode,
                });

            case "venue":
                return venueRepo.findOne({
                    venue_code: entityCode,
                });

            case "event":
                return eventRepo.findOne({
                    event_code: entityCode,
                });

            case "influencer":
                return influencerRepo.findOne({
                    influencer_code: entityCode,
                });

            default:
                throw new Error("Unsupported entity type");
        }

    }

}

export default EntityResolver;