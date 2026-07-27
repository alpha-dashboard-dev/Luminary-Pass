import { FastifyReply, FastifyRequest } from "fastify";
import influencerService from "../../services/influencer/influencer.service";
import {validateInfluencer} from "../../utils/validator.js";


class InfluencerController {

    async create(req: FastifyRequest, reply: FastifyReply) {

        try{
            const data = req.body;
            validateInfluencer(data)
            const result =  await influencerService.create(
                data,
                req.user
            )
            return reply.status(200).send({
                success: true,
                message: "influencer created successfully",
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
                    alias: "user",
                    attributes: [],
                },
            ]
            // console.log(include)
            const data =
                await influencerService.getAll(
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

    // Get by influencer code
    async getByInfluencerCode(req: FastifyRequest, reply: FastifyReply) {

        try {
            let include = req.query.include ?? "";
            include = [
                {
                    alias: "user",
                    attributes: [],
                },
            ]
            const influencerCode = String(req.params.influencerCode)
            const result = await influencerService.getByInfluencerCode(
                influencerCode,
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
                    alias: "user",
                    attributes: [],
                },
            ]
            const where = {...req.query};
            const result = await influencerService.getByField(
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


    //Update influencer

    async update(req: FastifyRequest, reply: FastifyReply) {

        try {

            const influencerCode = String(req.params.influencerCode);

            const data = await influencerService.update(
                influencerCode,
                req.body,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "influencer updated successfully",
                data,
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message,
            });
        }
    }

    //  DELETE influencer
    async delete(req: FastifyRequest, reply: FastifyReply) {

        try {
            const influencerCode = String(req.params.influencerCode)

            await influencerService.delete(
                influencerCode,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "influencer permanently deleted"
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }


//     see event invitations
    async findEventInvitation(req: FastifyRequest, reply: FastifyReply) {

        try {
            const influencerCode = String(req.params.influencerCode)
            const result = await influencerService.findEventInvitation(influencerCode);

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


    async submitEventTask(req: FastifyRequest, reply: FastifyReply) {

        try{

            const taskCode = String(req.params.taskCode)
            const data = req.body

            // console.log(req.user)

            const result = await influencerService.submitEventTask(
                taskCode,
                data,
                req.user
            )
            return reply.status(200).send({
                success: true,
                result,
            });

        } catch(err: any) {
            return reply.status(404).send({
                success: false,
                message: err.message,
            })
        }
    }


    async selectPostsAgainstEvent(req: FastifyRequest, reply: FastifyReply) {

        try {

            const { eventCode } = req.params as any;

            const result = await influencerService.selectPostsAgainstEvent(
                    eventCode,
                    req.user
                );

            return reply.send({
                success: true,
                data: result
            });

        } catch (err: any) {

            return reply.code(400).send({
                success: false,
                message: err.message
            });

        }

    }

    async submitSelectedPosts(req: FastifyRequest, reply: FastifyReply) {

        try {

            const { eventCode } = req.params as any;

            const { mediaIds } = req.body as any;

            // console.log(mediaIds);

            const result = await influencerService.submitSelectedPosts(
                    eventCode,
                    mediaIds,
                    req.user
                );

            return reply.send({
                success: true,
                data: result
            });

        } catch (err: any) {

            return reply.code(400).send({
                success: false,
                message: err.message
            });

        }

    }

}

export default  new InfluencerController();