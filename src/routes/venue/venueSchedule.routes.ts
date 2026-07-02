import { FastifyInstance } from "fastify";
import venueScheduleController from "../../controllers/venue/venueSchedule.controller";

import { authenticate } from "../../middleware/authenticate";
import { hasPermission } from "../../middleware/hasPermission";
import {loadPermissions} from "../../middleware/loadPermissions";

export default async function venueScheduleRoutes(fastify: FastifyInstance) {

    // Create Venue Schedule
    fastify.post(
        "/create-schedule",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("schedule.create")
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
                loadPermissions,
                hasPermission("schedule.read")
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
                loadPermissions,
                hasPermission("schedule.read")
            ]
        },
        venueScheduleController.getByScheduleCode
    );

    fastify.get(
        "/get-schedule-by-field",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("schedule.read")
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
                loadPermissions,
                hasPermission("schedule.update")
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
                loadPermissions,
                hasPermission("schedule.update")
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
                loadPermissions,
                hasPermission("schedule.delete")
            ]
        },
        venueScheduleController.delete
    );
}