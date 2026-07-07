import { FastifyInstance} from "fastify";
import businessController from "../../controllers/business/business.controller";
import {authenticate} from "../../middleware/authenticate.js";
import {hasPermission} from "../../middleware/hasPermission.js";


export default async function businessRoutes(fastify: FastifyInstance) {

    fastify.post(
        "/create-business",
        {
            preHandler: [
                authenticate,
                hasPermission({
                    permissions: ["E0762CD1"],
                    required: "any"
                })

            ]
        },
        businessController.create
    )

    fastify.get(
        '/get-all-businesses',
        {
            preHandler: [
                authenticate,
                hasPermission({
                    permissions: ["8A496AEC"],
                    required: "any"
                })
            ]
        },
        businessController.getAll
    )

    fastify.get(
        '/get-one-business/:businessCode',
        {
            preHandler: [
                authenticate,
                hasPermission({
                    permissions: ["8A496AEC"],
                    required: "any"
                })
            ]
        },
        businessController.getByBusinessCode
    )

    fastify.get(
        '/get-business-by-field',
        {
            preHandler: [
                authenticate,
                hasPermission({
                    permissions: ["8A496AEC"],
                    required: "all"
                })
            ]
        },
        businessController.getByField
    )

    fastify.put(
        "/update-business/:businessCode",
        {
            preHandler: [
                authenticate,
                hasPermission({
                    permissions: ["E70C0852"],
                    required: "any"
                })
            ]
        },
        businessController.update
    )

    fastify.patch(
        "/deactivate-business/:businessCode",
        {
            preHandler: [
                authenticate,
                hasPermission({
                    permissions: ["E70C0852"],
                    required: "any"
                })
            ]
        },
        businessController.deactivate
    )

    fastify.delete(
        "/delete-business/:businessCode",
        {
            preHandler: [
                authenticate,
                hasPermission({
                    permissions: ["E23A69A8"],
                    required: "any"
                })
            ]
        },
        businessController.delete
    )
}