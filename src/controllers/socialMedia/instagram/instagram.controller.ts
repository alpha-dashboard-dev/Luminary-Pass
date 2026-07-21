import {FastifyRequest, FastifyReply} from "fastify";

import instagramService from "../../../services/socialMedia/instagram/instagram.service.js";
import socialLoginService from "../../../services/socialMedia/socialLogin.service.js";
import {verifySignupToken} from "../../../utils/signupToken.js";
import influencerSignupService from "../../../services/registration/influencerSignup.service.js";



class InstagramController {

    // async login(req:FastifyRequest, reply:FastifyReply){
    //
    //     const url = instagramService.getLoginUrl();
    //     // console.log(url);
    //     return reply.redirect(url);
    // }

    // Instagram Login from Frontend
    async login(req: FastifyRequest, reply: FastifyReply) {

        // const auth = req.headers.authorization;
        //
        // if (!auth) {
        //     throw new Error("Unauthorized");
        // }
        //
        // const token = auth.replace("Bearer ", "");
        const { signupToken } = req.query as {
            signupToken: string
        };

        if (!signupToken) {
            throw new Error("Signup token required");
        }


        const payload = verifySignupToken(signupToken);

        const url = instagramService.getLoginUrl(signupToken);

        return reply.redirect(url);

    }

    async callback(req:FastifyRequest, reply:FastifyReply){

        const {code, state} = req.query as any;
        // console.log("INSTAGRAM CODE:", code);

        const signup = verifySignupToken(state);
        const userCode = signup.userCode;
        const token = await instagramService.exchangeCode(code);

        await influencerSignupService.connectInstagram({
            userCode,
            providerUserId: token.user_id,
            accessToken: token.access_token,
        })

        // console.log(token);
        // const longToken = await instagramService.getLongLivedToken(token.access_token);
        return reply.send({
            message: "Instagram connected",
            // token: longToken
            access_token: token.access_token,
            user_id: token.user_id

        });

    }


    // async callback(req:FastifyRequest, reply:FastifyReply){
    //
    //     const {code} = req.query as { code:string };
    //     // console.log("INSTAGRAM CODE:", code);
    //     const token = await instagramService.exchangeCode(code);
    //
    //     const data = {
    //         provider: "instagram",
    //         providerUserId: token.user_id,
    //         accessToken: token.access_token,
    //         userCode: "F2ACF446"
    //     };
    //
    //     await socialLoginService.create(data)
    //
    //     // console.log(token);
    //     // const longToken = await instagramService.getLongLivedToken(token.access_token);
    //     return reply.send({
    //         message: "Instagram connected",
    //         // token: longToken
    //         access_token: token.access_token,
    //         user_id: token.user_id
    //
    //     });
    //
    // }

    async profile(req:FastifyRequest, reply:FastifyReply){

        const {userCode, fields} = req.query as any;

        // console.log(fieldArray);
        const profile = await instagramService.getProfile(userCode, fields);

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

            const { userCode, fields, limit } = req.query as any;
            const media = await instagramService.getMedia(userCode, fields, limit);

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

            const { userCode, fields, limit } = req.query as any;

            const dashboard = await instagramService.getDashboard(userCode, fields, limit);

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

}


export default new InstagramController();