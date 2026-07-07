// import { FastifyInstance } from "fastify";
// import influencerController from "../../controllers/influencer/influencer.controller";
//
// import { authenticate } from "../../middleware/authenticate";
// import { hasPermission } from "../../middleware/hasPermission";
//
// export default async function influencerRoutes(fastify: FastifyInstance) {
//
//     // CREATE influencer
//     // fastify.post(
//     //     "/create-influencer",
//     //     {
//     //         preHandler: [
//     //             authenticate,
//     //             loadPermissions,
//     //             hasPermission("can-create-influencer",code)
//     //         ]
//     //     },
//     //     influencerController.create
//     // );
//
//     // GET ALL influencer
//     fastify.get(
//         "/get-all-influencers",
//         {
//             preHandler: [
//                 authenticate,
//                 hasPermission("influencer.read")
//             ]
//         },
//         influencerController.getAll
//     );
//
//     // GET influencer BY CODE
//     fastify.get(
//         "/get-one-influencer/:influencerCode",
//         {
//             preHandler: [
//                 authenticate,
//
//                 hasPermission("influencer.read")
//             ]
//         },
//         influencerController.getByInfluencerCode
//     );
//
//     fastify.get(
//         "/get-by-any-field",
//         {
//             preHandler: [
//                 authenticate,
//                 hasPermission("influencer.read")
//             ]
//         },
//         influencerController.getByField
//     );
//
//     // UPDATE influencer
//     fastify.put(
//         "/update-influencer/:influencerCode",
//         {
//             preHandler: [
//                 authenticate,
//                 hasPermission("influencer.update")
//             ]
//         },
//         influencerController.update
//     );
//
//     // Deactivate influencer
//
//     fastify.patch(
//         "/deactivate-influencer/:influencerCode",
//         {
//             preHandler: [
//                 authenticate,
//                 hasPermission("influencer.update")
//             ]
//         },
//         influencerController.deactivate
//     )
//
//     // DELETE influencer
//     fastify.delete(
//         "/delete-influencer/:influencerCode",
//         {
//             preHandler: [
//                 authenticate,
//                 hasPermission("influencer.delete")
//             ]
//         },
//         influencerController.delete
//     );
// }