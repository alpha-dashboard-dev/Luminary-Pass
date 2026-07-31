import {FastifyReply, FastifyRequest} from "fastify";
import participantChecklistMediaService from "../../services/event/participantchecklistMedia.service.js";


class ParticipantChecklistController {

    async remarkMediaAgainstEvent(req: FastifyRequest, reply: FastifyReply) {

        try {

            const { participantChecklistMediaCode } = req.params as any;

            const result = await participantChecklistMediaService.remarkMediaAgainstEvent(

                    participantChecklistMediaCode,

                    req.body,

                    req.user

                );

            return reply.send({

                success: true,

                data: result

            });

        } catch (error: any) {

            return reply.code(400).send({

                success: false,

                message: error.message

            });

        }

    }

    async getSubmittedMedia(req: FastifyRequest, reply: FastifyReply) {
        try{
            const participantChecklistCode = String(req.params.participantChecklistCode)
            const result =  await participantChecklistMediaService.getSubmittedMedia(
                participantChecklistCode,
                req.user
            )

            return reply.status(200).send({
                success: true,
                message: "Remark submitted successfully",
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



}

export default new ParticipantChecklistController();