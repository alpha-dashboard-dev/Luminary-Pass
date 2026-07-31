import { FastifyInstance } from "fastify";
import venueController from "../../controllers/venue/venue.controller";

import { authenticate } from "../../middleware/authenticate";
import { hasPermission } from "../../middleware/hasPermission";

export default async function venueRoutes(fastify: FastifyInstance) {

    // CREATE VENUE
    fastify.post(
        "/create-venue",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00017", "PER00018", "PER00019", "PER00020"],
                    true
                )
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
                hasPermission(
                    ["PER00018"], // read permission
                    true
                )
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
                hasPermission(
                    ["PER00017", "PER00018", "PER00019", "PER00020"],
                    false
                )
            ]
        },
        venueController.getByVenueCode
    );

    fastify.get(
        "/get-venue-by-field",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00017", "PER00018", "PER00019", "PER00020"],
                    true
                )
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
                hasPermission(
                    ["PER00017", "PER00018", "PER00019", "PER00020"],
                    false
                )
            ]
        },
        venueController.update
    );

    // update venue profile
    fastify.put(
        "/update-venue-profile",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00065", "PER00069", "PER00070", "PER00071"],
                    false
                )
            ]
        },
        venueController.updateVenueProfile
    );

    // Deactivate Venue

    fastify.patch(
        "/deactivate-venue/:venueCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00017", "PER00018", "PER00019", "PER00020"],
                    true
                )
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
                hasPermission(
                    ["PER00017", "PER00018", "PER00019", "PER00020"],
                    true
                )
            ]
        },
        venueController.delete
    );
}