// import { FastifyInstance } from "fastify";
// import UserRoleController from "../../controllers/user/userRole.controller";
//
// export default async function userRoleRoutes(app: FastifyInstance) {
//
//     app.post(
//         "/create-role",
//         // {
//         //     preHandler: [
//         //         app.authenticate,
//         //         authorize("admin"),
//         //     ],
//         // },
//         UserRoleController.create
//     );
//
//     app.get(
//         "/get-all-roles",
//         UserRoleController.getAll
//     );
//
//     app.get(
//         "/get-one-role/:roleCode",
//
//         UserRoleController.getByRoleCode
//     )
//
//     app.get(
//         "/get-one-role",
//         UserRoleController.getByAnyField
//     )
//
//     app.put(
//         "/update-role/:roleCode",
//         UserRoleController.update
//     )
//
//     app.delete(
//         "/delete-role/:roleCode",
//         UserRoleController.delete
//     )
// }