import { FastifyRequest, FastifyReply } from "fastify";
import facebookService from "../../../services/socialMedia/facebook/facebook.service.js";
import {validateBadge} from "../../../utils/validator.js";
import badgeService from "../../../services/badge/badge.service.js";

class facebookController{

    async login(req:FastifyRequest, reply:FastifyReply){

        const url = facebookService.getFacebookLoginUrl();
        // console.log(url);
        return reply.redirect(url);
    }

    async callback(req:FastifyRequest, reply:FastifyReply){

        try{

            const { code }=req.query as { code:string };
            const token = await facebookService.exchangeFacebookCode(code);
            const account = await facebookService.getInstagramBusinessAccount(token.access_token);
            return reply.send({
                success:true,
                facebookToken: token.access_token,
                account

            });


        }catch(error:any){

            return reply.code(400).send({
                success:false,
                message:error.message
            });

        }

    }

    async getPages(req:FastifyRequest, reply:FastifyReply){

        const {token} = req.query as any;
        // console.log(token)
        const pages = await facebookService.getPages(token);

        return reply.send(pages);

    }

    async getInstagramAccount(req: FastifyRequest, reply:FastifyReply ){

        const {token} = req.query as any;

        const account = await facebookService.getInstagramBusinessAccount(token)

        return reply.send(account)

    }

    async getMedia(req:FastifyRequest, reply:FastifyReply){

        try{
                const { accessToken, instagramId } = req.query as any;

                const media = await facebookService.getMedia(instagramId, accessToken);

                return reply.status(200).send({
                    success: true,
                    // message: "Get Media from Instagram",
                    media
                });
        }
        catch (err: any) {
            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }

    async mediaInsights(request:FastifyRequest, reply:FastifyReply){

        try{
            const {mediaId, mediaType, metrics, accessToken, metricType} = request.query as any;

            const data = await facebookService.getMediaInsights(mediaId, mediaType, metrics, accessToken, metricType);

            return reply.send(data);

        }catch(err: any){
            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }

    }


    // async mediaInsights(request:FastifyRequest, reply:FastifyReply){
    //
    //     try{
    //         const {mediaId, mediaType, accessToken} :any = request.query;
    //
    //
    //
    //         const data = await facebookService.getMediaInsights(
    //             mediaId,
    //             mediaType,
    //             accessToken
    //         );
    //
    //         return reply.send(data);
    //
    //     }catch(err: any){
    //         return reply.status(400).send({
    //             success: false,
    //             message: err.message
    //         });
    //     }
    //
    // }

    async getAllMediaInsights(req:FastifyRequest, reply:FastifyReply){
        try{

            const { accessToken, instagramId } = req.query as any;

            const mediaInsights = await facebookService.getAllMediaInsights(instagramId, accessToken);

            return reply.status(200).send({
                success: true,
                // message: "Get Media from Instagram",
                mediaInsights
            });

        }catch(err: any){
            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }


    async accountInsights(request:FastifyRequest, reply:FastifyReply){

        const {instagramId, accessToken} :any = request.query;

        // console.log(instagramId, accessToken);

        const data = await facebookService.getAccountInsights(
                instagramId,
                accessToken
            );


        return reply.send(data);

    }

    async getReachInsights(request:FastifyRequest, reply:FastifyReply){

        const {instagramId, accessToken} :any = request.query;

        // console.log(instagramId, accessToken);

        const data = await facebookService.getReachInsights(
            instagramId,
            accessToken
        );


        return reply.send(data);

    }

    async getEngagementInsights(request:FastifyRequest, reply:FastifyReply){

        const {instagramId, accessToken} :any = request.query;

        // console.log(instagramId, accessToken);

        const data = await facebookService.getEngagementInsights(
            instagramId,
            accessToken
        );


        return reply.send(data);

    }

    async getEngagementInsightsByContentType(req:FastifyRequest, reply:FastifyReply){

        try{

            const { accessToken, instagramId } : any = req.query;

            const engagement = await facebookService.getEngagementByType(instagramId, accessToken);

            return reply.status(200).send({
                success: true,
                engagement
            });

        }catch(err: any){
            return reply.code(400).send({
                success: false,
                message: err.message
            })
        }
    }


}


export default new facebookController;