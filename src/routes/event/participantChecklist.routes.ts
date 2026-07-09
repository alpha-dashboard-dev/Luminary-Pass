import { FastifyInstance} from "fastify";
import participantChecklistController from "../../controllers/event/participant.controller";
import {authenticate} from "../../middleware/authenticate.js";
import {hasPermission} from "../../middleware/hasPermission.js";


export default async function participantChecklistRoutes(fastify: FastifyInstance) {

    fastify.post(
        "/create-participant",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00061", "PER00062", "PER00063", "PER00064"],
                    true
                )
            ]
        },
        participantChecklistController.create
    )

    fastify.get(
        '/get-all-participants',
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00061", "PER00062", "PER00063", "PER00064"],
                    true
                )
            ]
        },
        participantChecklistController.getAll
    )

    fastify.get(
        '/get-one-participant/:participantCode',
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00061", "PER00062", "PER00063", "PER00064"],
                    true
                )
            ]
        },
        participantChecklistController.getByParticipantCode
    )

    fastify.get(
        '/get-participant-by-field',
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00061", "PER00062", "PER00063", "PER00064"],
                    true
                )
            ]
        },
        participantChecklistController.getByField
    )

    fastify.put(
        "/update-participant/:participantCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00061", "PER00062", "PER00063", "PER00064"],
                    true
                )
            ]
        },
        participantChecklistController.update
    )

    fastify.delete(
        "/delete-participant/:participantCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00061", "PER00062", "PER00063", "PER00064"],
                    true
                )
            ]
        },
        participantChecklistController.delete
    )
}