import { FastifyInstance} from "fastify";
import invitationController from "../../controllers/event/invitation.controller";
import {authenticate} from "../../middleware/authenticate.js";
import {hasPermission} from "../../middleware/hasPermission.js";


export default async function invitationRoutes(fastify: FastifyInstance) {

    fastify.post(
        "/create-invitation",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00045", "PER00046", "PER00047", "PER00048"],
                    false
                )
            ]
        },
        invitationController.create
    )

    fastify.get(
        '/get-all-invitations',
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00045", "PER00046", "PER00047", "PER00048"],
                    false
                )
            ]
        },
        invitationController.getAll
    )

    fastify.get(
        '/get-one-invitation/:invitationCode',
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00045", "PER00046", "PER00047", "PER00048"],
                    false
                )
            ]
        },
        invitationController.getByInvitationCode
    )

    fastify.get(
        '/get-invitation-by-field',
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00045", "PER00046", "PER00047", "PER00048"],
                    false
                )
            ]
        },
        invitationController.getByField
    )

    fastify.put(
        "/update-invitation/:invitationCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00045", "PER00046", "PER00047", "PER00048"],
                    false
                )
            ]
        },
        invitationController.update
    )

    fastify.put(
        "/respond-to-invitation/:invitationCode",
        {
            preHandler: [
                authenticate,
                // hasPermission(
                //     ["PER00045", "PER00046", "PER00047", "PER00048"],
                //     false
                // )
            ]
        },
        invitationController.respondToInvitation
    )

    fastify.delete(
        "/delete-invitation/:invitationCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00045", "PER00046", "PER00047", "PER00048"],
                    false
                )
            ]
        },
        invitationController.delete
    )
}