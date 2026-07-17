import { FastifyReply, FastifyRequest } from "fastify";
import locationService from "../../services/location/location.service";
import {validateLocation} from "../../utils/validator.js";

class locationController {

    async create(req: FastifyRequest, reply: FastifyReply) {

        try{
            const data = req.body;
            // console.log(data);
            validateLocation(data)
            const result =  await locationService.create(
                data,
                req.user
            )
            return reply.status(200).send({
                success: true,
                message: "location created successfully",
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
                {
                    alias: "user",
                    attributes: [],
                },
                {
                    alias: "event",
                    attributes: [],
                }

            ]
            // console.log(include)
            const data = await locationService.getAll(
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

    // Get by location code
    async getByLocationCode(req: FastifyRequest, reply: FastifyReply) {

        try {
            let include = req.query.include ?? "";
            include = [
                // {
                //     alias: "business",
                //     attributes: [],
                // },
                {
                    alias: "user",
                    attributes: [],
                }
            ]
            const locationCode = String(req.params.locationCode)
            const result = await locationService.getByLocationCode(
                locationCode,
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
            const result = await locationService.getByField(
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


    //Update location

    async update(req: FastifyRequest, reply: FastifyReply) {

        try {

            const locationCode = String(req.params.locationCode);

            const data = await locationService.update(
                locationCode,
                req.body,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "location updated successfully",
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
            const locationCode = String(req.params.locationCode)
            const data = req.body
            console.log(data)
            await locationService.deactivate(
                locationCode,
                data,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "location deactivated",
                data,
            });


        }catch(err){
            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }

    //  DELETE location
    async delete(req: FastifyRequest, reply: FastifyReply) {

        try {
            const locationCode = String(req.params.locationCode)

            await locationService.delete(
                locationCode,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "location permanently deleted"
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }
}

export default  new locationController();