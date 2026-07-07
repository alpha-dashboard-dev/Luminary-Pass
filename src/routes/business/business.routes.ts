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
                hasPermission(
                    ["E0762CD1", "8A496AEC", "E70C0852", "E23A69A8"],
                    true
                )
            ]
        },
        businessController.create
    )

    fastify.get(
        '/get-all-businesses',
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["E0762CD1", "8A496AEC", "E70C0852", "E23A69A8"],
                    true
                )
            ]
        },
        businessController.getAll
    )

    fastify.get(
        '/get-one-business/:businessCode',
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["E0762CD1", "8A496AEC", "E70C0852", "E23A69A8"],
                    true
                )
            ]
        },
        businessController.getByBusinessCode
    )

    fastify.get(
        '/get-business-by-field',
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["E0762CD1", "8A496AEC", "E70C0852", "E23A69A8"],
                    true
                )
            ]
        },
        businessController.getByField
    )

    fastify.put(
        "/update-business/:businessCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["E0762CD1", "8A496AEC", "E70C0852", "E23A69A8"],
                    true
                )
            ]
        },
        businessController.update
    )

    fastify.patch(
        "/deactivate-business/:businessCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["E0762CD1", "8A496AEC", "E70C0852", "E23A69A8"],
                    true
                )
            ]
        },
        businessController.deactivate
    )

    fastify.delete(
        "/delete-business/:businessCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["E0762CD1", "8A496AEC", "E70C0852", "E23A69A8"],
                    true
                )
            ]
        },
        businessController.delete
    )
}