import { FastifyInstance} from "fastify";
import locationController from "../../controllers/location/location.controller";
import {authenticate} from "../../middleware/authenticate.js";
import {hasPermission} from "../../middleware/hasPermission.js";


export default async function locationRoutes(fastify: FastifyInstance) {

    fastify.post(
        "/create-location",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00029", "PER00030", "PER00031", "PER00032"],
                    true
                )
            ]
        },
        locationController.create
    )

    fastify.get(
        '/get-all-locations',
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["ER00029", "PER00030", "ER00031", "ER00032"],
                    false
                )
            ]
        },
        locationController.getAll
    )

    fastify.get(
        '/get-one-location/:locationCode',
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00029", "PER00030", "PER00031", "PER00032"],
                    true
                )
            ]
        },
        locationController.getByLocationCode
    )

    fastify.get(
        '/get-location-by-field',
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00029", "PER00030", "PER00031", "PER00032"],
                    true
                )
            ]
        },
        locationController.getByField
    )

    fastify.put(
        "/update-location/:locationCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00029", "PER00030", "PER00031", "PER00032"],
                    true
                )
            ]
        },
        locationController.update
    )

    fastify.patch(
        "/deactivate-location/:locationCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00029", "PER00030", "PER00031", "PER00032"],
                    true
                )
            ]
        },
        locationController.deactivate
    )

    fastify.delete(
        "/delete-location/:locationCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00029", "PER00030", "PER00031", "PER00032"],
                    true
                )
            ]
        },
        locationController.delete
    )
}