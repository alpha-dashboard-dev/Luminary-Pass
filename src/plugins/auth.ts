import fp from "fastify-plugin";
import { FastifyRequest, FastifyReply } from "fastify";
import { verifyAccessToken } from "../utils/jwt";

export default fp(async (fastify) => {

    fastify.decorate(
        "authenticate",
        async function (
            request: FastifyRequest,
            reply: FastifyReply
        ) {
            try {

                const authHeader = request.headers.authorization;

                if (!authHeader?.startsWith("Bearer ")) {
                    return reply.status(401).send({
                        success: false,
                        message: "Access token required",
                    });
                }

                const token = authHeader.split(" ")[1];

                const decoded: any = verifyAccessToken(token);

                request.user = {
                    userCode: decoded.userCode,
                    roleCode: decoded.roleCode,
                    businessCode: decoded.businessCode,
                };

            } catch {

                return reply.status(401).send({
                    success: false,
                    message: "Invalid or expired token",
                });
            }
        }
    );

});