import { FastifyInstance } from "fastify";
import authController from "../../controllers/authentication/auth.controller.js";
import { authenticate } from "../../middleware/authenticate.js";

export default async function authRoutes(fastify: FastifyInstance) {

    fastify.post(
        "/register",
        authController.register,
    )


    // register business


    // LOGIN (PUBLIC)
    fastify.post("/login", authController.login);


    // REFRESH TOKEN (PUBLIC)
    fastify.post("/refresh-token", authController.refreshToken);

    // LOGOUT (PROTECTED)
    fastify.post(
        "/logout",
        {
            preHandler: [authenticate]
        },
        authController.logout
    );

    // ME (PROTECTED)
    fastify.get(
        "/me",
        {
            preHandler: [authenticate]
        },
        authController.me
    );
}