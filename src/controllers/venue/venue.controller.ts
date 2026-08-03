import { FastifyReply, FastifyRequest } from "fastify";
import venueService from "../../services/venue/venue.service";
import {validateVenue, validateVenueProfileUpdate} from "../../utils/validator.js";
import {ApiResponse} from "../../utils/response.js";

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


    // update venue profile
    async updateVenueProfile(req: FastifyRequest, reply: FastifyReply) {
        try{

            const venueCode = String(req.params.venueCode)
            const parts = req.parts();

            let basicInfo = null;
            let locationContact = null;
            let socialMedia = null;
            let schedule = null;
            let deletedImages = null;
            const files = [];

            for await (const part of parts) {
                if (part.type === "file") {
                    // files.push(part);
                    if (!part.mimetype.startsWith("image/")) {
                        throw new Error(`${part.filename} is not an image`);
                    }
                    const buffer = await part.toBuffer();

                    files.push({
                        filename: part.filename,
                        mimetype: part.mimetype,
                        buffer
                    });
                } else {
                    switch (part.fieldname) {
                        case "basicInfo":
                            basicInfo = JSON.parse(part.value);
                            break;

                        case "locationContact":
                            locationContact = JSON.parse(part.value);
                            break;

                        case "socialMedia":
                            socialMedia = JSON.parse(part.value);
                            break;

                        case "schedule":
                            schedule = JSON.parse(part.value);
                            break;

                        case "deletedImages":
                            deletedImages = JSON.parse(part.value);
                            break;
                    }
                }
            }

            const payload = {basicInfo, locationContact, socialMedia, schedule, deletedImages};

            validateVenueProfileUpdate(payload);

           // console.log(basicInfo, locationContact, socialMedia, schedule)

            const result =  await venueService.updateVenueProfile(
                venueCode,
                payload,
                // {
                //     basicInfo,
                //     locationContact,
                //     socialMedia,
                //     schedule,
                //     deletedImages,
                // },
                files,
                req.user
            )
            return ApiResponse.success(
                reply,
                result,
                "Venue Profile updated successfully",
                200
            )
        }
        catch (err: any) {
            return ApiResponse.error(reply, err.message, 400, err,);
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

            const result = await venueService.delete(
                venueCode,
                req.user
            );

            return ApiResponse.success(
                reply,
                result,
                "Account Activated successfully",
                200
            )


        } catch (err: any) {

            return ApiResponse.error(reply, err.message, 400, err,);
        }
    }
}

export default  new VenueController();