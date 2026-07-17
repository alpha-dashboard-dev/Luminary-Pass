import { FastifyInstance } from "fastify";
import venueScheduleController from "../../controllers/venue/venueSchedule.controller";
import { authenticate } from "../../middleware/authenticate";
import { hasPermission } from "../../middleware/hasPermission";

export default async function venueScheduleRoutes(fastify: FastifyInstance) {

    // Create Venue Schedule
    fastify.post(
        "/create-schedule",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00021", "PER00022", "PER00023", "PER00024"],
                    true
                )
            ]
        },
        venueScheduleController.create
    );

    // Get All Venue's Schedules
    fastify.get(
        "/get-all-schedules",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00021", "PER00022", "PER00023", "PER00024"],
                    true
                )
            ]
        },
        venueScheduleController.getAll
    );

    // Get Schedule By Code
    fastify.get(
        "/get-one-schedule/:scheduleCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00021", "PER00022", "PER00023", "PER00024"],
                    true
                )
            ]
        },
        venueScheduleController.getByScheduleCode
    );

    fastify.get(
        "/get-schedule-by-field",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00021", "PER00022", "PER00023", "PER00024"],
                    true
                )
            ]
        },
        venueScheduleController.getByField
    );

    // UPDATE VENUE
    fastify.put(
        "/update-schedule/:scheduleCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00021", "PER00022", "PER00023", "PER00024"],
                    true
                )
            ]
        },
        venueScheduleController.update
    );

    // Deactivate Schedule

    fastify.patch(
        "/deactivate-schedule/:scheduleCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00021", "PER00022", "PER00023", "PER00024"],
                    true
                )
            ]
        },
        venueScheduleController.deactivate
    )

    // Delete Schedule
    fastify.delete(
        "/delete-schedule/:scheduleCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00021", "PER00022", "PER00023", "PER00024"],
                    true
                )
            ]
        },
        venueScheduleController.delete
    );
}