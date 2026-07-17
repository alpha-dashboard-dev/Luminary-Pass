import { FastifyReply, FastifyRequest } from "fastify";
import checklistAttachmentService from "../../services/event/checklistAttachment.service";
// import {validatechecklistAttachment} from "../../utils/validator.js";

class checklistAttachmentController {

    async create(req: FastifyRequest, reply: FastifyReply) {

        try{
            const data = req.body;
            // validatechecklistAttachment(data);
            const result =  await checklistAttachmentService.create(
                data,
                req.user
            )
            return reply.status(200).send({
                success: true,
                message: "checklistAttachment created successfully",
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
                    alias: "creator",
                    attributes: [],
                },
            ]
            // console.log(include)
            const data = await checklistAttachmentService.getAll(
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

    // Get by checklistAttachment code
    async getByAttachmentCode(req: FastifyRequest, reply: FastifyReply) {

        try {
            let include = req.query.include ?? "";
            include = [
                {
                    alias: "creator",
                    attributes: [],
                },
            ]
            const attachmentCode = String(req.params.attachmentCode)
            const result = await checklistAttachmentService.getByAttachmentCode(
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
                    alias: "creator",
                    attributes: [],
                },
            ]
            const where = {...req.query};
            const result = await checklistAttachmentService.getByField(
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


    //Update checklistAttachment

    async update(req: FastifyRequest, reply: FastifyReply) {

        try {

            const attachmentCode = String(req.params.attachmentCode);

            const data = await checklistAttachmentService.update(
                attachmentCode,
                req.body,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "checklistAttachment updated successfully",
                data,
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message,
            });
        }
    }

    //  DELETE checklistAttachment
    async delete(req: FastifyRequest, reply: FastifyReply) {

        try {
            const attachmentCode = String(req.params.attachmentCode)

            await checklistAttachmentService.delete(
                attachmentCode,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "checklistAttachment permanently deleted"
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }
}

export default  new checklistAttachmentController();