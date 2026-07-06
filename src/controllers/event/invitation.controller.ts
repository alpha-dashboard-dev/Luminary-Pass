import { FastifyReply, FastifyRequest } from "fastify";
import invitationService from "../../services/event/invitation.service";

class invitationController {

    async create(req: FastifyRequest, reply: FastifyReply) {

        try{
            const data = req.body;
            // validateinvitation(data);
            const result =  await invitationService.create(
                data,
                req.user
            )
            return reply.status(200).send({
                success: true,
                message: "invitation created successfully",
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
                    alias: "eventInvitation",
                    attributes: [],
                },
                {
                    alias: "influencerInvitation",
                    attributes: [],
                },
                // {
                //     alias: "inviter",
                //     attributes: [],
                // }
            ]
            // console.log(include)
            const data =
                await invitationService.getAll(
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

    // Get by invitation code
    async getByInvitationCode(req: FastifyRequest, reply: FastifyReply) {

        try {
            let include = req.query.include ?? "";
            include = [
                {
                    alias: "eventInvitation",
                    attributes: [],
                },
                {
                    alias: "influencerInvitation",
                    attributes: [],
                },
                {
                    alias: "inviter",
                    attributes: [],
                }
            ]
            const invitationCode = String(req.params.invitationCode)
            const result = await invitationService.getByInvitationCode(
                invitationCode,
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
                    alias: "eventInvitation",
                    attributes: [],
                },
                {
                    alias: "influencerInvitation",
                    attributes: [],
                },
                {
                    alias: "inviter",
                    attributes: [],
                }
            ]
            const where = {...req.query};
            const result = await invitationService.getByField(
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


    //Update invitation

    async update(req: FastifyRequest, reply: FastifyReply) {

        try {

            const invitationCode = String(req.params.invitationCode);

            const data = await invitationService.update(
                invitationCode,
                req.body,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "invitation updated successfully",
                data,
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message,
            });
        }
    }

    //  DELETE invitation
    async delete(req: FastifyRequest, reply: FastifyReply) {

        try {
            const invitationCode = String(req.params.invitationCode)

            await invitationService.delete(
                invitationCode,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "invitation permanently deleted"
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }
}

export default  new invitationController();