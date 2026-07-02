import { FastifyInstance } from "fastify";
import venueController from "../../controllers/venue/venue.controller";

import { authenticate } from "../../middleware/authenticate";
import { hasPermission } from "../../middleware/hasPermission";
import {loadPermissions} from "../../middleware/loadPermissions";

export default async function venueRoutes(fastify: FastifyInstance) {

    // CREATE VENUE
    fastify.post(
        "/create-venue",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("venue.create")
            ]
        },
        venueController.create
    );

    // GET ALL VENUES
    fastify.get(
        "/get-all-venues",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("venue.read")
            ]
        },
        venueController.getAll
    );

    // GET VENUE BY CODE
    fastify.get(
        "/get-one-venue/:venueCode",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("venue.read")
            ]
        },
        venueController.getByVenueCode
    );

    fastify.get(
        "/get-venue-by-field",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("venue.read")
            ]
        },
        venueController.getByField
    );

    // UPDATE VENUE
    fastify.put(
        "/update-venue/:venueCode",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("venue.update")
            ]
        },
        venueController.update
    );

    // Deactivate Venue

    fastify.patch(
        "/deactivate-venue/:venueCode",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("venue.update")
            ]
        },
        venueController.deactivate
    )

    // DELETE USER
    fastify.delete(
        "/delete-venue/:venueCode",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("venue.delete")
            ]
        },
        venueController.delete
    );
}