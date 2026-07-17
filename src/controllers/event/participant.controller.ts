import { FastifyReply, FastifyRequest } from "fastify";
import participantService from "../../services/event/participant.service";
import {validateEventParticipant} from "../../utils/validator.js";

class participantController {

    async create(req: FastifyRequest, reply: FastifyReply) {

        try{
            const data = req.body;
            validateEventParticipant(data)
            const result =  await participantService.create(
                data,
                req.user
            )
            return reply.status(200).send({
                success: true,
                message: "participant created successfully",
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
                    alias: "eventParticipant",
                    attributes: [],
                },
                {
                    alias: "influencerParticipant",
                    attributes: [],
                },
            ]
            // console.log(include)
            const data =
                await participantService.getAll(
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

    // Get by participant code
    async getByParticipantCode(req: FastifyRequest, reply: FastifyReply) {

        try {
            let include = req.query.include ?? "";
            include = [
                {
                    alias: "creator",
                    attributes: [],
                },
            ]
            const participantCode = String(req.params.participantCode)
            const result = await participantService.getByParticipantCode(
                participantCode,
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
            const result = await participantService.getByField(
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


    //Update participant

    async update(req: FastifyRequest, reply: FastifyReply) {

        try {

            const participantCode = String(req.params.participantCode);

            const data = await participantService.update(
                participantCode,
                req.body,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "participant updated successfully",
                data,
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message,
            });
        }
    }

    //  DELETE participant
    async delete(req: FastifyRequest, reply: FastifyReply) {

        try {
            const participantCode = String(req.params.participantCode)

            await participantService.delete(
                participantCode,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "participant permanently deleted"
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }
}

export default  new participantController();