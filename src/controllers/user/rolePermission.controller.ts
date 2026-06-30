import { FastifyReply, FastifyRequest } from "fastify";
import rolePermissionService from "../../services/user/rolePermission.service.js";

class RolePermissionController {

    async assignPermissions(req: FastifyRequest, reply: FastifyReply) {

        try {

            const { roleCode, permissions } = req.body as any;
            const result = await rolePermissionService.assignPermissions(
                roleCode,
                permissions,
            );

            return reply.status(200).send({
                success: true,
                message: "Permissions assigned successfully",
                data: result
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }

    async replacePermissions(req: FastifyRequest, reply: FastifyReply) {

        try{
            const { roleCode, permissions } = req.body as any;
            const result = await rolePermissionService.replacePermissions(
                roleCode,
                permissions,
            );

            return reply.status(200).send({
                success: true,
                message: "Permissions replaced successfully",
                data: result
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message
            });

        }
    }

    async removeOnePermission(req: FastifyRequest, reply: FastifyReply) {

        try{
            const { roleCode, permissionCode } = req.query as any;
            const result = await rolePermissionService.removeOnePermission(
                roleCode,
                permissionCode,
            );

            return reply.status(200).send({
                success: true,
                message: "Provided One Permission removed successfully",
                data: result
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message
            });

        }
    }


    async removeAllPermissions(req: FastifyRequest, reply: FastifyReply) {

        try{
            const roleCode = req.params.roleCode;
            const result = await rolePermissionService.removeAllPermissions(
                roleCode,
            );

            return reply.status(200).send({
                success: true,
                message: "All Permissions removed successfully",
                data: result
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message
            });

        }
    }

    async getPermissions(req: FastifyRequest, reply: FastifyReply) {

        try{

            let include = req.query.include ?? "";

            include = [
                {
                    alias: "permission",
                    attributes: [],
                },
            ]
            const roleCode = String(req.params.roleCode);
            const result = await rolePermissionService.getPermissions(
                roleCode,
                {
                    ...req.query,
                    include,
                },
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "Fetch All permissions of that role successfully",
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

export default new RolePermissionController();