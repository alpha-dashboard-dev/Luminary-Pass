import { FastifyInstance } from "fastify";

import authRoutes from "./auth.routes";
// import userRoutes from "./user.routes";
import userRoleRoutes from "./user/userRole.routes"
import permissionRoutes from "./user/permission.routes"
import rolePermissionRoutes from "./user/rolePermission.routes"

export default async function routes(fastify: FastifyInstance) {
    fastify.register(authRoutes, { prefix: "/auth" });
    // fastify.register(userRoutes, { prefix: "/users" });
    fastify.register(userRoleRoutes, { prefix: "/roles" });
    fastify.register(permissionRoutes, { prefix: "/permissions" });
    fastify.register(rolePermissionRoutes,{ prefix: "/role-permissions" })
}