import { FastifyReply, FastifyRequest } from "fastify";
import attachmentService from "../../services/venue/venueAttachment.service.js";
import {validateVenueAttachment} from "../../utils/validator.js";

class attachmentController {

    async create(req: FastifyRequest, reply: FastifyReply) {

        try{
            const data = req.body;
            validateVenueAttachment(data);
            const result =  await attachmentService.create(
                data,
                req.user
            )
            return reply.status(200).send({
                success: true,
                message: "attachment created successfully",
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
                    alias: "venueAttachment",
                    attributes: [],
                },
            ]
            // console.log(include)
            const data =
                await attachmentService.getAll(
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

    // Get by attachment code
    async getByAttachmentCode(req: FastifyRequest, reply: FastifyReply) {

        try {
            let include = req.query.include ?? "";
            include = [
                {
                    alias: "venueAttachment",
                    attributes: [],
                },
            ]
            const attachmentCode = String(req.params.attachmentCode)
            const result = await attachmentService.getByAttachmentCode(
                attachmentCode,
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
                    alias: "venueAttachment",
                    attributes: [],
                },
            ]
            const where = {...req.query};
            const result = await attachmentService.getByField(
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


    //Update attachment

    async update(req: FastifyRequest, reply: FastifyReply) {

        try {

            const attachmentCode = String(req.params.attachmentCode);

            const data = await attachmentService.update(
                attachmentCode,
                req.body,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "attachment updated successfully",
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
            const attachmentCode = String(req.params.attachmentCode)
            const data = req.body
            console.log(data)
            await attachmentService.deactivate(
                attachmentCode,
                data,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "attachment deactivated",
                data,
            });


        }catch(err){
            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }

    //  DELETE attachment
    async delete(req: FastifyRequest, reply: FastifyReply) {

        try {
            const attachmentCode = String(req.params.attachmentCode)

            await attachmentService.delete(
                attachmentCode,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "attachment permanently deleted"
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }
}

export default  new attachmentController();