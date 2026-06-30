import { FastifyReply, FastifyRequest } from "fastify";
import UserRoleService from "../../services/user/userRole.service.js";

class UserRoleController {

    async create(req: FastifyRequest, reply: FastifyReply) {

        try{
            const data = req.body;
            const result =  await UserRoleService.create(
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
            include = [
                {
                    alias: "business",
                    attributes: [],
                },
            ]
            // console.log(include)
            const data =
                await UserRoleService.getAll(
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

    async getByRoleCode(req: FastifyRequest, reply: FastifyReply) {

        try {
            const roleCode = String(req.params.roleCode)
            const data =
                await UserRoleService.getByRoleCode(
                    roleCode,
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

    async getByAnyField(req: FastifyRequest, reply: FastifyReply) {

        try {
            // console.log(req.query)
            const { include, ...where } = req.query;
            // console.log(field, value)
            const user = req.user;
            const data = await UserRoleService.getByAnyField(
                where,
                user,
                {
                    include
                }
            )

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

    //UPDATE ROLE

    async update(req: FastifyRequest, reply: FastifyReply) {

        try {

            const roleCode = String(req.params.roleCode);

            const data = await UserRoleService.update(
                    roleCode,
                    req.body,
                    req.user
                );

            return reply.status(200).send({
                success: true,
                message: "User updated successfully",
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
            const roleCode = String(req.params.roleCode)

            await UserRoleService.delete(
                roleCode,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "Role permanently deleted"
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }
}

export default  new UserRoleController();