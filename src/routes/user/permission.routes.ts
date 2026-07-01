import { FastifyInstance } from "fastify";
import permissionController from "../../controllers/user/permission.controller.js";
import {authenticate} from "../../middleware/authenticate.js";
import {hasPermission} from "../../middleware/hasPermission.js";
import {loadPermissions} from "../../middleware/loadPermissions.js";

export default async function permissionRoutes(app: FastifyInstance) {

    app.post(
        "/create-permission",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("permission.assign")
            ],
        },
        permissionController.create
    );

    app.get(
        "/get-all-permissions",
        permissionController.getAll
    );

    app.get(
        "/get-one-permission/:permissionCode",

        permissionController.getByPermissionCode
    )

    app.put(
        "/update-permission/:permissionCode",
        permissionController.update
    )

    app.delete(
        "/delete-permission/:permissionCode",
        permissionController.delete
    )
}