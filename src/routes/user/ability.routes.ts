import { FastifyInstance } from "fastify";
import abilityController from "../../controllers/user/ability.controller";
import { authenticate } from "../../middleware/authenticate";
import { hasPermission } from "../../middleware/hasPermission";

export default async function abilityRoutes(fastify: FastifyInstance) {

    // CREATE ability
    fastify.post(
        "/create-ability",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00053", "PER00054", "PER00055", "PER00056"],
                    false
                )
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
                hasPermission(
                    ["PER00053", "PER00054", "PER00055", "PER00056"],
                    false
                )
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
                hasPermission(
                    ["PER00053", "PER00054", "PER00055", "PER00056"],
                    false
                )
            ]
        },
        abilityController.getByAbilityCode
    );

    fastify.get(
        "/get-by-any-field",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00053", "PER00054", "PER00055", "PER00056"],
                    false
                )
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
                hasPermission(
                    ["PER00053", "PER00054", "PER00055", "PER00056"],
                    false
                )
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
                hasPermission(
                    ["PER00053", "PER00054", "PER00055", "PER00056"],
                    false
                )
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
                hasPermission(
                    ["PER00053", "PER00054", "PER00055", "PER00056"],
                    false
                )
            ]
        },
        abilityController.delete
    );
}