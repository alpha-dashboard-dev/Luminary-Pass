import { FastifyInstance } from "fastify";
import influencerController from "../../controllers/influencer/influencer.controller";

import { authenticate } from "../../middleware/authenticate";
import { hasPermission } from "../../middleware/hasPermission";

export default async function influencerRoutes(fastify: FastifyInstance) {

    // CREATE influencer
    fastify.post(
        "/create-influencer",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00033", "PER000", "PER000", "PER000"],
                    false
                )
            ]
        },
        influencerController.create
    );

    // GET ALL influencer
    fastify.get(
        "/get-all-influencers",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00033", "PER00034", "PER00035", "PER00036"],
                    true
                )
            ]
        },
        influencerController.getAll
    );

    // GET influencer BY CODE
    fastify.get(
        "/get-one-influencer/:influencerCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00033", "PER00034", "PER00034", "PER00036"],
                    false
                )
            ]
        },
        influencerController.getByInfluencerCode
    );

    fastify.get(
        "/get-by-any-field",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00033", "PER00034", "PER00035", "PER00036"],
                    true
                )
            ]
        },
        influencerController.getByField
    );

    // UPDATE influencer
    fastify.put(
        "/update-influencer/:influencerCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00033", "PER00034", "PER00035", "PER00036"],
                    true
                )
            ]
        },
        influencerController.update
    );

    // DELETE influencer
    fastify.delete(
        "/delete-influencer/:influencerCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00033", "PER00034", "PER00035", "PER00036"],
                    true
                )
            ]
        },
        influencerController.delete
    );
}