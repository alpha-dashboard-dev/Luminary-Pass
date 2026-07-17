import { FastifyInstance} from "fastify";
import categoryController from "../../controllers/category/category.controller";
import {authenticate} from "../../middleware/authenticate.js";
import {hasPermission} from "../../middleware/hasPermission.js";


export default async function categoryRoutes(fastify: FastifyInstance) {

    fastify.post(
        "/create-category",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00025", "PER00026", "PER00027", "PER00028"],
                    false
                )

            ]
        },
        categoryController.create
    )

    fastify.get(
        '/get-all-categories',
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00025", "PER00026", "PER00027", "PER00028"],
                    true
                )
            ]
        },
        categoryController.getAll
    )

    fastify.get(
        '/get-one-category/:categoryCode',
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00025", "PER00026", "PER00027", "PER00028"],
                    true
                )
            ]
        },
        categoryController.getByCategoryCode
    )

    fastify.get(
        '/get-category-by-field',
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00025", "PER00026", "PER00027", "PER00028"],
                    true
                )
            ]
        },
        categoryController.getByField
    )

    fastify.put(
        "/update-category/:categoryCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00025", "PER00026", "PER00027", "PER00028"],
                    true
                )
            ]
        },
        categoryController.update
    )

    fastify.patch(
        "/deactivate-category/:categoryCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00025", "PER00026", "PER00027", "PER00028"],
                    true
                )
            ]
        },
        categoryController.deactivate
    )

    fastify.delete(
        "/delete-category/:categoryCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00025", "PER00026", "PER00027", "PER00028"],
                    true
                )
            ]
        },
        categoryController.delete
    )
}