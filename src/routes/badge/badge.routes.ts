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
                    [],
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
                hasPermission({
                    permissions: ["A93ABD2", "7425701C"],
                    required: "any"
                }),
            ]
        },
        badgeController.getAll
    )

    fastify.get(
        '/get-one-badge/:badgeCode',
        {
            preHandler: [
                authenticate,
                hasPermission({
                    permissions: ["A93ABDD", "7425701C"],
                    required: "any"
                }),
            ]
        },
        badgeController.getByBadgeCode
    )

    fastify.get(
        '/get-badge-by-field',
        {
            preHandler: [
                authenticate,
                hasPermission({
                    permissions: ["A93ABD2D", "7425701C"],
                    required: "any"
                }),
            ]
        },
        badgeController.getByField
    )

    fastify.put(
        "/update-badge/:badgeCode",
        {
            preHandler: [
                authenticate,
                hasPermission({
                    permissions: ["A93ABDD", "0C42B426"],
                    required: "any"
                }),
            ]
        },
        badgeController.update
    )

    fastify.patch(
        "/deactivate-badge/:badgeCode",
        {
            preHandler: [
                authenticate,
                hasPermission({
                    permissions: ["A93ABD2D", "0C42B426"],
                    required: "any"
                }),
            ]
        },
        badgeController.deactivate
    )

    fastify.delete(
        "/delete-badge/:badgeCode",
        {
            preHandler: [
                authenticate,
                hasPermission({
                    permissions: ["A93ABD2", "45191262"],
                    required: "any"
                }),
            ]
        },
        badgeController.delete
    )
}