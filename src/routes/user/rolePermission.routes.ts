import { FastifyInstance } from "fastify";
import rolePermissionController from "../../controllers/user/rolePermission.controller.js";


export default async function rolePermissionRoutes(app: FastifyInstance) {

    app.post(
        "/create-role-permission",
        // {
        //     preHandler: [
        //         app.authenticate,
        //         authorize("admin"),
        //     ],
        // },
        rolePermissionController.create
    );

    // app.get(
    //     "/get-all-permissions",
    //     permissionController.getAll
    // );
    //
    // app.get(
    //     "/get-one-permission/:permissionCode",
    //
    //     permissionController.getByPermissionCode
    // )
    //
    // app.put(
    //     "/update-permission/:permissionCode",
    //     permissionController.update
    // )
    //
    // app.delete(
    //     "/delete-permission/:permissionCode",
    //     permissionController.delete
    // )
}