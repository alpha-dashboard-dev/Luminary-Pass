import { FastifyInstance } from "fastify";
import userController from "../../controllers/user/user.controller";

import { authenticate } from "../../middleware/authenticate";
import { hasPermission } from "../../middleware/hasPermission";

export default async function userRoutes(fastify: FastifyInstance) {

    // CREATE USER
    fastify.post(
        "/create-user",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00001", "PER00002", "PER00003", "PER00004"],
                    true
                )
            ]
        },
        userController.create
    );

    // GET ALL USERS
    fastify.get(
        "/get-all-users",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00001", "PER00002", "PER00003", "PER00004"],
                    true
                )
            ]
        },
        userController.getAll
    );

    // GET USER BY CODE
    fastify.get(
        "/get-one-user/:userCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00001", "PER00002", "PER00003", "PER00004"],
                    true
                )
            ]
        },
        userController.getByUserCode
    );

    fastify.get(
        "/get-by-any-field",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00001", "PER00002", "PER00003", "PER00004"],
                    true
                )
            ]
        },
        userController.getByField
    );

    // UPDATE USER
    fastify.put(
        "/update-user/:userCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00001", "PER00002", "PER00003", "PER00004"],
                    true
                )
            ]
        },
        userController.update
    );

    // Deactivate User

    fastify.patch(
        "/deactivate-user/:userCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00001", "PER00002", "PER00003", "PER00004"],
                    true
                )
            ]
        },
        userController.deactivate
    )

    // DELETE USER
    fastify.delete(
        "/delete-user/:userCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00001", "PER00002", "PER00003", "PER00004"],
                    true
                )
            ]
        },
        userController.delete
    );

    fastify.put(
        "/send-profile-setup-link/:userCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00001", "PER00002", "PER00003", "PER00004"],
                    true
                )
            ]
        },
        userController.sendProfileSetupLink
    )

    fastify.get(
        "/setup-profile",
        userController.verifySetupLink
    )

    fastify.post(
        "/setup-profile",
        userController.setupProfile
    )

    fastify.patch(
        "/activate-user-account/:userCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00001", "PER00002", "PER00003", "PER00004"],
                    true
                )
            ]
        },
        userController.activateUserAccount
    )
}