import { FastifyInstance } from "fastify";
import abilityController from "../../controllers/user/ability.controller";

import { authenticate } from "../../middleware/authenticate";
import { hasPermission } from "../../middleware/hasPermission";
import {loadPermissions} from "../../middleware/loadPermissions";

export default async function abilityRoutes(fastify: FastifyInstance) {

    // CREATE ability
    fastify.post(
        "/create-ability",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("ability.create")
            ]
        },
        abilityController.create
    );

    // GET ALL abilityS
    fastify.get(
        "/get-all-abilities",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("ability.read")
            ]
        },
        abilityController.getAll
    );

    // GET ability BY CODE
    fastify.get(
        "/get-one-ability/:abilityCode",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("ability.read")
            ]
        },
        abilityController.getByAbilityCode
    );

    fastify.get(
        "/get-by-any-field",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("ability.read")
            ]
        },
        abilityController.getByField
    );

    // UPDATE ability
    fastify.put(
        "/update-ability/:abilityCode",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("ability.update")
            ]
        },
        abilityController.update
    );

    // Deactivate ability

    fastify.patch(
        "/deactivate-ability/:abilityCode",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("ability.update")
            ]
        },
        abilityController.deactivate
    )

    // DELETE ability
    fastify.delete(
        "/delete-ability/:abilityCode",
        {
            preHandler: [
                authenticate,
                loadPermissions,
                hasPermission("ability.delete")
            ]
        },
        abilityController.delete
    );
}