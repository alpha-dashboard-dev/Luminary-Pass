import { FastifyRequest, FastifyReply } from "fastify";
import rolePermissionRepo from "../repositories/user/rolePermission.repository.js";
import {Op} from "sequelize";

export function hasPermission(permissionCodes: string[], mode: Boolean) {
    return async (req: FastifyRequest, reply: FastifyReply) => {
        try {

            //  also return missing permissions, and tell that you have not these permissions and you have these permissions
            const roleCode = (req as any).user?.roleCode;

            if (!roleCode) {
                return reply.status(403).send({
                    success: false,
                    message: "Role not found",
                });
            }

            const rolePermissions = await rolePermissionRepo.findAll({
                where: {
                    role_code: roleCode,
                    permission_code: {
                        [Op.in]: permissionCodes
                    }
                }},
                {
                    include: [
                        {
                            alias: "permission"
                        }
                    ]
                }
            );

            // all permission
            if (mode) {
                if (rolePermissions.length !== permissionCodes.length) {
                    return reply.status(403).send({
                        success: false,
                        message: "Permission denied.",
                    });
                }
            } else {
                if (rolePermissions.length === 0) {
                    return reply.status(403).send({
                        success: false,
                        message: "Permission denied.",
                    });
                }
            }

            return;

        } catch (err: any) {
            return reply.status(500).send({
                success: false,
                message: "Permission check failed",
                error: err.message,
            });
        }
    };
}