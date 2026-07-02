import { FastifyInstance} from "fastify";
import businessController from "../../controllers/business/business.controller";
import {authenticate} from "../../middleware/authenticate.js";
import {hasPermission} from "../../middleware/hasPermission.js";
import {loadPermissions} from "../../middleware/loadPermissions.js";


export default async function businessRoutes(fastify: FastifyInstance) {

    fastify.post(
        "/create-business",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("business.create"),

            ]
        },
        businessController.create
    )

    fastify.get(
        '/get-all-businesses',
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("business.read"),
            ]
        },
        businessController.getAll
    )

    fastify.get(
        '/get-one-business/:businessCode',
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("business.read"),
            ]
        },
        businessController.getByBusinessCode
    )

    fastify.get(
        '/get-buisness-by-field',
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("business.read"),
            ]
        },
        businessController.getByField
    )

    fastify.put(
        "/update-business/:businessCode",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("business.update"),
            ]
        },
        businessController.update
    )

    fastify.patch(
        "/deactivate-business/:businessCode",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("business.update"),
            ]
        },
        businessController.deactivate
    )

    fastify.delete(
        "/delete-business/:businessCode",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("businesss.delete"),
            ]
        },
        businessController.delete
    )
}