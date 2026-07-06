import { FastifyReply, FastifyRequest } from "fastify";
import venueLocationService from "../../services/venue/venueLocation.service"
// import {validatevenue} from "../../utils/validator.js";

class VenueLocationController {

    async create(req: FastifyRequest, reply: FastifyReply) {

        try{
            const data = req.body;
            // validatevenue(data);
            const result =  await venueLocationService.create(
                data,
                req.user
            )
            return reply.status(200).send({
                success: true,
                message: "Venue Location created successfully",
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
                    attributes: [],
                },
            ]
            // console.log(include)
            const data =
                await venueLocationService.getAll(
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
    async getByVenueLocationCode(req: FastifyRequest, reply: FastifyReply) {

        try {
            let include = req.query.include ?? "";
            include = [
                {
                    alias: "venue",
                    attributes: [],
                },
            ]
            const venueCode = String(req.params.locationCode)
            const result = await venueLocationService.getByVenueLocationCode(
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
                    alias: "venue",
                    attributes: [],
                },
            ]
            const where = {...req.query};
            const result = await venueLocationService.getByField(
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

            const venueCode = String(req.params.locationCode);

            const data = await venueLocationService.update(
                venueCode,
                req.body,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "venue updated successfully",
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
            const venueCode = String(req.params.locationCode)
            const data = req.body
            console.log(data)
            await venueLocationService.deactivate(
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
            const venueCode = String(req.params.locationCode)

            await venueLocationService.delete(
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

export default  new VenueLocationController();