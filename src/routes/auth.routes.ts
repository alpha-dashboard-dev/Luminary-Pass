// import { FastifyInstance } from "fastify";
// import authController from "../controllers/auth.controller";
// import { authenticate } from "../middlewares/auth.middleware";
// // import { authorizeRoles } from "../middlewares/role.middleware";
// // import { ROLES } from "../utils/roles";
//
// export default async function authRoutes(fastify: FastifyInstance) {
//     fastify.post(
//         "/register",
//         {
//             preHandler: [authenticate],
//         },
//         authController.register
//     );
//
//     fastify.post("/login", authController.login);
//
//     fastify.post("/refresh", authController.refresh);
//
//     fastify.post(
//         "/logout",
//         {
//             preHandler: authenticate,
//         },
//         authController.logout
//     );
// }