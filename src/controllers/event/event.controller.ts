import { FastifyReply, FastifyRequest } from "fastify";
import eventService from "../../services/event/event.service";
import {validateEvent, validateEventDetails} from "../../utils/validator.js";
import {ApiResponse} from "../../utils/response.js";

class eventController {

    // async create(req: FastifyRequest, reply: FastifyReply) {
    //
    //     try{
    //         const data = req.body;
    //         validateEvent(data)
    //         const result =  await eventService.create(
    //             data,
    //             req.user
    //         )
    //         return reply.status(200).send({
    //             success: true,
    //             message: "event created successfully",
    //             data: result
    //         });
    //     }
    //     catch (err: any) {
    //         return reply.status(400).send({
    //             success: false,
    //             message: err.message
    //         });
    //     }
    // }


    //
    async create(req: FastifyRequest, reply: FastifyReply) {
        // console.log("Request received");
        try {

            let eventData:  any = {};
            const images:   any[] = [];

            for await (const part of req.parts()) {
                // console.log(part.fieldname, part.type);

                if(part.type === "file") {

                    if(part.fieldname === "eventImages") {

                        const buffer = await part.toBuffer();

                        images.push({
                            filename: part.filename,
                            mimetype: part.mimetype,
                            size: buffer.length,
                            buffer
                        });
                    }
                } else {
                    if(part.fieldname === "taskDetails"){
                        try{
                            eventData[part.fieldname] = JSON.parse(part.value as string);
                        } catch{
                            throw new Error("Invalid taskDetails JSON")
                        }
                    }
                    else{
                        eventData[part.fieldname] = part.value;
                    }
                }
            }

            const data = {
                ...eventData,
                images
            };

            // console.log(data);
            validateEventDetails(data);
            // console.log(data);
            const result = await eventService.create(
                data,
                req.user
            );
            return ApiResponse.success(
                reply,
                result,
                "Event Created Successfully",
                200
            )
        } catch(err:any){
            return ApiResponse.error(
                reply,
                err.message,
                400,
                err,
            );
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