import {FastifyRequest, FastifyReply} from "fastify";

import instagramService from "../../../services/socialMedia/instagram/instagram.service.js";



class InstagramController {

    async login(req:FastifyRequest, reply:FastifyReply){

        const url = instagramService.getLoginUrl();
        console.log(url);
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

    // async saveSocialLoginInfo(req:FastifyRequest, reply:FastifyReply)
    // }



}


export default new InstagramController();