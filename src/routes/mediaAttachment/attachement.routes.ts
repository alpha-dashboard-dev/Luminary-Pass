import { FastifyInstance } from "fastify";
import attachmentController from "../../controllers/mediaAttachment/attachment.controller";

import { authenticate } from "../../middleware/authenticate";
import { hasPermission } from "../../middleware/hasPermission";
import {loadPermissions} from "../../middleware/loadPermissions";

export default async function attachmentRoutes(fastify: FastifyInstance) {

    // CREATE attachment
    fastify.post(
        "/create-attachment",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("attachment.create")
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
                loadPermissions,
                hasPermission("attachment.read")
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
                loadPermissions,
                hasPermission("attachment.read")
            ]
        },
        attachmentController.getByAttachmentCode
    );

    fastify.get(
        "/get-attachment-by-field",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("attachment.read")
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
                loadPermissions,
                hasPermission("attachment.update")
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
                loadPermissions,
                hasPermission("attachment.delete")
            ]
        },
        attachmentController.delete
    );
}