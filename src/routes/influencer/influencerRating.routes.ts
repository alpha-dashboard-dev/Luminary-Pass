import { FastifyInstance } from "fastify";
import ratingController from "../../controllers/influencer/influencerRating.controller";

import { authenticate } from "../../middleware/authenticate";
import { hasPermission } from "../../middleware/hasPermission";

export default async function ratingRoutes(fastify: FastifyInstance) {

    // CREATE rating
    fastify.post(
        "/create-rating",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00041", "PER00042", "PER00043", "PER00044"],
                    true
                )
            ]
        },
        ratingController.create
    );

    // GET ALL rating
    fastify.get(
        "/get-all-ratings",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00041", "PER00042", "PER00043", "PER00044"],
                    true
                )
            ]
        },
        ratingController.getAll
    );

    // GET rating BY CODE
    fastify.get(
        "/get-one-rating/:ratingCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00041", "PER00042", "PER00043", "PER00044"],
                    true
                )
            ]
        },
        ratingController.getByRatingCode
    );

    fastify.get(
        "/get-rating-by-field",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00041", "PER00042", "PER00043", "PER00044"],
                    true
                )
            ]
        },
        ratingController.getByField
    );

    // UPDATE rating
    fastify.put(
        "/update-rating/:ratingCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00041", "PER00042", "PER00043", "PER00044"],
                    true
                )
            ]
        },
        ratingController.update
    );

    // DELETE rating
    fastify.delete(
        "/delete-rating/:ratingCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00041", "PER00042", "PER00043", "PER00044"],
                    true
                )
            ]
        },
        ratingController.delete
    );
}