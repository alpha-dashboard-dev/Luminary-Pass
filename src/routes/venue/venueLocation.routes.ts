import { FastifyInstance } from "fastify";
import venueLocationController from "../../controllers/venue/venueLocation.controller.js";

import { authenticate } from "../../middleware/authenticate";
import { hasPermission } from "../../middleware/hasPermission";

export default async function venueLocationRoutes(fastify: FastifyInstance) {

    // CREATE VENUE
    fastify.post(
        "/create-venue-location",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00065", "PER00069", "PER00070", "PER00071"],
                    false
                )
            ]
        },
        venueLocationController.create
    );

    // venue location + contact
    fastify.post(
        "/create-venue-location-contact",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00065", "PER00069", "PER00070", "PER00071"],
                    false
                )
            ]
        },
        venueLocationController.createLocationAndContact
    );

    // GET ALL VENUES
    fastify.get(
        "/get-all-venue-locations",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00065", "PER00066", "PER00067", "PER00068"],
                    true
                )
            ]
        },
        venueLocationController.getAll
    );

    // GET VENUE BY CODE
    fastify.get(
        "/get-one-venue-location/:locationCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00065", "PER00066", "PER00067", "PER00068"],
                    true
                )
            ]
        },
        venueLocationController.getByVenueLocationCode
    );

    fastify.get(
        "/get-venue-location-by-field",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00065", "PER00066", "PER00067", "PER00068"],
                    true
                )
            ]
        },
        venueLocationController.getByField
    );

    // UPDATE VENUE
    fastify.put(
        "/update-venue-location/:locationCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00065", "PER00066", "PER00067", "PER00068"],
                    true
                )
            ]
        },
        venueLocationController.update
    );

    // Deactivate Venue

    fastify.patch(
        "/deactivate-venue-location/:locationCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00065", "PER00066", "PER00067", "PER00068"],
                    true
                )
            ]
        },
        venueLocationController.deactivate
    )

    // Delete Venue Location
    fastify.delete(
        "/delete-venue-location/:locationCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00065", "PER00066", "PER00067", "PER00068"],
                    true
                )
            ]
        },
        venueLocationController.delete
    );
}