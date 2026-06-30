import { FastifyInstance } from "fastify";
import AuthController from "../controllers/auth.controller";
import {authorize} from "../middleware/authorize.js";

export default async function authRoutes(app: FastifyInstance) {

    app.post(
        "/register",
        {
            preHandler: [
                app.authenticate,
                authorize("ADMIN"),
            ],
        },
        AuthController.register
    );

    app.post("/login", AuthController.login);

    app.post("/refresh", AuthController.refresh);

    app.post(
        "/logout",
        {
            preHandler: [app.authenticate],
        },
        AuthController.logout
    );
}