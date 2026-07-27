import { FastifyInstance} from "fastify";
import participantChecklistController from "../../controllers/event/participantChecklist.controller";
import {authenticate} from "../../middleware/authenticate.js";
import {hasPermission} from "../../middleware/hasPermission.js";


export default async function participantChecklistRoutes(fastify: FastifyInstance) {

    fastify.post(
        "/create-participantChecklist",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00089", "PER00090", "PER00091", "PER00092"],
                    false
                )
            ]
        },
        participantChecklistController.create
    )

    fastify.get(
        '/get-all-checklists',
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00089", "PER00090", "PER00091", "PER00092"],
                    true
                )
            ]
        },
        participantChecklistController.getAll
    )

    fastify.get(
        '/get-one-checklist/:checklistCode',
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00089", "PER00090", "PER00091", "PER00092"],
                    true
                )
            ]
        },
        participantChecklistController.getByParticipantChecklistCode
    )

    fastify.get(
        '/get-checklist-by-field',
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00089", "PER00090", "PER00091", "PER00092"],
                    true
                )
            ]
        },
        participantChecklistController.getByField
    )

    fastify.put(
        "/update-checklist/:checklistCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00089", "PER00090", "PER00091", "PER00092"],
                    true
                )
            ]
        },
        participantChecklistController.update
    )

    fastify.delete(
        "/delete-checklist/:checklistCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00089", "PER00090", "PER00091", "PER00092"],
                    true
                )
            ]
        },
        participantChecklistController.delete
    )
}