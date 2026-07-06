import { FastifyInstance } from "fastify";
import venueLocationController from "../../controllers/venue/venueLocation.controller.js";

import { authenticate } from "../../middleware/authenticate";
import { hasPermission } from "../../middleware/hasPermission";
import {loadPermissions} from "../../middleware/loadPermissions";

export default async function venueLocationRoutes(fastify: FastifyInstance) {

    // CREATE VENUE
    fastify.post(
        "/create-venue-location",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("location.create")
            ]
        },
        venueLocationController.create
    );

    // GET ALL VENUES
    fastify.get(
        "/get-all-venue-locations",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("location.read")
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
                loadPermissions,
                hasPermission("location.read")
            ]
        },
        venueLocationController.getByVenueLocationCode
    );

    fastify.get(
        "/get-venue-location-by-field",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("location.read")
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
                loadPermissions,
                hasPermission("location.update")
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
                loadPermissions,
                hasPermission("location.update")
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
                loadPermissions,
                hasPermission("location.delete")
            ]
        },
        venueLocationController.delete
    );
}