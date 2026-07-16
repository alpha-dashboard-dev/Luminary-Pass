import {FastifyInstance} from "fastify";
import controller from "../../../controllers/socialMedia/facebook/facebook.controller";


export default async function facebookRoutes(fastify:FastifyInstance){


    fastify.get(
        "/login",
        controller.login
    );


    fastify.get(
        "/callback",
        controller.callback
    );


    fastify.get(
        "/get-pages",
        controller.getPages
    );

    fastify.get(
        "/get-instagram-business-account",
        controller.getInstagramAccount
    )

    fastify.post(
        "/get-instagram-media",
        controller.getMedia
    )


    fastify.post(
        "/get-media-insights",
        controller.getMediaInsights
    )

    fastify.post(
        "/get-all-media-insights",
        controller.getAllMediaInsights
    )


    fastify.post(
        "/get-reach-insights",
        controller.getReachInsights
    )

    fastify.post(
        "/get-engagement-insights",
        controller.getEngagementInsights
    )

    fastify.post(
        "/get-engagement-insights-by-content",
        controller.getEngagementInsightsByContentType
    )

    fastify.post(
        "/get-account-insights",
        controller.getAccountInsights
    )

}