import { FastifyInstance} from "fastify";
import orgController from "../../controllers/organization/organization.controller";
import {authenticate} from "../../middleware/authenticate.js";
import {hasPermission} from "../../middleware/hasPermission.js";
import {loadPermissions} from "../../middleware/loadPermissions.js";


export default async function orgRoutes(fastify: FastifyInstance) {

    fastify.post(
        "/create-organization",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("organization.create"),

            ]
        },
        orgController.create
    )

    fastify.get(
        '/get-all-organizations',
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("organization.read"),
            ]
        },
        orgController.getAll
    )

    fastify.get(
        '/get-one-organization/:organizationCode',
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("organization.read"),
            ]
        },
        orgController.getByOrganizationCode
    )

    fastify.get(
        '/get-organization-by-field',
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("organization.read"),
            ]
        },
        orgController.getByField
    )

    fastify.put(
        "/update-organization/:organizationCode",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("organization.update"),
            ]
        },
        orgController.update
    )

    fastify.patch(
        "/deactivate-organization/:organizationCode",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("organization.update"),
            ]
        },
        orgController.deactivate
    )

    fastify.delete(
        "/delete-organization/:organizationCode",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("organization.delete"),
            ]
        },
        orgController.delete
    )
}