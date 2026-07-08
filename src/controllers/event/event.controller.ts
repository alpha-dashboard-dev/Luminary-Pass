import { FastifyReply, FastifyRequest } from "fastify";
import eventService from "../../services/event/event.service";
import {validateEvent} from "../../utils/validator.js";

class eventController {

    async create(req: FastifyRequest, reply: FastifyReply) {

        try{
            const data = req.body;
            validateEvent(data)
            const result =  await eventService.create(
                data,
                req.user
            )
            return reply.status(200).send({
                success: true,
                message: "event created successfully",
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
            const data =
                await eventService.getAll(
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

    // Get by event code
    async getByEventCode(req: FastifyRequest, reply: FastifyReply) {

        try {
            let include = req.query.include ?? "";
            include = [
                {
                    alias: "creator",
                    attributes: [],
                },
            ]
            const eventCode = String(req.params.eventCode)
            const result = await eventService.getByEventCode(
                eventCode,
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
            const result = await eventService.getByField(
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


    //Update event

    async update(req: FastifyRequest, reply: FastifyReply) {

        try {

            const eventCode = String(req.params.eventCode);

            const data = await eventService.update(
                eventCode,
                req.body,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "event updated successfully",
                data,
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message,
            });
        }
    }

    //  DELETE event
    async delete(req: FastifyRequest, reply: FastifyReply) {

        try {
            const eventCode = String(req.params.eventCode)

            await eventService.delete(
                eventCode,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "event permanently deleted"
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }
}

export default  new eventController();