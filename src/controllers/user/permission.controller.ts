import { FastifyReply, FastifyRequest } from "fastify";
import permissionService from "../../services/user/permission.service.js";

class permissionController {

    async create(req: FastifyRequest, reply: FastifyReply) {

        try{
            const data = req.body;
            const result =  await permissionService.create(
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

    async getAll(req: FastifyRequest, reply: FastifyReply) {

        try {
            let include = req.query.include ?? "";
            // console.log(include)
            const data =
                await permissionService.getAll(
                    {
                        ...req.query,
                        include
                    },
                    req.user
                );

            return reply.status(200).send({
                success: true,
                data,
            });

        } catch (err: any) {
            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }

    async getByPermissionCode(req: FastifyRequest, reply: FastifyReply) {

        try {
            const permissionCode = String(req.params.permissionCode)
            const data =
                await permissionService.getByPermissionCode(
                    permissionCode,
                    req.user,
                    // req.query
                );

            return reply.status(200).send({
                success: true,
                data,
            });

        } catch (err: any) {

            return reply.status(404).send({
                success: false,
                message: err.message,
            });
        }
    }

    //UPDATE PERMISSION

    async update(req: FastifyRequest, reply: FastifyReply) {

        try {

            const permissionCode = String(req.params.permissionCode);

            const data = await permissionService.update(
                permissionCode,
                req.body,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "Permission updated successfully",
                data,
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message,
            });
        }
    }

    // // DELETE ROLE

    async delete(req: FastifyRequest, reply: FastifyReply) {

        try {
            const permissionCode = String(req.params.permissionCode)

            await permissionService.delete(
                permissionCode,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "Permission permanently deleted"
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }
}

export default  new permissionController();