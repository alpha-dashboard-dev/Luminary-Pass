import { FastifyReply } from "fastify";

export class ApiResponse {

    static success(reply: FastifyReply, data: any = null, message = "Success", status = 200) {

        return reply.status(status).send({
            success: true,
            message,
            data,
        });
    }

    static error(reply: FastifyReply, message = "Something went wrong", status = 500, errors: any = null) {

        return reply.status(status).send({
            success: false,
            message,
            errors,
        });
    }
}