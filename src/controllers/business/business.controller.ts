import { FastifyReply, FastifyRequest } from "fastify";
import businessService from "../../services/business/business.service";
import {validateBusiness} from "../../utils/validator.js";

class businessController {

    async create(req: FastifyRequest, reply: FastifyReply) {

        try{
            const data = req.body;
            validateBusiness(data);
            const result =  await businessService.create(
                data,
                req.user
            )
            return reply.status(200).send({
                success: true,
                message: "Business created successfully",
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
                    alias: "users",
                    attributes: [],
                },
            ]
            // console.log(include)
            const data =
                await businessService.getAll(
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

    // Get by business code
    async getByBusinessCode(req: FastifyRequest, reply: FastifyReply) {

        try {
            let include = req.query.include ?? "";
            include = [
                {
                    alias: "users",
                    attributes: [],
                },
            ]
            const businessCode = String(req.params.businessCode)
            const result = await businessService.getByBusinessCode(
                businessCode,
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

    // Get Business By Any Field
    async getByField(req: FastifyRequest, reply: FastifyReply) {

        try {
            let include = req.query.include ?? "";
            include = [
                {
                    alias: "users",
                    attributes: [],
                },
            ]
            const where = {...req.query};
            const result = await businessService.getByField(
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


    //Update Business

    async update(req: FastifyRequest, reply: FastifyReply) {

        try {

            const businessCode = String(req.params.businessCode);

            const data = await businessService.update(
                businessCode,
                req.body,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "business updated successfully",
                data,
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message,
            });
        }
    }

    // Deactivate Business
    async deactivate(req: FastifyRequest, reply: FastifyReply) {
        try{
            const businessCode = String(req.params.businessCode)
            const data = req.body
            console.log(data)
            await businessService.deactivate(
                businessCode,
                data,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "Business deactivated",
                data,
            });


        }catch(err){
            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }

    //  Delete Business
    async delete(req: FastifyRequest, reply: FastifyReply) {

        try {
            const businessCode = String(req.params.businessCode)

            await businessService.delete(
                businessCode,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "Business permanently deleted"
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }
}

export default  new businessController();