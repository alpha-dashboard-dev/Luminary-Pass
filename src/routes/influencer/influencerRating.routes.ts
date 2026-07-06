// import { FastifyInstance } from "fastify";
// import ratingController from "../../controllers/influencer/influencerRating.controller";
//
// import { authenticate } from "../../middleware/authenticate";
// import { hasPermission } from "../../middleware/hasPermission";
// import {loadPermissions} from "../../middleware/loadPermissions";
//
// export default async function ratingRoutes(fastify: FastifyInstance) {
//
//     // CREATE rating
//     fastify.post(
//         "/create-rating",
//         {
//             preHandler: [
//                 authenticate,
//                 loadPermissions,
//                 hasPermission("rating.create")
//             ]
//         },
//         ratingController.create
//     );
//
//     // GET ALL rating
//     fastify.get(
//         "/get-all-ratings",
//         {
//             preHandler: [
//                 authenticate,
//                 loadPermissions,
//                 hasPermission("rating.read")
//             ]
//         },
//         ratingController.getAll
//     );
//
//     // GET rating BY CODE
//     fastify.get(
//         "/get-one-rating/:ratingCode",
//         {
//             preHandler: [
//                 authenticate,
//                 loadPermissions,
//                 hasPermission("rating.read")
//             ]
//         },
//         ratingController.getByRatingCode
//     );
//
//     fastify.get(
//         "/get-rating-by-field",
//         {
//             preHandler: [
//                 authenticate,
//                 loadPermissions,
//                 hasPermission("rating.read")
//             ]
//         },
//         ratingController.getByField
//     );
//
//     // UPDATE rating
//     fastify.put(
//         "/update-rating/:ratingCode",
//         {
//             preHandler: [
//                 authenticate,
//                 loadPermissions,
//                 hasPermission("rating.update")
//             ]
//         },
//         ratingController.update
//     );
//
//     // DELETE rating
//     fastify.delete(
//         "/delete-rating/:ratingCode",
//         {
//             preHandler: [
//                 authenticate,
//                 loadPermissions,
//                 hasPermission("rating.delete")
//             ]
//         },
//         ratingController.delete
//     );
// }