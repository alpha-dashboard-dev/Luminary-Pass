import { FastifyInstance } from "fastify";

import authRoutes from "./authentication/auth.routes.js";
import userRoutes from "./user/user.routes";
import userRoleRoutes from "./user/userRole.routes"
import permissionRoutes from "./user/permission.routes"
import rolePermissionRoutes from "./user/rolePermission.routes"
import organizationRoleRoutes from "./organization/organization.routes"
import businessRoutes from "./business/business.routes"

export default async function routes(fastify: FastifyInstance) {
    fastify.register(authRoutes, { prefix: "/auth" });
    fastify.register(userRoutes, { prefix: "/users" });
    fastify.register(userRoleRoutes, { prefix: "/roles" });
    fastify.register(permissionRoutes, { prefix: "/permissions" });
    fastify.register(rolePermissionRoutes,{ prefix: "/role-permissions" })
    fastify.register(organizationRoleRoutes, { prefix: "/organizations" });
    fastify.register(businessRoutes, { prefix: "/businesses" });
}