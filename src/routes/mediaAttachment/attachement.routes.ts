import { FastifyInstance } from "fastify";
import attachmentController from "../../controllers/mediaAttachment/attachment.controller";

import { authenticate } from "../../middleware/authenticate";
import { hasPermission } from "../../middleware/hasPermission";

export default async function attachmentRoutes(fastify: FastifyInstance) {

    // CREATE attachment
    fastify.post(
        "/create-attachment",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00057", "ER00058", "ER00059", "ER00060"],
                    false
                )
            ]
        },
        attachmentController.create
    );

    // GET ALL attachment
    fastify.get(
        "/get-all-attachments",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00057", "PER00058", "PER00059", "PER00060"],
                    false
                )
            ]
        },
        attachmentController.getAll
    );

    // GET attachment BY CODE
    fastify.get(
        "/get-one-attachment/:attachmentCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00057", "PER00058", "PER00059", "PER00060"],
                    false
                )
            ]
        },
        attachmentController.getByAttachmentCode
    );

    fastify.get(
        "/get-attachment-by-field",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00057", "PER00058", "PER00059", "PER00060"],
                    false
                )
            ]
        },
        attachmentController.getByField
    );

    // UPDATE attachment
    fastify.put(
        "/update-attachment/:attachmentCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00057", "PER00058", "PER00059", "PER00060"],
                    false
                )
            ]
        },
        attachmentController.update
    );

    // DELETE USER
    fastify.delete(
        "/delete-attachment/:attachmentCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00057", "PER00058", "PER00059", "PER00060"],
                    false
                )
            ]
        },
        attachmentController.delete
    );
}