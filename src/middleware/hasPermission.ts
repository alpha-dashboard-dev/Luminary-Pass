import { FastifyRequest, FastifyReply } from "fastify";
import rolePermissionRepo from "../repositories/user/rolePermission.repository.js";

type PermissionOptions = {
    permissions: string[];
    required?: "any" | "all";
};

export function hasPermission(  { permissions, required }: PermissionOptions) {
    return async (req: FastifyRequest, reply: FastifyReply) => {
        try {

            const roleCode = (req as any).user?.roleCode;

            if (!roleCode) {
                return reply.status(403).send({
                    success: false,
                    message: "Role not found",
                });
            }
            // console.log(permissions)

            for (const permissionCode of permissions) {
                const permission = await rolePermissionRepo.findOne(
                    {
                        role_code: roleCode,
                        permission_code: permissionCode,
                    },
                    {
                        include: [
                            {
                                alias: "permission",
                                attributes: []
                            }
                        ]
                    });

                if (required === "any" && permission) {
                    return;
                }

                if (required === "all" && !permission) {
                    return reply.status(403).send({
                        success: false,
                        message: "Permission denied",
                    });
                }
            }

            if (required === "all") {
                return;
            }

            return reply.status(403).send({
                success: false,
                message: "Permission denied",
            });

        } catch (err: any) {
            return reply.status(500).send({
                success: false,
                message: "Permission check failed",
                error: err.message,
            });
        }
    };
}