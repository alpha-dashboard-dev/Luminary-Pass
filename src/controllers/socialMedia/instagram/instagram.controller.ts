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



    // async publish(
    //     req:FastifyRequest,
    //     reply:FastifyReply
    // ){
    //
    //
    //     const body =
    //         req.body as any;
    //
    //
    //
    //     const result =
    //         await instagramService.publishPost(
    //
    //             body.userId,
    //
    //             body.imageUrl,
    //
    //             body.caption,
    //
    //             body.token
    //
    //         );
    //
    //
    //     return reply.send(result);
    //
    // }
    //
    //
    //
    //
    //
    //
    //
    // async verifyWebhook(
    //     req:FastifyRequest,
    //     reply:FastifyReply
    // ){
    //
    //
    //     const query =
    //         req.query as any;
    //
    //
    //
    //     const result =
    //         instagramService.verifyWebhook(
    //
    //             query["hub.mode"],
    //
    //             query["hub.verify_token"],
    //
    //             query["hub.challenge"]
    //
    //         );
    //
    //
    //
    //     return reply.send(result);
    //
    // }
    //
    //
    //
    //
    //
    //
    //
    // async webhook(
    //     req:FastifyRequest,
    //     reply:FastifyReply
    // ){
    //
    //
    //     await instagramService.handleWebhook(
    //         req.body
    //     );
    //
    //
    //     return reply.send({
    //         success:true
    //     });
    //
    // }


}


export default new InstagramController();