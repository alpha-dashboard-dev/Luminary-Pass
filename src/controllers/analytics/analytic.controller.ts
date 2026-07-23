import { FastifyReply, FastifyRequest } from "fastify";
import analyticService from "../../services/analytics/analytic.service.js";


class analyticController {

    async getTotalEventCount(req: FastifyRequest, reply: FastifyReply) {
        try {
                const result = await analyticService.getTotalEventCount(req.user);
                return reply.status(200).send({
                    success: true,
                    message: "Total Event Count",
                    data: result
                });

        } catch (err: any) {

            return reply.status(401).send({
                success: false,
                message: err.message
            });

        }
    }

    async getEventCompletionRate(req: FastifyRequest, reply: FastifyReply) {
        try {
            const result = await analyticService.getEventCompletionRate(req.user);
            return reply.status(200).send({
                success: true,
                message: "Total Event Completion Rate",
                data: result
            });

        } catch (err: any) {

            return reply.status(401).send({
                success: false,
                message: err.message
            });

        }
    }

    async getSummary(req: FastifyRequest, reply: FastifyReply) {
        try {
            const result = await analyticService.getSummary(req.user);
            return reply.status(200).send({
                success: true,
                message: "Analytics Summary",
                data: result
            });

        } catch (err: any) {

            return reply.status(401).send({
                success: false,
                message: err.message
            });

        }
    }

    async getDashboard(req: FastifyRequest, reply: FastifyReply) {
        try {
            const result = await analyticService.getDashboard(req.user);
            return reply.status(200).send({
                success: true,
                message: "Dashboard",
                data: result
            });

        } catch (err: any) {

            return reply.status(401).send({
                success: false,
                message: err.message
            });

        }
    }

    async getTotalInfluencers(req: FastifyRequest, reply: FastifyReply) {
        try {

            let include = req.query.include ?? "";
            include = [
                {
                    alias: "eventParticipant",
                    attributes: [],
                },
            ]
            const result = await analyticService.getTotalInfluencers(
                {
                    ...req.query,
                    include
                },
                req.user
            );
            return reply.status(200).send({
                success: true,
                message: "Total Influencers",
                data: result
            });

        } catch (err: any) {

            return reply.status(401).send({
                success: false,
                message: err.message
            });

        }
    }

    async getAverageRating(req: FastifyRequest, reply: FastifyReply) {
        try {

            let include = req.query.include ?? "";
            include = [
                {
                    alias: "event",
                    attributes: [],
                },
            ]
            const result = await analyticService.getAverageRating(
                {
                    ...req.query,
                    include
                },
                req.user
            );
            return reply.status(200).send({
                success: true,
                message: "Average Rating",
                data: result
            });

        } catch (err: any) {

            return reply.status(401).send({
                success: false,
                message: err.message
            });

        }
    }


    async averageRatingOfEachInfluencer(req: FastifyRequest, reply: FastifyReply) {
        try {

            let include = req.query.include ?? "";
            include = [
                {
                    alias: "event",
                    attributes: [],
                },
            ]
            const result = await analyticService.averageRatingOfEachInfluencer(
                {
                    ...req.query,
                    include
                },
                req.user
            );
            return reply.status(200).send({
                success: true,
                message: "Average Rating Of Each Influencer",
                data: result
            });

        } catch (err: any) {

            return reply.status(401).send({
                success: false,
                message: err.message
            });

        }
    }
    async taskCompletionRating(req: FastifyRequest, reply: FastifyReply) {
        try {

            let include = req.query.include ?? "";
            include = [
                {
                    alias: "participant",
                    attributes: [],
                },
                {
                    alias: "checklist",
                    attributes: [],
                },
            ]
            const result = await analyticService.taskCompletionRating(
                {
                    ...req.query,
                    include
                },
                req.user
            );
            return reply.status(200).send({
                success: true,
                message: "Average Rating",
                data: result
            });

        } catch (err: any) {

            return reply.status(401).send({
                success: false,
                message: err.message
            });

        }
    }

    async getEventsOverTime(req: FastifyRequest, reply: FastifyReply) {
        try {

            const result = await analyticService.getEventsOverTime(
                req.query,
                req.user
            );
            return reply.status(200).send({
                success: true,
                message: "Events Over Time",
                data: result
            });

        } catch (err: any) {

            return reply.status(401).send({
                success: false,
                message: err.message
            });

        }

    }

    async getTopInfluencers(req: FastifyRequest, reply: FastifyReply) {
        try {

            let include = req.query.include ?? "";
            include = [
                {
                    alias: "event",
                    attributes: [],
                },
            ]
            const result = await analyticService.getTopInfluencers(
                {
                    ...req.query,
                    include
                },
                req.user
            );
            return reply.status(200).send({
                success: true,
                message: "Events Over Time",
                data: result
            });

        } catch (err: any) {

            return reply.status(401).send({
                success: false,
                message: err.message
            });

        }

    }




}

export default new analyticController();