// import { FastifyInstance} from "fastify";
// import locationController from "../../controllers/location/location.controller";
// import {authenticate} from "../../middleware/authenticate.js";
// import {hasPermission} from "../../middleware/hasPermission.js";
// import {loadPermissions} from "../../middleware/loadPermissions.js";
//
//
// export default async function locationRoutes(fastify: FastifyInstance) {
//
//     fastify.post(
//         "/create-location",
//         {
//             preHandler: [
//                 authenticate,
//                 loadPermissions,
//                 hasPermission("location.create"),
//
//             ]
//         },
//         locationController.create
//     )
//
//     fastify.get(
//         '/get-all-locations',
//         {
//             preHandler: [
//                 authenticate,
//                 loadPermissions,
//                 hasPermission("location.read"),
//             ]
//         },
//         locationController.getAll
//     )
//
//     fastify.get(
//         '/get-one-location/:locationCode',
//         {
//             preHandler: [
//                 authenticate,
//                 loadPermissions,
//                 hasPermission("location.read"),
//             ]
//         },
//         locationController.getByLocationCode
//     )
//
//     fastify.get(
//         '/get-location-by-field',
//         {
//             preHandler: [
//                 authenticate,
//                 loadPermissions,
//                 hasPermission("location.read"),
//             ]
//         },
//         locationController.getByField
//     )
//
//     fastify.put(
//         "/update-location/:locationCode",
//         {
//             preHandler: [
//                 authenticate,
//                 loadPermissions,
//                 hasPermission("location.update"),
//             ]
//         },
//         locationController.update
//     )
//
//     fastify.patch(
//         "/deactivate-location/:locationCode",
//         {
//             preHandler: [
//                 authenticate,
//                 loadPermissions,
//                 hasPermission("location.update"),
//             ]
//         },
//         locationController.deactivate
//     )
//
//     fastify.delete(
//         "/delete-location/:locationCode",
//         {
//             preHandler: [
//                 authenticate,
//                 loadPermissions,
//                 hasPermission("location.delete"),
//             ]
//         },
//         locationController.delete
//     )
// }