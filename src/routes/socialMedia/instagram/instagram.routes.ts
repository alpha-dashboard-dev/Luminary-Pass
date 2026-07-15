import {FastifyInstance} from "fastify";
import controller from "../../../controllers/socialMedia/instagram/instagram.controller.js";


export default async function instagramRoutes(fastify:FastifyInstance){


    fastify.get(
        "/login",
        controller.login
    );


    fastify.get(
        "/callback",
        controller.callback
    );


    fastify.get(
        "/profile",
        controller.profile
    );

    fastify.get(
        "/token-info",
        controller.tokenInfo
    );

    fastify.get(
        "/get-media",
        controller.getMedia
    )

    fastify.get(
        "/get-media-by-id",
        controller.getMediaById
    )

    fastify.get(
        "/dashboard",
        controller.dashboard
    )

    fastify.get(
        "/get-comments",
        controller.getComments
    )

    fastify.get(
        "/get-account-insights",
        controller.getAccountInsights
    )

}