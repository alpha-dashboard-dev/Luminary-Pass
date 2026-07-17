import { FastifyInstance} from "fastify";
import checklistAttachmentController from "../../controllers/event/checklistAttachment.controller";
import {authenticate} from "../../middleware/authenticate";
import {hasPermission} from "../../middleware/hasPermission";


export default async function checklistAttachmentRoutes(fastify: FastifyInstance) {

    fastify.post(
        "/create-checklistAttachment",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00073", "PER00074", "PER00075", "PER00076"],
                    true
                )
            ]
        },
        checklistAttachmentController.create
    )

    fastify.get(
        '/get-all-checklistAttachments',
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00073", "PER00074", "PER00075", "PER00076"],
                    true
                )
            ]
        },
        checklistAttachmentController.getAll
    )

    fastify.get(
        '/get-one-checklistAttachment/:attachmentCode',
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00073", "PER00074", "PER00075", "PER00076"],
                    true
                )
            ]
        },
        checklistAttachmentController.getByAttachmentCode
    )

    fastify.get(
        '/get-checklistAttachment-by-field',
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00073", "PER00074", "PER00075", "PER00076"],
                    true
                )
            ]
        },
        checklistAttachmentController.getByField
    )

    fastify.put(
        "/update-checklistAttachment/:attachmentCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00073", "PER00074", "PER00075", "PER00076"],
                    true
                )
            ]
        },
        checklistAttachmentController.update
    )

    fastify.delete(
        "/delete-checklistAttachment/:attachmentCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00073", "PER00074", "PER00075", "PER00076"],
                    true
                )
            ]
        },
        checklistAttachmentController.delete
    )
}