import { FastifyReply, FastifyRequest } from "fastify";
import AuthService from "../services/auth.service";

class AuthController {

    async register(req: FastifyRequest, reply: FastifyReply) {

        try {
            const user = await AuthService.register(req.body);
            return reply.send({ success: true, data: user });
        } catch (err: any) {
            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }

    async login(req: FastifyRequest, reply: FastifyReply) {

        try {
            const result = await AuthService.login(req.body);
            return reply.send({ success: true, data: result });
        } catch (err: any) {
            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }

    async refresh(req: FastifyRequest, reply: FastifyReply) {

        try {
            const { refreshToken } = req.body as any;

            const result = await AuthService.refresh(refreshToken);

            return reply.send({ success: true, data: result });

        } catch (err: any) {
            return reply.status(401).send({
                success: false,
                message: err.message
            });
        }
    }

    async logout(req: FastifyRequest, reply: FastifyReply) {

        try {
            const { refreshToken } = req.body as any;

            await AuthService.logout(refreshToken);

            return reply.send({ success: true });

        } catch (err: any) {
            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }
}

export default new AuthController();