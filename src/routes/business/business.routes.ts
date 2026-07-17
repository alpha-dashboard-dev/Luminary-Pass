import { FastifyInstance} from "fastify";
import businessController from "../../controllers/business/business.controller";
import {authenticate} from "../../middleware/authenticate.js";
import {hasPermission} from "../../middleware/hasPermission.js";


export default async function businessRoutes(fastify: FastifyInstance) {


    // Business Registration
    fastify.post(
        "/register-business",
        businessController.registerBusiness,
    )

    fastify.get(
        "/activate",
        businessController.activateBusiness
    );
    //
    // fastify.post(
    //     "/create-business",
    //     {
    //         preHandler: [
    //             authenticate,
    //             hasPermission(
    //                 ["PER00013", "8A496AEC", "E70C0852", "E23A69A8"],
    //                 false
    //             )
    //         ]
    //     },
    //     businessController.create
    // )

    fastify.get(
        '/get-all-businesses',
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["E0762CD1", "PER00014", "E70C0852", "E23A69A8"],
                    false
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
                    ["PER00013", "PER00014", "PER00015", "PER00016"],
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
                    ["E0762CD1", "PER00014", "E70C0852", "E23A69A8"],
                    false
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
                    ["E0762CD1", "8A496AEC", "PER00015", "E23A69A8"],
                   false
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
                    ["E0762CD1", "8A496AEC", "PER00015", "E23A69A8"],
                    false
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
                    ["PER00013", "PER00014", "PER00015", "PER00016"],
                    true
                )
            ]
        },
        businessController.delete
    )
}