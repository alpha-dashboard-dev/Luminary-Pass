import { FastifyInstance } from "fastify";

import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";

export default async function routes(fastify: FastifyInstance) {
    fastify.register(authRoutes, { prefix: "/auth" });
    fastify.register(userRoutes, { prefix: "/users" });
}