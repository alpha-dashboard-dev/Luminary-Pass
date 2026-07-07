import { FastifyInstance} from "fastify";
import checklistController from "../../controllers/event/checklist.controller";
import {authenticate} from "../../middleware/authenticate";
import {hasPermission} from "../../middleware/hasPermission";


export default async function checklistRoutes(fastify: FastifyInstance) {

    // fastify.post(
    //     "/create-checklist",
    //     {
    //         preHandler: [
    //             authenticate,
    //             hasPermission([{"code":"","name":""}],required:"any/all")
    //         ]
    //     },
    //     checklistController.create
    // )

    fastify.post(
        "/create-checklist",
        {
            preHandler: [
                authenticate,
                hasPermission({
                    permissions: ["A93ABD2D"],
                    required: "any"
                })
            ]
        },
        checklistController.create
    )

    fastify.get(
        '/get-all-checklists',
        {
            preHandler: [
                authenticate,
                hasPermission({
                    permissions: ["A93ABD2", "7425701C"],
                    required: "any"
                }),
            ]
        },
        checklistController.getAll
    )

    fastify.get(
        '/get-one-checklist/:checklistCode',
        {
            preHandler: [
                authenticate,
                hasPermission({
                    permissions: ["A93ABDD", "7425701C"],
                    required: "any"
                }),
            ]
        },
        checklistController.getByChecklistCode
    )

    fastify.get(
        '/get-checklist-by-field',
        {
            preHandler: [
                authenticate,
                hasPermission({
                    permissions: ["A93ABD2D", "7425701C"],
                    required: "any"
                }),
            ]
        },
        checklistController.getByField
    )

    fastify.put(
        "/update-checklist/:checklistCode",
        {
            preHandler: [
                authenticate,
                hasPermission({
                    permissions: ["A93ABDD", "0C42B426"],
                    required: "any"
                }),
            ]
        },
        checklistController.update
    )

    fastify.patch(
        "/deactivate-checklist/:checklistCode",
        {
            preHandler: [
                authenticate,
                hasPermission({
                    permissions: ["A93ABD2D", "0C42B426"],
                    required: "any"
                }),
            ]
        },
        checklistController.deactivate
    )

    fastify.delete(
        "/delete-checklist/:checklistCode",
        {
            preHandler: [
                authenticate,
                hasPermission({
                    permissions: ["A93ABD2", "45191262"],
                    required: "any"
                }),
            ]
        },
        checklistController.delete
    )
}