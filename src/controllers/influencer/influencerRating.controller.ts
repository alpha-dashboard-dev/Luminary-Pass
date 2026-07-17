import { FastifyReply, FastifyRequest } from "fastify";
import ratingService from "../../services/influencer/influencerRating.service";
import {validateInfluencerRating} from "../../utils/validator.js";

class ratingController {

    async create(req: FastifyRequest, reply: FastifyReply) {

        try{
            const data = req.body;
            validateInfluencerRating(data);
            const result =  await ratingService.create(
                data,
                req.user
            )
            return reply.status(200).send({
                success: true,
                message: "rating created successfully",
                data: result
            });
        }
        catch (err: any) {
            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }

    async getAll(req: FastifyRequest, reply: FastifyReply) {

        try {
            let include = req.query.include ?? "";
            include = [
                {
                    alias: "event",
                    attributes: [],
                },
                {
                    alias: "influencer",
                    attributes: [],
                },
                {
                    alias: "rater",
                    attributes: [],
                },
            ]
            // console.log(include)
            const data =
                await ratingService.getAll(
                    {
                        ...req.query,
                        include
                    },
                    req.user
                );

            return reply.status(200).send({
                success: true,
                data,
            });

        } catch (err: any) {
            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }

    // Get by rating code
    async getByRatingCode(req: FastifyRequest, reply: FastifyReply) {

        try {
            let include = req.query.include ?? "";
            include = [
                {
                    alias: "event",
                    attributes: [],
                },
                {
                    alias: "influencer",
                    attributes: [],
                },
                {
                    alias: "rater",
                    attributes: [],
                },
            ]
            const ratingCode = String(req.params.ratingCode)
            const result = await ratingService.getByRatingCode(
                ratingCode,
                {
                    ...req.query,
                    include
                },
                req.user,
            );

            return reply.status(200).send({
                success: true,
                result,
            });

        } catch (err: any) {

            return reply.status(404).send({
                success: false,
                message: err.message,
            });
        }
    }

    // Get By Any Field
    async getByField(req: FastifyRequest, reply: FastifyReply) {

        try {
            let include = req.query.include ?? "";
            include = [
                {
                    alias: "event",
                    attributes: [],
                },
                {
                    alias: "influencer",
                    attributes: [],
                },
                {
                    alias: "rater",
                    attributes: [],
                },
            ]
            const where = {...req.query};
            const result = await ratingService.getByField(
                where,
                {
                    ...req.query,
                    include
                },
                req.user,
            );

            return reply.status(200).send({
                success: true,
                result,
            });

        } catch (err: any) {

            return reply.status(404).send({
                success: false,
                message: err.message,
            });
        }
    }


    //Update rating

    async update(req: FastifyRequest, reply: FastifyReply) {

        try {

            const ratingCode = String(req.params.ratingCode);

            const data = await ratingService.update(
                ratingCode,
                req.body,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "rating updated successfully",
                data,
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message,
            });
        }
    }

    //  DELETE rating
    async delete(req: FastifyRequest, reply: FastifyReply) {

        try {
            const ratingCode = String(req.params.ratingCode)

            await ratingService.delete(
                ratingCode,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "rating permanently deleted"
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }
}

export default  new ratingController();