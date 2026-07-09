import { FastifyReply, FastifyRequest } from "fastify";
import socialLoginService from "../../services/socialLogin/socialLogin.service";

class socialLoginController {

    async create(req: FastifyRequest, reply: FastifyReply) {

        try{
            const data = req.body;
            const result =  await socialLoginService.create(
                data,
                req.user
            )
            return reply.status(200).send({
                success: true,
                message: "socialLogin created successfully",
                data: result
            });
        }
        catch (err: any) {
            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }

    async getAll(req: FastifyRequest, reply: FastifyReply) {

        try {
            let include = req.query.include ?? "";
            include = [
            ]
            // console.log(include)
            const data =
                await socialLoginService.getAll(
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

    // Get by socialLogin code
    async getBySocialLoginCode(req: FastifyRequest, reply: FastifyReply) {

        try {
            let include = req.query.include ?? "";
            include = [
            ]
            const socialLoginCode = String(req.params.socialLoginCode)
            const result = await socialLoginService.getBySocialLoginCode(
                socialLoginCode,
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

    // Get By Any Field
    async getByField(req: FastifyRequest, reply: FastifyReply) {

        try {
            let include = req.query.include ?? "";
            include = [
            ]
            const where = {...req.query};
            const result = await socialLoginService.getByField(
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


    //Update socialLogin

    async update(req: FastifyRequest, reply: FastifyReply) {

        try {

            const socialLoginCode = String(req.params.socialLoginCode);

            const data = await socialLoginService.update(
                socialLoginCode,
                req.body,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "socialLogin updated successfully",
                data,
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message,
            });
        }
    }

    //  DELETE socialLogin
    async delete(req: FastifyRequest, reply: FastifyReply) {

        try {
            const socialLoginCode = String(req.params.socialLoginCode)

            await socialLoginService.delete(
                socialLoginCode,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "socialLogin permanently deleted"
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }
}

export default new socialLoginController();