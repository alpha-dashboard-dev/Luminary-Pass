import ratingRepo from "../../repositories/influencer/influencerRating.repository";
import { generateCode } from "../../utils/generateCode";
import {buildWhere} from "../../utils/buildWhere";
import influencerRepo from "../../repositories/influencer/influencer.repository";
import eventRepo from "../../repositories/event/event.repository";
import userRepo from "../../repositories/user/user.repository.js";

class influencerRatingService {

    // Create rating

    async create(data: any) {

        const influencer = await influencerRepo.findOne({
            influencer_code: data.influencerCode,
        })

        if(!influencer) {
            throw new Error("Influencer doesn't exist");
        }

        const event = await eventRepo.findOne({
            event_code: data.eventCode
        })

        if(!event) {
            throw new Error("Event doesn't exist");
        }

        const user = await userRepo.findOne({
            user_code: data.ratedBy
        })

        if(!user) {
            throw new Error("User doesn't exist. Who give the rating to influencer");
        }

        const ratingCode = generateCode();

        return await ratingRepo.create({
            rating_code: ratingCode,
            influencer_code: data.influencerCode,
            event_code: data.eventCode,
            rated_by: data.ratedBy,
            rating_source: data.ratingSource,
            rating_type: data.ratingType,
            rating: data.rating,
            comments: data.comments,
        });
    }

    // Get all ratings

    async getAll(query: any = {}) {
        // console.log(query.where)
        const where = buildWhere(query);
        return ratingRepo.findAll(
            where,
            {
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

    // Get ratings By rating code
    async getByRatingCode(ratingCode: string, query: any = {}, actor: any) {

        const rating = await ratingRepo.findOne(
            {
                rating_code: ratingCode
            },
            {
                include: Array.isArray(query.include) ? query.include : [],
            }
        );

        if (!rating) {
            throw new Error("rating not found");
        }

        return rating;
    }

    // Get rating By Any Field
    async getByField(where: any, query: any = {}, actor: any) {
        // console.log(where);
        const rating = await ratingRepo.findOne(
            where,
            {
                include: query.include || []
            }
        );

        if (!rating) {
            throw new Error("rating not found");
        }

        return rating;
    }

    // Update rating
    async update(ratingCode: string, data: any, actor: any) {

        const rating = await ratingRepo.findOne({
            rating_code: ratingCode
        });

        if (!rating) throw new Error("rating not found");

        return await ratingRepo.update(
            { rating_code: ratingCode },
            data
        );
    }

    // Delete rating

    async delete(ratingCode: string, actor: any) {
        const rating = await ratingRepo.findOne({
            rating_code: ratingCode
        });

        if (!rating) {
            throw new Error("rating not found");
        }

        return await ratingRepo.delete({
            rating_code: ratingCode
        });
    }

}

export default new influencerRatingService();