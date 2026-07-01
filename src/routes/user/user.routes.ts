// import { FastifyInstance } from "fastify";
// import userController from "../../controllers/user/user.controller.js";
//
// import { authenticate } from "../../middleware/authenticate.js";
// import { hasPermission } from "../../middleware/hasPermission.js";
//
// export default async function userRoutes(fastify: FastifyInstance) {
//
//     // ---------------------------
//     // CREATE USER
//     // ---------------------------
//     fastify.post(
//         "/create-user",
//         {
//             preHandler: [
//                 authenticate,
//                 hasPermission("user.create")
//             ]
//         },
//         userController.create
//     );
//
//     // ---------------------------
//     // GET ALL USERS
//     // ---------------------------
//     fastify.get(
//         "/get-all-users",
//         {
//             preHandler: [
//                 authenticate,
//                 hasPermission("user.read")
//             ]
//         },
//         userController.getAll
//     );
//
//     // ---------------------------
//     // GET USER BY CODE
//     // ---------------------------
//     fastify.get(
//         "/get-one-user/:userCode",
//         {
//             preHandler: [
//                 authenticate,
//                 hasPermission("user.read")
//             ]
//         },
//         userController.getByCode
//     );
//
//     // ---------------------------
//     // UPDATE USER
//     // ---------------------------
//     fastify.put(
//         "/update-user/:userCode",
//         {
//             preHandler: [
//                 authenticate,
//                 hasPermission("user.update")
//             ]
//         },
//         userController.update
//     );
//
//     // ---------------------------
//     // DELETE USER
//     // ---------------------------
//     fastify.delete(
//         "/delete-use/:userCode",
//         {
//             preHandler: [
//                 authenticate,
//                 hasPermission("user.delete")
//             ]
//         },
//         userController.delete
//     );
// }