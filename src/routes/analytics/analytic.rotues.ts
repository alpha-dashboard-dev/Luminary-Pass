import {FastifyInstance} from "fastify";
import {authenticate} from "../../middleware/authenticate.js";
import {hasPermission} from "../../middleware/hasPermission.js";
import analyticController from "../../controllers/analytics/analytic.controller.js";


export default async function analyticRoutes(fastify: FastifyInstance) {
    fastify.get(
        "/get-total-events-by-business",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00037", "PER00038", "PER00039", "PER00040"],
                    false
                )
            ]
        },
        analyticController.getTotalEventCount,
    )

    fastify.get(
        "/get-total-influencers",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00037", "PER00038", "PER00039", "PER00040"],
                    false
                )
            ]
        },
        analyticController.getTotalInfluencers
    )

    fastify.get(
        "/get-total-event-completion-rate",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00037", "PER00038", "PER00039", "PER00040"],
                    false
                )
            ]
        },
        analyticController.getEventCompletionRate
    )

    fastify.get(
        "/get-average-rating",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00037", "PER00038", "PER00039", "PER00040"],
                    false
                )
            ]
        },
        analyticController.getAverageRating
    )

    fastify.get(
        "/average-rating-of-each-influencer",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00037", "PER00038", "PER00039", "PER00040"],
                    false
                )
            ]
        },
        analyticController.averageRatingOfEachInfluencer
    )

    fastify.get(
        "/events-overtime",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00037", "PER00038", "PER00039", "PER00040"],
                    false
                )
            ]
        },

        analyticController.getEventsOverTime
    )

    fastify.get(
        "/task-completion-rating",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00037", "PER00038", "PER00039", "PER00040"],
                    false
                )
            ]
        },
        analyticController.taskCompletionRating
    )

    fastify.get(
        "/get-summary",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00037", "PER00038", "PER00039", "PER00040"],
                    false
                )
            ]
        },
        analyticController.getSummary
    )

    fastify.get(
        "/get-dashboard",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00037", "PER00038", "PER00039", "PER00040"],
                    false
                )
            ]
        },
        analyticController.getDashboard
    )

    fastify.get(
        "/get-top-influencers",
        {
            preHandler: [
                authenticate,
                hasPermission(
                    ["PER00037", "PER00038", "PER00039", "PER00040"],
                    false
                )
            ]
        },

        analyticController.getTopInfluencers
    )
}