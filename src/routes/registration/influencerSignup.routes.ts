import controller from "../../controllers/registration/influencerSignup.controller"
import {authenticate} from "../../middleware/authenticate.js";
import {FastifyInstance} from "fastify";

export default async function signupRoutes(fastify: FastifyInstance){


    fastify.post(
        "/basic-info",
        controller.basicInfo
    );


    fastify.post(
        "/connect-instagram",
        controller.connectInstagram
    );

    fastify.post(
        "/upload-verification",
        controller.uploadVerification
    );

    fastify.put(
        "/profile",
        controller.profile
    );

    fastify.post(
        "/portfolio",
        {
            preHandler:[
                authenticate
            ]
        },
        controller.portfolio
    );

    fastify.get(
        "/status",
        {
            preHandler:[
                authenticate
            ]
        },
        controller.status
    );

}