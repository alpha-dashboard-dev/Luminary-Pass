import { FastifyReply, FastifyRequest } from "fastify";
import userService from "../../services/user/user.service";
import {validateUser} from "../../utils/validator.js";

class UserController {

    async create(req: FastifyRequest, reply: FastifyReply) {

        try{
            const data = req.body;
            // console.log(data);
            validateUser(data);
            const result =  await userService.create(
                data,
                req.user
            )
            return reply.status(200).send({
                success: true,
                message: "User created successfully",
                data: result
            });
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
                    alias: "role",
                    attributes: [],
                },
                {
                    alias: "organization",
                    attributes: [],
                },
                {
                    alias: "business",
                    attributes: [],
                },
            ]
            // console.log(include)
            const data =
                await userService.getAll(
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

    // Get by User code
    async getByUserCode(req: FastifyRequest, reply: FastifyReply) {

        try {
            let include = req.query.include ?? "";
            include = [
                {
                    alias: "role",
                    attributes: [],
                },
                {
                    alias: "organization",
                    attributes: [],
                },
                {
                    alias: "business",
                    attributes: [],
                },
            ]
            const userCode = String(req.params.userCode)
            const result = await userService.getByUserCode(
                userCode,
                {
                    ...req.query,
                    include
                },
                req.user,
            );

            return reply.status(200).send({
                success: true,
                result,
            });

        } catch (err: any) {

            return reply.status(404).send({
                success: false,
                message: err.message,
            });
        }
    }

    // Get By Any Field
    async getByField(req: FastifyRequest, reply: FastifyReply) {

        try {
            let include = req.query.include ?? "";
            include = [
                {
                    alias: "role",
                    attributes: [],
                },
                {
                    alias: "organization",
                    attributes: [],
                },
                {
                    alias: "business",
                    attributes: [],
                },
            ]
            const where = {...req.query};
            const result = await userService.getByField(
                where,
                {
                    ...req.query,
                    include
                },
                req.user,
            );

            return reply.status(200).send({
                success: true,
                result,
            });

        } catch (err: any) {

            return reply.status(404).send({
                success: false,
                message: err.message,
            });
        }
    }


    //Update User

    async update(req: FastifyRequest, reply: FastifyReply) {

        try {

            const userCode = String(req.params.userCode);

            const data = await userService.update(
                userCode,
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

    async deactivate(req: FastifyRequest, reply: FastifyReply) {
        try{
            const userCode = String(req.params.userCode)
            const data = req.body
            // console.log(data)
            await userService.deactivate(
                userCode,
                data,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "User deactivated",
                data,
            });


        }catch(err){
            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }

    //  DELETE User
    async delete(req: FastifyRequest, reply: FastifyReply) {

        try {
            const userCode = String(req.params.userCode)

            await userService.delete(
                userCode,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "User permanently deleted"
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }
}

export default  new UserController();