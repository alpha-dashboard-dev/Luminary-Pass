import { FastifyReply, FastifyRequest } from "fastify";
import businessService from "../../services/business/business.service";
import {validateBusiness, validateBusinessAccountRegistration} from "../../utils/validator.js";
import {ApiResponse} from "../../utils/response.js";

class businessController {


    // Business Registration
    async registerBusiness(req: FastifyRequest, reply: FastifyReply) {

        try {

            const  data = req.body as any;

            validateBusinessAccountRegistration(data)

            const result = await businessService.registerBusiness(data);

            return reply.status(200).send({
                success: true,
                message: "Business Registration successful!!",
                data: result
            });

        } catch (err: any) {

            return reply.status(401).send({
                success: false,
                message: err.message
            });

        }
    }

    async verifyEmail(request: FastifyRequest, reply: FastifyReply) {

        const { token } = request.query as { token: string };


        await businessService.verifyEmail(token);


        return reply.type("text/html").send(`
        <html>
            <body style="font-family:Arial;text-align:center;padding-top:80px">

                <h1>✅ Email Verified</h1>

                <p>
                    Your email has been verified successfully.
                </p>

                <p>
                    You can continue completing your business setup.
                </p>

            </body>
        </html>
    `);
    }


    async resendVerificationEmail(request: FastifyRequest, reply: FastifyReply) {
        const { email } = request.body as {
            email: string;
        };

        await businessService.resendVerificationEmail(email);

        return reply.send({
            success: true,
            message: "Verification email sent successfully",
        });
    }

    // async updateBusinessOwnerProfile(req: FastifyRequest, reply: FastifyReply) {
    //
    //     try{
    //         const data = req.body
    //
    //         await businessService.updateBusinessOwnerProfile(data)
    //
    //         return reply.send({
    //             success: true,
    //             message: "Business Owner Password Creation"
    //         })
    //
    //     }catch(err){
    //         return reply.status(400).send({
    //             success: false,
    //             message: err.message
    //         })
    //     }
    // }

    // async create(req: FastifyRequest, reply: FastifyReply) {
    //
    //     try{
    //         const data = req.body;
    //         validateBusiness(data);
    //         const result =  await businessService.create(
    //             data,
    //             req.user
    //         )
    //         return reply.status(200).send({
    //             success: true,
    //             message: "Business created successfully",
    //             data: result
    //         });
    //     }
    //     catch (err: any) {
    //         return reply.status(400).send({
    //             success: false,
    //             message: err.message
    //         });
    //     }
    // }

    async getAll(req: FastifyRequest, reply: FastifyReply) {

        try {
            let include = req.query.include ?? "";
            include = [
                // {
                //     alias: "owner",
                //     attributes: [],
                // },
                {
                    alias: "users",
                    attributes: [],
                },
            ]
            // console.log(include)
            const data =
                await businessService.getAll(
                    {
                        ...req.query,
                        include
                    },
                    req.user
                );

            return reply.status(200).send({
                success: true,
                data,
            });

        } catch (err: any) {
            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }

    // Get by business code
    async getByBusinessCode(req: FastifyRequest, reply: FastifyReply) {

        try {
            let include = req.query.include ?? "";
            include = [
                {
                    alias: "users",
                    attributes: [],
                },
            ]
            const businessCode = String(req.params.businessCode)
            const result = await businessService.getByBusinessCode(
                businessCode,
                {
                    ...req.query,
                    include
                },
                req.user,
            );

            return reply.status(200).send({
                success: true,
                result,
            });

        } catch (err: any) {

            return reply.status(404).send({
                success: false,
                message: err.message,
            });
        }
    }

    // Get Business By Any Field
    async getByField(req: FastifyRequest, reply: FastifyReply) {

        try {
            let include = req.query.include ?? "";
            include = [
                {
                    alias: "users",
                    attributes: [],
                },
            ]
            const where = {...req.query};
            const result = await businessService.getByField(
                where,
                {
                    ...req.query,
                    include
                },
                req.user,
            );

            return reply.status(200).send({
                success: true,
                result,
            });

        } catch (err: any) {

            return reply.status(404).send({
                success: false,
                message: err.message,
            });
        }
    }


    //Update Business

    async update(req: FastifyRequest, reply: FastifyReply) {

        try {

            const businessCode = String(req.params.businessCode);

            const data = await businessService.update(
                businessCode,
                req.body,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "business updated successfully",
                data,
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message,
            });
        }
    }

    // Deactivate Business
    async deactivate(req: FastifyRequest, reply: FastifyReply) {
        try{
            const businessCode = String(req.params.businessCode)
            const data = req.body
            // console.log(data)
            await businessService.deactivate(
                businessCode,
                data,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "Business deactivated",
                data,
            });


        }catch(err){
            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }

    //  Delete Business
    async delete(req: FastifyRequest, reply: FastifyReply) {

        try {
            const businessCode = String(req.params.businessCode)

            await businessService.delete(
                businessCode,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "Business permanently deleted"
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }


    //    Invite Team Member

    async inviteTeamMember(req: FastifyRequest, reply: FastifyReply){
        try{

            const data = req.body

            const result = await businessService.inviteTeamMember(data, req.user);

            return ApiResponse.success(
                reply,
                result,
                "Invitation send to team member",
                200
            )

        }catch(err: any){
            return ApiResponse.error(
                reply,
                err.message,
                400,
                err
            )
        }
    }

}

export default  new businessController();