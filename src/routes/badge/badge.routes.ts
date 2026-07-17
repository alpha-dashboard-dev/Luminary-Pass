import { FastifyInstance} from "fastify";
import badgeController from "../../controllers/badge/badge.controller";
import {authenticate} from "../../middleware/authenticate.js";
import {hasPermission} from "../../middleware/hasPermission.js";


export default async function badgeRoutes(fastify: FastifyInstance) {

    fastify.post(
        "/create-badge",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00077", "PER00078", "PER00079", "PER00080"],
                    true
                )
            ]
        },
        badgeController.create
    )

    fastify.get(
        '/get-all-badges',
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00077", "PER00078", "PER00079", "PER00080"],
                    true
                )
            ]
        },
        badgeController.getAll
    )

    fastify.get(
        '/get-one-badge/:badgeCode',
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00077", "PER00078", "PER00079", "PER00080"],
                    true
                )
            ]
        },
        badgeController.getByBadgeCode
    )

    fastify.get(
        '/get-badge-by-field',
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00077", "PER00078", "PER00079", "PER00080"],
                    true
                )
            ]
        },
        badgeController.getByField
    )

    fastify.put(
        "/update-badge/:badgeCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00077", "PER00078", "PER00079", "PER00080"],
                    true
                )
            ]
        },
        badgeController.update
    )

    fastify.patch(
        "/deactivate-badge/:badgeCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00077", "PER00078", "PER00079", "PER00080"],
                    true
                )
            ]
        },
        badgeController.deactivate
    )

    fastify.delete(
        "/delete-badge/:badgeCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00077", "PER00078", "PER00079", "PER00080"],
                    true
                )
            ]
        },
        badgeController.delete
    )
}