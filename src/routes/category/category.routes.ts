import { FastifyInstance} from "fastify";
import categoryController from "../../controllers/category/category.controller";
import {authenticate} from "../../middleware/authenticate.js";
import {hasPermission} from "../../middleware/hasPermission.js";
import {loadPermissions} from "../../middleware/loadPermissions.js";


export default async function categoryRoutes(fastify: FastifyInstance) {

    fastify.post(
        "/create-category",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("category.create"),

            ]
        },
        categoryController.create
    )

    fastify.get(
        '/get-all-categories',
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("category.read"),
            ]
        },
        categoryController.getAll
    )

    fastify.get(
        '/get-one-category/:categoryCode',
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("category.read"),
            ]
        },
        categoryController.getByCategoryCode
    )

    fastify.get(
        '/get-category-by-field',
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("category.read"),
            ]
        },
        categoryController.getByField
    )

    fastify.put(
        "/update-category/:categoryCode",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("category.update"),
            ]
        },
        categoryController.update
    )

    fastify.patch(
        "/deactivate-category/:categoryCode",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("category.update"),
            ]
        },
        categoryController.deactivate
    )

    fastify.delete(
        "/delete-category/:categoryCode",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("category.delete"),
            ]
        },
        categoryController.delete
    )
}