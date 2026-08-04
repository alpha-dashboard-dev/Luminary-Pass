import { FastifyRequest, FastifyReply } from "fastify";
import { verifyAccessToken } from "../utils/jwt.js";
import userSessionRepo from "../repositories/user/userSession.repository.js";
import userRepo from "../repositories/user/user.repository.js";

export async function authenticate(req: FastifyRequest, reply: FastifyReply) {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return reply.status(401).send({
                success: false,
                message: "Authorization header missing"
            });
        }

        const token = authHeader.replace("Bearer ", "");

        if (!token) {
            return reply.status(401).send({
                success: false,
                message: "Token missing"
            });
        }

        // Verify JWT ACCESS TOKEN
        const payload: any = verifyAccessToken(token);

        if (!payload?.userCode || !payload?.sessionCode) {
            return reply.status(401).send({
                success: false,
                message: "Invalid token payload"
            });
        }

        // Validate session
        const session = await userSessionRepo.findOne({
            session_code: payload.sessionCode,
            status: "active"
        });

        if (!session) {
            return reply.status(401).send({
                success: false,
                message: "Session expired or revoked"
            });
        }

        // Load user
        const user = await userRepo.findOne({
            user_code: payload.userCode,
            status: "active"
        });

        if (!user) {
            return reply.status(401).send({
                success: false,
                message: "User not found or inactive"
            });
        }

        // Attach to request

        (req as any).user = {
            userCode: user.user_code,
            roleCode: user.role_code,
            organizationCode: user.organization_code,
            businessCode: user.business_code,
            sessionCode: payload.sessionCode
        };

        return;

    } catch (err: any) {

        return reply.status(401).send({
            success: false,
            message: "Unauthorized",
            error: err.message
        });
    }
}