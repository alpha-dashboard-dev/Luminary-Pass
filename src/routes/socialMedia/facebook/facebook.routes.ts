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


    fastify.get(
        "/get-media-insights",
        controller.mediaInsights
    )


    fastify.get(
        "/get-account-insights",
        controller.accountInsights
    )

    fastify.get(
        "/get-reach-insights",
        controller.getReachInsights
    )

    fastify.get(
        "/get-engagement-insights",
        controller.getEngagementInsights
    )

}