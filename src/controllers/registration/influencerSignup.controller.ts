import influencerSignupService from "../../services/registration/influencerSignup.service";
import onboardingService from "../../services/registration/onboarding.service.js";
import {validateInfluencerApplication, validateInfluencerBasicInfoRegistration} from "../../utils/validator.js";
import {verifySignupToken} from "../../utils/signupToken.js";
import {FastifyReply, FastifyRequest} from "fastify";
import * as repl from "node:repl";


class InfluencerSignupController {


    // Step 1
    async basicInfo(req: FastifyRequest, reply: FastifyReply){

        const data = req.body;

        // console.log(data)

        validateInfluencerBasicInfoRegistration(data)

        const result = await influencerSignupService.basicInfo(data);

        return reply.send({
            success:true,
            data:result
        });


    }

    // Step 2
    async connectInstagram(req: FastifyRequest,reply: FastifyReply) {

        try{
            const result = await influencerSignupService.connectInstagram(req.body);


            return reply.send({

                success: true,

                data: result

            });

        }catch(err){
            return reply.code(400).send({
                success: false,
                message: err.message
            });
        }

    }

    // Step 3
    async uploadVerification(req: FastifyRequest,   reply: FastifyReply){

        try{

            const { signupToken } = req.query as any

            const token = verifySignupToken(signupToken);
            const userCode = token.userCode;
            const file = await req.file();

            if (!file) {
                throw new Error("Verification image required");
            }

            const result = await influencerSignupService.uploadVerification(userCode, file);

            return reply.send({
                success:true,
                data:result
            });

        }catch(err){
            return reply.code(400).send({
                success: false,
                message: err.message
            });
        }

    }

//     Step 4 Complete Profile
    async profile(req: FastifyRequest,  reply: FastifyReply){

        try{

            const { signupToken } = req.query as any

            const token = verifySignupToken(signupToken);
            const userCode = token.userCode;
            const data = req.body;
            // console.log(userCode, data);

            const result = await influencerSignupService.profile(userCode, data);

            return reply.send({
                success:true,
                data:result

            });

        }catch(err){
            return reply.code(400).send({
                success: false,
                message: err.message
            });
        }

    }

//     Step 5: upload portfolio Images
    async portfolio(req: FastifyRequest,reply: FastifyReply){

        try{

            const { signupToken } = req.query as any

            const token = verifySignupToken(signupToken);
            const userCode = token.userCode;

            const uploadedFiles=[];

            //
            for await(const file of req.files()){
                // console.log("file received:", file);
                if (!file.mimetype.startsWith("image/")) {
                    throw new Error(
                        `${file.filename} is not an image`
                    );
                }
                const buffer = await file.toBuffer();

                uploadedFiles.push({
                    filename: file.filename,
                    mimetype: file.mimetype,
                    buffer
                });
            }
            //
            // console.log(userCode, uploadedFiles)

            const result = await influencerSignupService.portfolio(userCode, uploadedFiles);

            return reply.send({

                success:true,

                data:result

            });

        }catch(err){
            return reply.code(400).send({
                success: false,
                message: err.message
            });
        }
    }

//     Resume status
    async status(req: FastifyRequest,reply: FastifyReply){

        const result = await onboardingService.getByUserCode(req.user.userCode);

        return reply.send({
            success:true,
            data:result

        });
    }


    // Influencer Registration through Website
    async registerInfluencer(req: FastifyRequest, reply: FastifyReply){
        try{

            const data = req.body;

            validateInfluencerApplication(data)

            const result = await influencerSignupService.registerInfluencer(data);

            return reply.send({
                success: true,
                data: result
            })

        }catch(err){
            return reply.code(400).send({
                success: false,
                message: err.message
            })
        }
    }


}
export default new InfluencerSignupController();