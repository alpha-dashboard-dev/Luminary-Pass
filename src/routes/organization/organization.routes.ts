import { FastifyInstance} from "fastify";
import orgController from "../../controllers/organization/organization.controller";
import {authenticate} from "../../middleware/authenticate.js";
import {hasPermission} from "../../middleware/hasPermission.js";


export default async function orgRoutes(fastify: FastifyInstance) {

    // fastify.post(
    //     "/create-organization",
    //     {
    //         preHandler: [
    //             authenticate,
    //             hasPermission([{"code":"","name":""}],required:"any/all")
    //         ]
    //     },
    //     orgController.create
    // )

    fastify.post(
        "/create-organization",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00009", "PER00010", "PER00011", "PER00012"],
                    false
                )
            ]
        },
        orgController.create
    )

    fastify.get(
        '/get-all-organizations',
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00009", "PER00010", "PER00011", "PER00012"],
                    false
                )
            ]
        },
        orgController.getAll
    )

    fastify.get(
        '/get-one-organization/:organizationCode',
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00009", "PER00010", "PER00011", "PER00012"],
                    true
                )
            ]
        },
        orgController.getByOrganizationCode
    )

    fastify.get(
        '/get-organization-by-field',
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00009", "PER00010", "PER00011", "PER00012"],
                    true
                )
            ]
        },
        orgController.getByField
    )

    fastify.put(
        "/update-organization/:organizationCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00009", "PER00010", "PER00011", "PER00012"],
                    true
                )
            ]
        },
        orgController.update
    )

    fastify.patch(
        "/deactivate-organization/:organizationCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00009", "PER00010", "PER00011", "PER00012"],
                    true
                )
            ]
        },
        orgController.deactivate
    )

    fastify.delete(
        "/delete-organization/:organizationCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00009", "PER00010", "PER00011", "PER00012"],
                    true
                )
            ]
        },
        orgController.delete
    )
}