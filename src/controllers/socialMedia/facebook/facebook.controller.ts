import { FastifyRequest, FastifyReply } from "fastify";
import facebookService from "../../../services/socialMedia/facebook/facebook.service.js";

import {validateAccountInsights} from "../../../utils/socialAccount/instagramValidator.js";
import {validateGetMedia, validateAllMediaInsights} from "../../../utils/socialAccount/instagram/validator.js";

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
            const data = req.body as any;

            validateGetMedia(data)
            const media = await facebookService.getMedia(data);
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

    async getMediaInsights(req:FastifyRequest, reply:FastifyReply){

        try{

            const {mediaId, metrics, pageAccessToken} = req.body as any;

            const result = await facebookService.getMediaInsights(mediaId, metrics, pageAccessToken);

            return reply.send({
                success:true,
                result
            });

        }catch(error:any){

            return reply.code(400).send({
                success:false,
                message:error.message
            });

        }

    }

    async getAllMediaInsights(req:FastifyRequest, reply:FastifyReply){

        try{

            const data = req.body as any;
            validateAllMediaInsights(data)
            const result = await facebookService.getAllMediaInsights(data);
            return reply.send({
                success:true,
                result
            });


        }catch(error:any){

            return reply.code(400).send({
                success:false,
                message:error.message

            });

        }

    }

    async getAccountInsights(req: FastifyRequest, reply: FastifyReply) {

        try {
            const data = req.body as any
            // console.log(data);

            validateAccountInsights(data);

            const result = await facebookService.getAccountInsights(data);

            return reply.send({
                success: true,
                result
            });

        } catch (error: any) {

            return reply.code(400).send({
                success: false,
                message: error.message
            });

        }

    }


    async getReachInsights(req:FastifyRequest, reply:FastifyReply){

        try {

            const data = req.body as any
            // console.log(data);

            const result = await facebookService.getReachInsights(data);

            return reply.send({
                success: true,
                result
            });

        } catch (error: any) {

            return reply.code(400).send({
                success: false,
                message: error.message
            });

        }
    }

    async getEngagementInsights(req:FastifyRequest, reply:FastifyReply){

        try {

            const data = req.body as any
            // console.log(data);

            const result = await facebookService.getEngagementInsights(data);

            return reply.send({
                success: true,
                result
            });

        } catch (error: any) {

            return reply.code(400).send({
                success: false,
                message: error.message
            });

        }
    }

    async getEngagementInsightsByContentType(req:FastifyRequest, reply:FastifyReply){

        try{
            const data = req.body as any;

            const result = await facebookService.getEngagementInsightsByContentType(data);

            return reply.send({
                success:true,
                result

            });
        }
        catch(error:any){

            return reply.code(400).send({
                success:false,
                message:error.message

            });


        }

    }


}


export default new facebookController;