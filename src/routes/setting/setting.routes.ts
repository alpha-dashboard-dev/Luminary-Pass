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
                hasPermission({
                    permissions: ["A93ABD2D"],
                    required: "any"
                })
            ]
        },
        settingController.create
    )

    fastify.get(
        '/get-all-settings',
        {
            preHandler: [
                authenticate,
                hasPermission({
                    permissions: ["A93ABD2", "7425701C"],
                    required: "any"
                }),
            ]
        },
        settingController.getAll
    )

    fastify.get(
        '/get-one-setting/:settingCode',
        {
            preHandler: [
                authenticate,
                hasPermission({
                    permissions: ["A93ABDD", "7425701C"],
                    required: "any"
                }),
            ]
        },
        settingController.getBySettingCode
    )

    fastify.get(
        '/get-setting-by-field',
        {
            preHandler: [
                authenticate,
                hasPermission({
                    permissions: ["A93ABD2D", "7425701C"],
                    required: "any"
                }),
            ]
        },
        settingController.getByField
    )

    fastify.put(
        "/update-setting/:settingCode",
        {
            preHandler: [
                authenticate,
                hasPermission({
                    permissions: ["A93ABDD", "0C42B426"],
                    required: "any"
                }),
            ]
        },
        settingController.update
    )

    fastify.patch(
        "/deactivate-setting/:settingCode",
        {
            preHandler: [
                authenticate,
                hasPermission({
                    permissions: ["A93ABD2D", "0C42B426"],
                    required: "any"
                }),
            ]
        },
        settingController.deactivate
    )

    fastify.delete(
        "/delete-setting/:settingCode",
        {
            preHandler: [
                authenticate,
                hasPermission({
                    permissions: ["A93ABD2", "45191262"],
                    required: "any"
                }),
            ]
        },
        settingController.delete
    )
}