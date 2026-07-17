import { FastifyInstance} from "fastify";
import settingController from "../../controllers/setting/setting.controller";
import {authenticate} from "../../middleware/authenticate.js";
import {hasPermission} from "../../middleware/hasPermission.js";


export default async function settingRoutes(fastify: FastifyInstance) {

    fastify.post(
        "/create-setting",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00081", "PER00082", "PER00083", "PER00084"],
                    true
                )
            ]
        },
        settingController.create
    )

    fastify.get(
        '/get-all-settings',
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00081", "PER00082", "PER00083", "PER00084"],
                    true
                )
            ]
        },
        settingController.getAll
    )

    fastify.get(
        '/get-one-setting/:settingCode',
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00081", "PER00082", "PER00083", "PER00084"],
                    true
                )
            ]
        },
        settingController.getBySettingCode
    )

    fastify.get(
        '/get-setting-by-field',
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00081", "PER00082", "PER00083", "PER00084"],
                    true
                )
            ]
        },
        settingController.getByField
    )

    fastify.put(
        "/update-setting/:settingCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00081", "PER00082", "PER00083", "PER00084"],
                    true
                )
            ]
        },
        settingController.update
    )

    fastify.patch(
        "/deactivate-setting/:settingCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00081", "PER00082", "PER00083", "PER00084"],
                    true
                )
            ]
        },
        settingController.deactivate
    )

    fastify.delete(
        "/delete-setting/:settingCode",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00081", "PER00082", "PER00083", "PER00084"],
                    true
                )
            ]
        },
        settingController.delete
    )
}