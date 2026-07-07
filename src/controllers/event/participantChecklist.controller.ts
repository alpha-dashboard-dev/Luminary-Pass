import { FastifyReply, FastifyRequest } from "fastify";
import participantChecklistService from "../../services/event/participantChecklist.service";

class participantChecklistController {

    async create(req: FastifyRequest, reply: FastifyReply) {

        try{
            const data = req.body;
            // validateParticipant(data);
            const result =  await participantChecklistService.create(
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
                await participantChecklistService.getAll(
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
    async getByParticipantChecklistCode(req: FastifyRequest, reply: FastifyReply) {

        try {
            let include = req.query.include ?? "";
            include = [
                {
                    alias: "creator",
                    attributes: [],
                },
            ]
            const participantCode = String(req.params.participantCode)
            const result = await participantChecklistService.getByParticipantChecklistCode(
                participantCode,
                {
                    ...req.query,
                    include
                },
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
            const result = await participantChecklistService.getByField(
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

            const data = await participantChecklistService.update(
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

            await participantChecklistService.delete(
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

export default  new participantChecklistController();