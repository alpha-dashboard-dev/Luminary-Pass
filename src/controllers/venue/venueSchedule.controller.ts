import { FastifyReply, FastifyRequest } from "fastify";
import venueScheduleService from "../../services/venue/venueSchedule.service";
import {validateVenueSchedule} from "../../utils/validator.js";

class VenueScheduleController {

    async create(req: FastifyRequest, reply: FastifyReply) {

        try{
            const data = req.body;
            validateVenueSchedule(data)
            const result =  await venueScheduleService.create(
                data,
                req.user
            )
            return reply.status(200).send({
                success: true,
                message: "Venue Schedule created successfully",
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
                    alias: "venue",
                    attributes: []
                }
            ]
            // console.log(include)
            const data =
                await venueScheduleService.getAll(
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

    // Get by Schedule code
    async getByScheduleCode(req: FastifyRequest, reply: FastifyReply) {

        try {
            let include = req.query.include ?? "";
            include = [
                {
                    alias: "venue",
                    attributes: []
                }
            ]
            const scheduleCode = String(req.params.scheduleCode)
            const result = await venueScheduleService.getByScheduleCode(
                scheduleCode,
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
                    alias: "venue",
                    attributes: []
                }
            ]
            const where = {...req.query};
            const result = await venueScheduleService.getByField(
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


    //Update Schedule

    async update(req: FastifyRequest, reply: FastifyReply) {

        try {

            const scheduleCode = String(req.params.scheduleCode);

            const data = await venueScheduleService.update(
                scheduleCode,
                req.body,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "Schedule updated successfully",
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
            const scheduleCode = String(req.params.scheduleCode)
            const data = req.body
            // console.log(data)
            await venueScheduleService.deactivate(
                scheduleCode,
                data,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "Schedule deactivated",
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
            const scheduleCode = String(req.params.scheduleCode)
            console.log(scheduleCode)

            await venueScheduleService.delete(
                scheduleCode,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "Schedule permanently deleted"
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }
}

export default  new VenueScheduleController();