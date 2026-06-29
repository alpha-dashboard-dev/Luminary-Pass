import "fastify";

declare module "fastify" {

    interface FastifyRequest {

        user?: {

            userCode: string;

            roleCode: string;

            businessCode?: string;
        };
    }
}