import { FastifyRequest, FastifyReply } from "fastify";

export function hasPermission(requiredPermission: string | string[]) {

    return async function (req: FastifyRequest, reply: FastifyReply) {
        try {

            const permissions = (req as any).permissions || [];

            //--------------------------------------------------
            // Super admin bypass (optional)
            //--------------------------------------------------

            const roleCode = (req as any).user?.roleCode;

            if (roleCode === "SUPERADM") {
                return;
            }

            //--------------------------------------------------
            // Check permission
            //--------------------------------------------------

            const required = Array.isArray(requiredPermission)
                ? requiredPermission
                : [requiredPermission];

            const allowed = required.some(p =>
                permissions.includes(p)
            );

            if (!allowed) {
                return reply.status(403).send({
                    success: false,
                    message: "Forbidden: insufficient permissions"
                });
            }

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