import badgeRepo from "../../repositories/badge/badge.repository";
import { generateCode } from "../../utils/generateCode";
import {buildWhere} from "../../utils/buildWhere.js";
import venueRepo from "../../repositories/venue/venue.repository.js";
import influencerRepo from "../../repositories/influencer/influencer.repository.js";
import businessRepo from "../../repositories/busines/business.repository.js";
import eventRepo from "../../repositories/event/event.repository.js";

class badgeService {

    // Create badges

    async create(data: any) {

        switch (data.entityType) {
            case "venue":
                const venue = await venueRepo.findOne({
                    venue_code: data.entityCode,
                });

                if(!venue){
                    throw new Error("Venue doesn't exist");
                }
                break;

            case "influencer":

                const influencer = await influencerRepo.findOne({
                    influencer_code: data.entityCode,
                })
                if (!influencer){
                    throw new Error("Influencer doesn't exist");
                }
                break;

            case "business":
                const business = await businessRepo.findOne({
                    business_code: data.entityCode,
                })

                if(!business) {
                    throw new Error("Business does not exist")
                }
                break;

            case "event":
                const event = await eventRepo.findOne({
                    event_code: data.entityCode,
                })

                if (!event) {
                    throw new Error("Event does not exist");
                }
                break;
        }


        const badgeCode = generateCode();

        return await badgeRepo.create({
            entity_badge_code: badgeCode,
            entity_type: data.entityType,
            entity_code: data.entityCode,
            badge_name: data.badgeName,
            badge_description: data.badgeDescription,
            badge_icon: data.bdgeIcon,
            badge_type: data.badgeType,
            badge_level: data.badgeLevel,
            score: data.score,
            awarded_by: data.awardedBy,
            awarded_at: data.awardedAt,
            expires_at: data.expiresAt,
            status: data.status,
        });
    }

    // Get all badges

    async getAll(query: any = {}) {
        // console.log(query.where)
        const where = buildWhere(query);

        return badgeRepo.findAll({
            where,
            include: Array.isArray(query.include)
                ? query.include
                : [],
            limit: query.limit ? Number(query.limit) : undefined,
            offset: query.offset ? Number(query.offset) : undefined,
            order: [
                [
                    query.sort_by || "created_at",
                    query.sort_order || "DESC"
                ]
            ]
        });
    }

    // Get badges By badge code
    async getByBadgeCode(badgeCode: string, query: any = {}) {

        const badge = await badgeRepo.findOne(
            {
                entity_badge_code: badgeCode
            },
            {
                include: Array.isArray(query.include) ? query.include : [],
            }
        );

        if (!badge) {
            throw new Error("badge not found");
        }

        return badge;
    }

    // Get badge By Any Field
    async getByField(where: any, query: any = {}) {
        // console.log(where);
        const badge = await badgeRepo.findOne(
            where,
            {
                include: query.include || []
            }
        );

        if (!badge) {
            throw new Error("badge not found");
        }

        return badge;
    }

    // Update badge
    async update(badgeCode: string, data: any) {
        // console.log(data)

        const badge = await badgeRepo.findOne({
            entity_badge_code: badgeCode
        });

        if (!badge) throw new Error("badge not found");


        return await badgeRepo.update(
            { entity_badge_code: badgeCode },
            data
        );
    }

    // Delete badge

    async delete(badgeCode: string) {
        const badge = await badgeRepo.findOne({
            entity_badge_code: badgeCode
        });

        if (!badge) {
            throw new Error("badge not found");
        }

        return await badgeRepo.delete({
            entity_badge_code: badgeCode
        });
    }

    // Deactivate badge

    async deactivate(badgeCode: string, data: any) {

        const badge = await badgeRepo.findOne({
            entity_badge_code: badgeCode
        });

        if (!badge) {
            throw new Error("badge not found");
        }

        return await badgeRepo.deactivate({
                entity_badge_code: badgeCode
            },
            data
        );
    }
}

export default new badgeService();