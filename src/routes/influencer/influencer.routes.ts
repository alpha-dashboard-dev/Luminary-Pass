import { FastifyInstance } from "fastify";
import influencerController from "../../controllers/influencer/influencer.controller";

import { authenticate } from "../../middleware/authenticate";
import { hasPermission } from "../../middleware/hasPermission";
import {loadPermissions} from "../../middleware/loadPermissions";

export default async function influencerRoutes(fastify: FastifyInstance) {

    // CREATE influencer
    fastify.post(
        "/create-influencer",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("influencer.create")
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
                loadPermissions,
                hasPermission("influencer.read")
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
                loadPermissions,
                hasPermission("influencer.read")
            ]
        },
        influencerController.getByInfluencerCode
    );

    fastify.get(
        "/get-by-any-field",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("influencer.read")
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
                loadPermissions,
                hasPermission("influencer.update")
            ]
        },
        influencerController.update
    );

    // Deactivate influencer

    fastify.patch(
        "/deactivate-influencer/:influencerCode",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("influencer.update")
            ]
        },
        influencerController.deactivate
    )

    // DELETE influencer
    fastify.delete(
        "/delete-influencer/:influencerCode",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("influencer.delete")
            ]
        },
        influencerController.delete
    );
}