import { FastifyReply, FastifyRequest } from "fastify";
import settingService from "../../services/setting/setting.service";

class settingController {

    async create(req: FastifyRequest, reply: FastifyReply) {

        try{
            const data = req.body;
            console.log(data);
            // validateSetting(data);
            const result =  await settingService.create(
                data,
                req.user
            )
            return reply.status(200).send({
                success: true,
                message: "setting created successfully",
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
                await settingService.getAll(
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

    // Get by setting code
    async getBySettingCode(req: FastifyRequest, reply: FastifyReply) {

        try {
            let include = req.query.include ?? "";
            include = [
            ]
            const settingCode = String(req.params.settingCode)
            const result = await settingService.getBySettingCode(
                settingCode,
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
            const result = await settingService.getByField(
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


    //Update setting

    async update(req: FastifyRequest, reply: FastifyReply) {

        try {

            const settingCode = String(req.params.settingCode);

            const data = await settingService.update(
                settingCode,
                req.body,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "setting updated successfully",
                data,
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message,
            });
        }
    }

    async deactivate(req: FastifyRequest, reply: FastifyReply) {
        try{
            const settingCode = String(req.params.settingCode)
            const data = req.body
            console.log(data)
            await settingService.deactivate(
                settingCode,
                data,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "setting deactivated",
                data,
            });


        }catch(err){
            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }

    //  DELETE setting
    async delete(req: FastifyRequest, reply: FastifyReply) {

        try {
            const settingCode = String(req.params.settingCode)

            await settingService.delete(
                settingCode,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "setting permanently deleted"
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }
}

export default new settingController();