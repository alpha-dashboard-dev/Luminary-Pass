// import { FastifyInstance } from "fastify";
// import attachmentController from "../../controllers/venue/venueAttachment.controller";
//
// import { authenticate } from "../../middleware/authenticate";
// import { hasPermission } from "../../middleware/hasPermission";
// import {loadPermissions} from "../../middleware/loadPermissions";
//
// export default async function venueAttachmentRoutes(fastify: FastifyInstance) {
//
//     // CREATE attachment
//     fastify.post(
//         "/create-venue-attachment",
//         {
//             preHandler: [
//                 authenticate,
//                 loadPermissions,
//                 hasPermission("venueAttachment.create")
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
//                 loadPermissions,
//                 hasPermission("venueAttachment.read")
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
//                 loadPermissions,
//                 hasPermission("venueAttachment.read")
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
//                 loadPermissions,
//                 hasPermission("venueAttachment.read")
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
//                 loadPermissions,
//                 hasPermission("venueAttachment.update")
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
//                 loadPermissions,
//                 hasPermission("venueAttachment.delete")
//             ]
//         },
//         attachmentController.delete
//     );
// }