import { FastifyInstance} from "fastify";
import eventController from "../../controllers/event/event.controller";
import {authenticate} from "../../middleware/authenticate.js";
import {hasPermission} from "../../middleware/hasPermission.js";


export default async function eventRoutes(fastify: FastifyInstance) {

    fastify.post(
        "/create-event",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00037", "PER00038", "PER00039", "PER00040"],
                    false
                )
            ]
        },
        eventController.create
    )

    fastify.get(
        '/get-all-events',
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00037", "PER00038", "PER00039", "PER00040"],
                    true
                )
            ]
        },
        eventController.getAll
    )

    fastify.get(
        '/get-one-event/:eventCode',
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00037", "PER00038", "PER00039", "PER00040"],
                    true
                )
            ]
        },
        eventController.getByEventCode
    )

    fastify.get(
        '/get-event-by-field',
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00037", "PER00038", "PER00039", "PER00040"],
                    true
                )
            ]
        },
        eventController.getByField
    )

    fastify.put(
        "/update-event/:eventCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00037", "PER00038", "PER00039", "PER00040"],
                    true
                )
            ]
        },
        eventController.update
    )

    fastify.delete(
        "/delete-event/:eventCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00037", "PER00038", "PER00039", "PER00040"],
                    true
                )
            ]
        },
        eventController.delete
    )


    fastify.get(
        "/get-total-events-by-business/:businessCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00037", "PER00038", "PER00039", "PER00040"],
                    false
                )
            ]
        },

        eventController.findTotalEvents

    )
}