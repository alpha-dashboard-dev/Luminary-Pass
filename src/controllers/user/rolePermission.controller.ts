import { FastifyReply, FastifyRequest } from "fastify";
import rolePermissionService from "../../services/user/rolePermission.service.js";

class RolePermissionController {

    async create(req: FastifyRequest, reply: FastifyReply) {

        try{
            const data = req.body;
            const result =  await rolePermissionService.create(
                data,
                req.user
            )
        }
        catch (err: any) {
            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }

}

export default new RolePermissionController();