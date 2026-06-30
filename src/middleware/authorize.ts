import { FastifyReply, FastifyRequest } from "fastify";

export function authorize(...roles: string[]) {

    return async function (request: FastifyRequest, reply: FastifyReply) {

        if (!request.user) {
            return reply.status(401).send({
                success: false,
                message: "Unauthenticated",
            });
        }

        if (!roles.includes(request.user.roleCode)) {
            return reply.status(403).send({
                success: false,
                message: "Forbidden",
            });
        }
    };
}