// import { FastifyInstance } from "fastify";
// import attachmentController from "../../controllers/venue/venueAttachment.controller";
//
// import { authenticate } from "../../middleware/authenticate";
// import { hasPermission } from "../../middleware/hasPermission";
//
// export default async function venueAttachmentRoutes(fastify: FastifyInstance) {
//
//     // CREATE attachment
//     fastify.post(
//         "/create-venue-attachment",
//         {
//             preHandler: [
//                 authenticate,
//                 hasPermission(
//                     ["PER00049", "PER00050", "PER00051", "PER00052"],
//                     true
//                 )
//             ]
//         },
//         attachmentController.create
//     );
//
//     // GET ALL attachment
//     fastify.get(
//         "/get-all-venue-attachments",
//         {
//             preHandler: [
//                 authenticate,
//                 hasPermission(
//                     ["PER00049", "PER00050", "PER00051", "PER00052"],
//                     true
//                 )
//             ]
//         },
//         attachmentController.getAll
//     );
//
//     // GET attachment BY CODE
//     fastify.get(
//         "/get-one-venue-attachment/:attachmentCode",
//         {
//             preHandler: [
//                 authenticate,
//                 hasPermission(
//                     ["PER00049", "PER00050", "PER00051", "PER00052"],
//                     true
//                 )
//             ]
//         },
//         attachmentController.getByAttachmentCode
//     );
//
//     fastify.get(
//         "/get-venue-attachment-by-field",
//         {
//             preHandler: [
//                 authenticate,
//                 hasPermission(
//                     ["PER00049", "PER00050", "PER00051", "PER00052"],
//                     true
//                 )
//             ]
//         },
//         attachmentController.getByField
//     );
//
//     // UPDATE attachment
//     fastify.put(
//         "/update-venue-attachment/:attachmentCode",
//         {
//             preHandler: [
//                 authenticate,
//                 hasPermission(
//                     ["PER00049", "PER00050", "PER00051", "PER00052"],
//                     true
//                 )
//             ]
//         },
//         attachmentController.update
//     );
//
//     // DELETE USER
//     fastify.delete(
//         "/delete-venue-attachment/:attachmentCode",
//         {
//             preHandler: [
//                 authenticate,
//                 hasPermission(
//                     ["PER00049", "PER00050", "PER00051", "PER00052"],
//                     true
//                 )
//             ]
//         },
//         attachmentController.delete
//     );
// }