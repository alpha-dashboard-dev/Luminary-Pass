import {FastifyInstance} from "fastify";
import {authenticate} from "../../middleware/authenticate.js";
import {hasPermission} from "../../middleware/hasPermission.js";
import participantChecklistMediaController from "../../controllers/event/participantChecklistMedia.controller.js";

export default async function participantChecklistMediaRoutes(fastify: FastifyInstance) {

    fastify.get(
        "/get-submitted-media/:participantChecklistCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00045", "PER00046", "PER00047", "PER00048"],
                    false
                )
            ]
        },

        participantChecklistMediaController.getSubmittedMedia
    )

    fastify.put(
        "/remark-media/:participantChecklistMediaCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00045", "PER00046", "PER00047", "PER00048"],
                    false
                )
            ]
        },

        participantChecklistMediaController.remarkMediaAgainstEvent
    )
}