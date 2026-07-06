import { FastifyInstance} from "fastify";
import invitationController from "../../controllers/event/invitation.controller";
import {authenticate} from "../../middleware/authenticate.js";
import {hasPermission} from "../../middleware/hasPermission.js";
import {loadPermissions} from "../../middleware/loadPermissions.js";


export default async function invitationRoutes(fastify: FastifyInstance) {

    fastify.post(
        "/create-invitation",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("invitation.create"),

            ]
        },
        invitationController.create
    )

    fastify.get(
        '/get-all-invitations',
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("invitation.read"),
            ]
        },
        invitationController.getAll
    )

    fastify.get(
        '/get-one-invitation/:invitationCode',
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("invitation.read"),
            ]
        },
        invitationController.getByInvitationCode
    )

    fastify.get(
        '/get-invitation-by-field',
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("invitation.read"),
            ]
        },
        invitationController.getByField
    )

    fastify.put(
        "/update-invitation/:invitationCode",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("invitation.update"),
            ]
        },
        invitationController.update
    )

    fastify.delete(
        "/delete-invitation/:invitationCode",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("invitation.delete"),
            ]
        },
        invitationController.delete
    )
}