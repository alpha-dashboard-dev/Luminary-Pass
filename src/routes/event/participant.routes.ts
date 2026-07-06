import { FastifyInstance} from "fastify";
import participantController from "../../controllers/event/participant.controller";
import {authenticate} from "../../middleware/authenticate.js";
import {hasPermission} from "../../middleware/hasPermission.js";
import {loadPermissions} from "../../middleware/loadPermissions.js";


export default async function participantRoutes(fastify: FastifyInstance) {

    fastify.post(
        "/create-participant",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("eventparticipant.create"),

            ]
        },
        participantController.create
    )

    fastify.get(
        '/get-all-participants',
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("eventparticipant.read"),
            ]
        },
        participantController.getAll
    )

    fastify.get(
        '/get-one-participant/:participantCode',
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("eventparticipant.read"),
            ]
        },
        participantController.getByParticipantCode
    )

    fastify.get(
        '/get-participant-by-field',
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("eventparticipant.read"),
            ]
        },
        participantController.getByField
    )

    fastify.put(
        "/update-participant/:participantCode",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("eventparticipant.update"),
            ]
        },
        participantController.update
    )

    fastify.delete(
        "/delete-participant/:participantCode",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("eventparticipant.delete"),
            ]
        },
        participantController.delete
    )
}