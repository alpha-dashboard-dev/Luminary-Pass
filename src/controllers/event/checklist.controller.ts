import { FastifyReply, FastifyRequest } from "fastify";
import checklistService from "../../services/event/checklist.service";
import {validateEventChecklist} from "../../utils/validator.js";


class checklistController {

    async create(req: FastifyRequest, reply: FastifyReply) {

        try{
            const data = req.body;
            validateEventChecklist(data)
            const result =  await checklistService.create(
                data,
                req.user
            )
            return reply.status(200).send({
                success: true,
                message: "checklist created successfully",
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
                    alias: "event",
                    attributes: [],
                },
            ]
            // console.log(include)
            const data =
                await checklistService.getAll(
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

    // Get by checklist code
    async getByChecklistCode(req: FastifyRequest, reply: FastifyReply) {

        try {
            let include = req.query.include ?? "";
            include = [
                {
                    alias: "event",
                    attributes: [],
                },
            ]
            const checklistCode = String(req.params.checklistCode)
            const result = await checklistService.getByChecklistCode(
                checklistCode,
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
                    alias: "event",
                    attributes: [],
                },
            ]
            const where = {...req.query};
            const result = await checklistService.getByField(
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


    //Update checklist

    async update(req: FastifyRequest, reply: FastifyReply) {

        try {

            const checklistCode = String(req.params.checklistCode);

            const data = await checklistService.update(
                checklistCode,
                req.body,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "checklist updated successfully",
                data,
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message,
            });
        }
    }

    //  DELETE checklist
    async delete(req: FastifyRequest, reply: FastifyReply) {

        try {
            const checklistCode = String(req.params.checklistCode)

            await checklistService.delete(
                checklistCode,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "checklist permanently deleted"
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }
}

export default  new checklistController();