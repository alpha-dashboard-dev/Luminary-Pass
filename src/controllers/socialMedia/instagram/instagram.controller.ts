import {FastifyRequest, FastifyReply} from "fastify";

import instagramService from "../../../services/socialMedia/instagram/instagram.service.js";



class InstagramController {

    async login(req:FastifyRequest, reply:FastifyReply){

        const url = instagramService.getLoginUrl();
        // console.log(url);
        return reply.redirect(url);
    }

    async callback(req:FastifyRequest, reply:FastifyReply){

        const {code} = req.query as { code:string };
        // console.log("INSTAGRAM CODE:", code);
        const token = await instagramService.exchangeCode(code);
        // const longToken = await instagramService.getLongLivedToken(token.access_token);
        return reply.send({
            message: "Instagram connected",
            // token: longToken
            access_token: token.access_token,
            user_id: token.user_id

        });


    }

    async profile(req:FastifyRequest, reply:FastifyReply){

        const {token} = req.query as any;
        // console.log(token)
        const profile = await instagramService.getProfile(token);

        return reply.send(profile);

    }

    async tokenInfo(req: FastifyRequest, reply: FastifyReply){

        const {accessToken} = req.query as { accessToken:string };
        // console.log(accessToken);
        const result = await instagramService.getLongLivedToken(accessToken);
        return reply.send(result);

    }

    async getMedia(req: FastifyRequest, reply: FastifyReply) {

        try {

            const { token } = req.query as any;

            const media =
                await instagramService.getMedia(token);

            return reply.send({

                success: true,

                data: media

            });

        }

        catch (error: any) {

            return reply.code(500).send({

                success: false,

                message: error.message

            });

        }

    }

    async getMediaById(req: FastifyRequest, reply: FastifyReply) {

        try {

            const {token, mediaId} = req.query as any;
            // console.log(mediaId, token);


            const media = await instagramService.getMediaById(mediaId, token);

            return reply.send({

                success: true,

                data: media

            });

        }

        catch (error: any) {

            return reply.code(500).send({

                success: false,

                message: error.message

            });

        }

    }

    async getComments(req: FastifyRequest, reply: FastifyReply) {

        try {

            const {token, mediaId} = req.query as any;
            // console.log(mediaId, token);


            const media = await instagramService.getComments(mediaId, token);

            return reply.send({

                success: true,

                data: media

            });

        }

        catch (error: any) {

            return reply.code(500).send({

                success: false,

                message: error.message

            });

        }

    }


    async dashboard(req: FastifyRequest, reply: FastifyReply) {

        try {

            const { token } = req.query as any;

            const dashboard = await instagramService.getDashboard(token);

            return reply.send({

                success: true,

                data: dashboard

            });

        }

        catch (error: any) {

            return reply.code(500).send({

                success: false,

                message: error.message

            });

        }

    }

    async disconnect(req: FastifyRequest, reply: FastifyReply) {

        try {

            const { userCode } = req.body as any;

            await instagramService.disconnect(userCode);

            return reply.send({

                success: true,

                message: "Instagram disconnected."

            });

        }

        catch (error: any) {

            return reply.code(500).send({

                success: false,

                message: error.message

            });

        }

    }


    async getAccountInsights(req: FastifyRequest, reply: FastifyReply) {
        try {

            const {token, instagramUserId} = req.query as any;
            // console.log(instagramUserId, token);


            const media = await instagramService.getAccountInsights(instagramUserId, token);

            return reply.send({

                success: true,

                data: media

            });

        }

        catch (error: any) {

            return reply.code(500).send({

                success: false,

                message: error.message

            });

        }


    }

    // async saveSocialLoginInfo(req:FastifyRequest, reply:FastifyReply)
    // }



}


export default new InstagramController();