import { FastifyRequest, FastifyReply } from "fastify";
import rolePermissionRepo from "../repositories/user/rolePermission.repository.js";

export async function loadPermissions(
    req: FastifyRequest,
    reply: FastifyReply
) {
    try {

        const roleCode = (req as any).user?.roleCode;

        if (!roleCode) {
            return reply.status(403).send({
                success: false,
                message: "Role not found"
            });
        }

        //--------------------------------------------------
        // Fetch permissions via join table
        //--------------------------------------------------

        const rolePermissions = await rolePermissionRepo.findAll({
            where: {
                role_code: roleCode
            },
            include: [
                {
                    alias: "permission"
                }
            ]
        });

        //--------------------------------------------------
        // Map to simple array
        //--------------------------------------------------

        const permissions = rolePermissions
            .map((rp: any) => {
                return rp.permission
                    ? `${rp.permission.module}.${rp.permission.name}`
                    : null;
            })
            .filter(Boolean);

        //--------------------------------------------------
        // Attach to request
        //--------------------------------------------------

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