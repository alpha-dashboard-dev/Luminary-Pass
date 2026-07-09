import { FastifyInstance} from "fastify";
import socialLoginController from "../../controllers/socialLogin/socialLogin.controller";
import {authenticate} from "../../middleware/authenticate.js";
import {hasPermission} from "../../middleware/hasPermission.js";


export default async function socialLoginRoutes(fastify: FastifyInstance) {

    fastify.post(
        "/create-socialLogin",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00085", "PER00086", "PER00087", "PER00088"],
                    true
                )
            ]
        },
        socialLoginController.create
    )

    fastify.get(
        '/get-all-socialLogins',
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00085", "PER00086", "PER00087", "PER00088"],
                    true
                )
            ]
        },
        socialLoginController.getAll
    )

    fastify.get(
        '/get-one-socialLogin/:socialLoginCode',
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00085", "PER00086", "PER00087", "PER00088"],
                    true
                )
            ]
        },
        socialLoginController.getBysocialLoginCode
    )

    fastify.get(
        '/get-socialLogin-by-field',
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00085", "PER00086", "PER00087", "PER00088"],
                    true
                )
            ]
        },
        socialLoginController.getByField
    )

    fastify.put(
        "/update-socialLogin/:socialLoginCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00085", "PER00086", "PER00087", "PER00088"],
                    true
                )
            ]
        },
        socialLoginController.update
    )

    fastify.patch(
        "/deactivate-socialLogin/:socialLoginCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00085", "PER00086", "PER00087", "PER00088"],
                    true
                )
            ]
        },
        socialLoginController.deactivate
    )

    fastify.delete(
        "/delete-socialLogin/:socialLoginCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00085", "PER00086", "PER00087", "PER00088"],
                    true
                )
            ]
        },
        socialLoginController.delete
    )
}