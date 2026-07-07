import { FastifyReply, FastifyRequest } from "fastify";
import badgeService from "../../services/badge/badge.service";

class badgeController {

    async create(req: FastifyRequest, reply: FastifyReply) {

        try{
            const data = req.body;
            console.log(data);
            // validateBadge(data);
            const result =  await badgeService.create(
                data,
                req.user
            )
            return reply.status(200).send({
                success: true,
                message: "badge created successfully",
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
            ]
            // console.log(include)
            const data =
                await badgeService.getAll(
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

    // Get by badge code
    async getByBadgeCode(req: FastifyRequest, reply: FastifyReply) {

        try {
            let include = req.query.include ?? "";
            include = [
            ]
            const badgeCode = String(req.params.badgeCode)
            const result = await badgeService.getByBadgeCode(
                badgeCode,
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
            ]
            const where = {...req.query};
            const result = await badgeService.getByField(
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


    //Update badge

    async update(req: FastifyRequest, reply: FastifyReply) {

        try {

            const badgeCode = String(req.params.badgeCode);

            const data = await badgeService.update(
                badgeCode,
                req.body,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "badge updated successfully",
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
            const badgeCode = String(req.params.badgeCode)
            const data = req.body
            console.log(data)
            await badgeService.deactivate(
                badgeCode,
                data,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "badge deactivated",
                data,
            });


        }catch(err){
            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }

    //  DELETE badge
    async delete(req: FastifyRequest, reply: FastifyReply) {

        try {
            const badgeCode = String(req.params.badgeCode)

            await badgeService.delete(
                badgeCode,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "badge permanently deleted"
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }
}

export default new badgeController();