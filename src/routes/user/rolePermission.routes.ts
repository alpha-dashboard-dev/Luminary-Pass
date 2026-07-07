import { FastifyInstance } from "fastify";
import rolePermissionController from "../../controllers/user/rolePermission.controller.js";


export default async function rolePermissionRoutes(app: FastifyInstance) {

    app.post(
        "/assign-permission",
        // {
        //     preHandler: [
        //         app.authenticate,
        //         authorize("admin"),
        //     ],
        // },
        rolePermissionController.assignPermissions,
    );

    app.post(
        "/replace-permissions",
        rolePermissionController.replacePermissions,
    )

    app.get(
        "/get-all-permissions/:roleCode",
        rolePermissionController.getPermissions,

    )

    app.delete(
        "/delete-one-permission",
        rolePermissionController.removeOnePermission,
    )

    app.delete(
        "/delete-all-permissions/:roleCode",
        rolePermissionController.removeAllPermissions,
    )

}