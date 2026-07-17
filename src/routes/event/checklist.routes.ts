import { FastifyInstance} from "fastify";
import checklistController from "../../controllers/event/checklist.controller";
import {authenticate} from "../../middleware/authenticate";
import {hasPermission} from "../../middleware/hasPermission";


export default async function checklistRoutes(fastify: FastifyInstance) {

    fastify.post(
        "/create-checklist",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00069", "PER00070", "PER00071", "PER00072"],
                    true
                )
            ]
        },
        checklistController.create
    )

    fastify.get(
        '/get-all-checklists',
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00069", "PER00070", "PER00071", "PER00072"],
                    true
                )
            ]
        },
        checklistController.getAll
    )

    fastify.get(
        '/get-one-checklist/:checklistCode',
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00069", "PER00070", "PER00071", "PER00072"],
                    true
                )
            ]
        },
        checklistController.getByChecklistCode
    )

    fastify.get(
        '/get-checklist-by-field',
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00069", "PER00070", "PER00071", "PER00072"],
                    true
                )
            ]
        },
        checklistController.getByField
    )

    fastify.put(
        "/update-checklist/:checklistCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00069", "PER00070", "PER00071", "PER00072"],
                    true
                )
            ]
        },
        checklistController.update
    )

    fastify.delete(
        "/delete-checklist/:checklistCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00069", "PER00070", "PER00071", "PER00072"],
                    true
                )
            ]
        },
        checklistController.delete
    )
}