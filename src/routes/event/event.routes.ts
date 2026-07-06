// import { FastifyInstance} from "fastify";
// import eventController from "../../controllers/event/event.controller";
// import {authenticate} from "../../middleware/authenticate.js";
// import {hasPermission} from "../../middleware/hasPermission.js";
// import {loadPermissions} from "../../middleware/loadPermissions.js";
//
//
// export default async function eventRoutes(fastify: FastifyInstance) {
//
//     fastify.post(
//         "/create-event",
//         {
//             preHandler: [
//                 authenticate,
//                 loadPermissions,
//                 hasPermission("event.create"),
//
//             ]
//         },
//         eventController.create
//     )
//
//     fastify.get(
//         '/get-all-events',
//         {
//             preHandler: [
//                 authenticate,
//                 loadPermissions,
//                 hasPermission("event.read"),
//             ]
//         },
//         eventController.getAll
//     )
//
//     fastify.get(
//         '/get-one-event/:eventCode',
//         {
//             preHandler: [
//                 authenticate,
//                 loadPermissions,
//                 hasPermission("event.read"),
//             ]
//         },
//         eventController.getByEventCode
//     )
//
//     fastify.get(
//         '/get-event-by-field',
//         {
//             preHandler: [
//                 authenticate,
//                 loadPermissions,
//                 hasPermission("event.read"),
//             ]
//         },
//         eventController.getByField
//     )
//
//     fastify.put(
//         "/update-event/:eventCode",
//         {
//             preHandler: [
//                 authenticate,
//                 loadPermissions,
//                 hasPermission("event.update"),
//             ]
//         },
//         eventController.update
//     )
//
//     fastify.delete(
//         "/delete-event/:eventCode",
//         {
//             preHandler: [
//                 authenticate,
//                 loadPermissions,
//                 hasPermission("event.delete"),
//             ]
//         },
//         eventController.delete
//     )
// }