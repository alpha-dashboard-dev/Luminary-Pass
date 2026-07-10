import {FastifyInstance} from "fastify";
import controller from "../../../controllers/socialMedia/instagram/instagram.controller.js";


export default async function instagramRoutes(
    fastify:FastifyInstance
){


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

}