import { FastifyRequest, FastifyReply } from "fastify";
import authService from "../../services/authentication/auth.service.ts";

class AuthController {

    async login(req: FastifyRequest, reply: FastifyReply) {

        try {

            const result = await authService.login(
                req.body,
                req
            );

            return reply.status(200).send({
                success: true,
                message: "Login successful",
                data: result
            });

        } catch (err: any) {

            return reply.status(401).send({
                success: false,
                message: err.message
            });
        }
    }

    async logout(req: FastifyRequest, reply: FastifyReply) {

        try {

            // sessionCode comes from auth middleware (we will build next)
            const sessionCode = (req as any).user?.sessionCode;

            if (!sessionCode) {
                return reply.status(400).send({
                    success: false,
                    message: "Session not found"
                });
            }

            const result = await authService.logout(sessionCode);

            return reply.status(200).send({
                success: true,
                message: "Logout successful",
                data: result
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }


    async refreshToken(req: FastifyRequest, reply: FastifyReply) {

        try {

            const { refreshToken } = req.body as any;

            const result = await authService.refreshToken(refreshToken);

            return reply.status(200).send({
                success: true,
                message: "Token refreshed successfully",
                data: result
            });

        } catch (err: any) {

            return reply.status(401).send({
                success: false,
                message: err.message
            });
        }
    }

    /**
     * ME
     */
    async me(req: FastifyRequest, reply: FastifyReply) {

        try {
            let include = req.query.include ?? "";
            include = [
                {
                    alias: "role",
                    attributes: [],
                }
            ]

            const userCode = (req as any).user?.userCode;

            if (!userCode) {
                return reply.status(401).send({
                    success: false,
                    message: "Unauthorized"
                });
            }

            const result = await authService.me(
                userCode,
                {
                    ...req.query,
                    include,
                }
            );

            return reply.status(200).send({
                success: true,
                message: "User fetched successfully",
                data: result
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }
}

export default new AuthController();