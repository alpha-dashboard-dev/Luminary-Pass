import { FastifyReply, FastifyRequest } from "fastify";
import venueService from "../../services/venue/venue.service";
import {validateVenue} from "../../utils/validator.js";

class VenueController {

    async create(req: FastifyRequest, reply: FastifyReply) {

        try{
            const data = req.body;
            validateVenue(data);
            const result =  await venueService.create(
                data,
                req.user
            )
            return reply.status(200).send({
                success: true,
                message: "Venue created successfully",
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
                    alias: "business",
                    attributes: [],
                },
            ]
            // console.log(include)
            const data =
                await venueService.getAll(
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

    // Get by Venue code
    async getByVenueCode(req: FastifyRequest, reply: FastifyReply) {

        try {
            let include = req.query.include ?? "";
            include = [
                {
                    alias: "business",
                    attributes: [],
                },
            ]
            const venueCode = String(req.params.venueCode)
            const result = await venueService.getByVenueCode(
                venueCode,
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
                    alias: "business",
                    attributes: [],
                },
            ]
            const where = {...req.query};
            const result = await venueService.getByField(
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


    //Update venue

    async update(req: FastifyRequest, reply: FastifyReply) {

        try {

            const venueCode = String(req.params.venueCode);
            const data = req.body;
            validateVenue(data, true);

            const result = await venueService.update(
                venueCode,
                req.body,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "venue updated successfully",
                result,
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
            const venueCode = String(req.params.venueCode)
            const data = req.body
            validateVenue(data, true);
            // console.log(data)
            await venueService.deactivate(
                venueCode,
                data,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "venue deactivated",
                data,
            });


        }catch(err){
            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }

    //  DELETE venue
    async delete(req: FastifyRequest, reply: FastifyReply) {

        try {
            const venueCode = String(req.params.venueCode)

            await venueService.delete(
                venueCode,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "venue permanently deleted"
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }
}

export default  new VenueController();