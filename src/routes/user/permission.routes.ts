import { FastifyInstance } from "fastify";
import permissionController from "../../controllers/user/permission.controller.js";
import {authorize} from "../../middleware/authorize.js";

export default async function permissionRoutes(app: FastifyInstance) {

    app.post(
        "/create-permission",
        // {
        //     preHandler: [
        //         app.authenticate,
        //         authorize("admin"),
        //     ],
        // },
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