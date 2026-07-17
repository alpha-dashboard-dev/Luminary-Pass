import { FastifyReply, FastifyRequest } from "fastify";
import categoryService from "../../services/category/category.service";
import {validateCategory} from "../../utils/validator.js";

class categoryController {

    async create(req: FastifyRequest, reply: FastifyReply) {

        try{
            const data = req.body;
            validateCategory(data)
            const result =  await categoryService.create(
                data,
                req.user
            )
            return reply.status(200).send({
                success: true,
                message: "Category created successfully",
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
            const data = await categoryService.getAll(
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

    // Get by category code
    async getByCategoryCode(req: FastifyRequest, reply: FastifyReply) {

        try {
            let include = req.query.include ?? "";
            include = [
                {
                    alias: "users",
                    attributes: [],
                },
            ]
            const categoryCode = String(req.params.categoryCode)
            const result = await categoryService.getByCategoryCode(
                categoryCode,
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
                    alias: "users",
                    attributes: [],
                },
            ]
            const where = {...req.query};
            const result = await categoryService.getByField(
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


    //Update category

    async update(req: FastifyRequest, reply: FastifyReply) {

        try {

            const categoryCode = String(req.params.categoryCode);

            const data = await categoryService.update(
                categoryCode,
                req.body,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "category updated successfully",
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
            const categoryCode = String(req.params.categoryCode)
            const data = req.body
            await categoryService.deactivate(
                categoryCode,
                data,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "category deactivated",
                data,
            });


        }catch(err){
            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }

    //  DELETE category
    async delete(req: FastifyRequest, reply: FastifyReply) {

        try {
            const categoryCode = String(req.params.categoryCode)

            await categoryService.delete(
                categoryCode,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "category permanently deleted"
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }
}

export default  new categoryController();