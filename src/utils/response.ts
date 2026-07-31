import { FastifyReply } from "fastify";

export class ApiResponse {

    static success(reply: FastifyReply, data: any = null, message = "Success", status = 200) {

        return reply.code(status).send({
            success: true,
            message,
            data,
        });
    }

    static error(reply: FastifyReply, message = "Something went wrong", status = 500, errors: any = null) {

        return reply.code(status).send({
            success: false,
            message,
            errors,
        });
    }
}

// use in userController for testing activateInfluencerAccount