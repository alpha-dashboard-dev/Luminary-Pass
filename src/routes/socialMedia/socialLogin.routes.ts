// import { FastifyInstance} from "fastify";
// import socialLoginController from "../../controllers/socialMedia/socialMedia.controller";
// import {authenticate} from "../../middleware/authenticate.js";
// import {hasPermission} from "../../middleware/hasPermission.js";
//
//
// export default async function socialLoginRoutes(fastify: FastifyInstance) {
//
//     fastify.get("/auth/instagram/callback", async (request, reply) => {
//         const { code } = request.query as { code?: string };
//
//         console.log("Instagram authorization code:", code);
//
//         return { success: true, code };
//     });
//
//     fastify.post(
//         "/create-socialMedia",
//         {
//             preHandler: [
//                 authenticate,
//                 hasPermission(
//                     ["PER00085", "PER00086", "PER00087", "PER00088"],
//                     true
//                 )
//             ]
//         },
//         socialLoginController.create
//     )
//
//     fastify.get(
//         '/get-all-socialLogins',
//         {
//             preHandler: [
//                 authenticate,
//                 hasPermission(
//                     ["PER00085", "PER00086", "PER00087", "PER00088"],
//                     true
//                 )
//             ]
//         },
//         socialLoginController.getAll
//     )
//
//     fastify.get(
//         '/get-one-socialMedia/:socialLoginCode',
//         {
//             preHandler: [
//                 authenticate,
//                 hasPermission(
//                     ["PER00085", "PER00086", "PER00087", "PER00088"],
//                     true
//                 )
//             ]
//         },
//         socialLoginController.getBySocialLoginCode
//     )
//
//     fastify.get(
//         '/get-socialMedia-by-field',
//         {
//             preHandler: [
//                 authenticate,
//                 hasPermission(
//                     ["PER00085", "PER00086", "PER00087", "PER00088"],
//                     true
//                 )
//             ]
//         },
//         socialLoginController.getByField
//     )
//
//     fastify.put(
//         "/update-socialMedia/:socialLoginCode",
//         {
//             preHandler: [
//                 authenticate,
//                 hasPermission(
//                     ["PER00085", "PER00086", "PER00087", "PER00088"],
//                     true
//                 )
//             ]
//         },
//         socialLoginController.update
//     )
//
//     fastify.delete(
//         "/delete-socialMedia/:socialLoginCode",
//         {
//             preHandler: [
//                 authenticate,
//                 hasPermission(
//                     ["PER00085", "PER00086", "PER00087", "PER00088"],
//                     true
//                 )
//             ]
//         },
//         socialLoginController.delete
//     )
// }