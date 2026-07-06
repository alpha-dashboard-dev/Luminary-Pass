import { FastifyRequest, FastifyReply } from "fastify";
import rolePermissionRepo from "../repositories/user/rolePermission.repository.js";

export async function loadPermissions(req: FastifyRequest, reply: FastifyReply) {
    try {

        const roleCode = (req as any).user?.roleCode;

        if (!roleCode) {
            return reply.status(403).send({
                success: false,
                message: "Role not found"
            });
        }

        const rolePermissions = await rolePermissionRepo.findOne({
            where: {
                role_code: roleCode,
                permission_code: permissionCOde
            },
            include: [
                {
                    alias: "permission"
                }
            ]
        });

        const permissions = rolePermissions
            .map((rp: any) => {
                return rp.permission
                    ? `${rp.permission.module}.${rp.permission.name}`
                    : null;
            })
            .filter(Boolean);

        (req as any).permissions = permissions;

        return;

    } catch (err: any) {

        return reply.status(500).send({
            success: false,
            message: "Failed to load permissions",
            error: err.message
        });
    }
}