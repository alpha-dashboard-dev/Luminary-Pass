import { FastifyRequest, FastifyReply } from "fastify";
import rolePermissionRepo from "../repositories/user/rolePermission.repository.js";
import {Op} from "sequelize";

export function hasPermission(permissionCodes: string[]) {

    return async function (req: FastifyRequest, reply: FastifyReply) {
        try {

            const roleCode = (req as any).user?.roleCode;
            // console.log(permissionCodes);

            if (!roleCode) {
                return reply.status(403).send({
                    success: false,
                    message: "Role not found"
                });
            }
            let hasPermission = false
            for(const permission of permissionCodes) {
                // console.log(permission);
             rolePermissions = await rolePermissionRepo.findOne(
                {
                    role_code: roleCode,
                    permission_code: permission
                },
                {
                    include: [
                        {
                            alias: "permission"
                        }
                    ]
                }
            )}
            // console.log(rolePermissions);
            return;

        } catch (err: any) {

            return reply.status(500).send({
                success: false,
                message: "Permission check failed",
                error: err.message
            });
        }
    };
}























// import { FastifyRequest, FastifyReply } from "fastify";
//
// export function hasPermission(requiredPermission: string | string[]) {
//
//     return async function (req: FastifyRequest, reply: FastifyReply) {
//         try {
//
//             const permissions = (req as any).permissions || [];
//
//             //--------------------------------------------------
//             // Super admin bypass (optional)
//             //--------------------------------------------------
//
//             const roleCode = (req as any).user?.roleCode;
//
//             if (roleCode === "SUPERADM") {
//                 return;
//             }
//
//             //--------------------------------------------------
//             // Check permission
//             //--------------------------------------------------
//
//             const required = Array.isArray(requiredPermission)
//                 ? requiredPermission
//                 : [requiredPermission];
//
//             const allowed = required.some(p =>
//                 permissions.includes(p)
//             );
//
//             if (!allowed) {
//                 return reply.status(403).send({
//                     success: false,
//                     message: "Forbidden: insufficient permissions"
//                 });
//             }
//
//             return;
//
//         } catch (err: any) {
//
//             return reply.status(500).send({
//                 success: false,
//                 message: "Permission check failed",
//                 error: err.message
//             });
//         }
//     };
// }