import "fastify";
import {FastifyReply} from "fastify";

declare module "fastify" {

    interface FastifyRequest {

        user?: {

            userCode: string;

            roleCode: string;

            businessCode?: string | null;
        };
    }

    interface FastifyInstance {
        authenticate(
            request: FastifyRequest,
            reply: FastifyReply
        ): Promise<void>;
    }
}