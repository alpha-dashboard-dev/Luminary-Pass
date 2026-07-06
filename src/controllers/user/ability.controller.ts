import { FastifyReply, FastifyRequest } from "fastify";
import abilityService from "../../services/user/ability.service";

class abilityController {

    async create(req: FastifyRequest, reply: FastifyReply) {

        try{
            const data = req.body;
            console.log(data);
            // validateability(data);
            const result =  await abilityService.create(
                data,
                req.ability
            )
            return reply.status(200).send({
                success: true,
                message: "ability created successfully",
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
                await abilityService.getAll(
                    {
                        ...req.query,
                        include
                    },
                    req.ability
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

    // Get by ability code
    async getByAbilityCode(req: FastifyRequest, reply: FastifyReply) {

        try {
            let include = req.query.include ?? "";
            include = [
            ]
            const abilityCode = String(req.params.abilityCode)
            console.log(abilityCode)
            const result = await abilityService.getByAbilityCode(
                abilityCode,
                {
                    ...req.query,
                    include
                },
                req.ability,
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
            const result = await abilityService.getByField(
                where,
                {
                    ...req.query,
                    include
                },
                req.ability,
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


    //Update ability

    async update(req: FastifyRequest, reply: FastifyReply) {

        try {

            const abilityCode = String(req.params.abilityCode);

            const data = await abilityService.update(
                abilityCode,
                req.body,
                req.ability
            );

            return reply.status(200).send({
                success: true,
                message: "ability updated successfully",
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
            const abilityCode = String(req.params.abilityCode)
            const data = req.body
            // console.log(data)
            await abilityService.deactivate(
                abilityCode,
                data,
                req.ability
            );

            return reply.status(200).send({
                success: true,
                message: "ability deactivated",
                data,
            });


        }catch(err){
            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }

    //  DELETE ability
    async delete(req: FastifyRequest, reply: FastifyReply) {

        try {
            const abilityCode = String(req.params.abilityCode)

            await abilityService.delete(
                abilityCode,
                req.ability
            );

            return reply.status(200).send({
                success: true,
                message: "ability permanently deleted"
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }
}

export default  new abilityController();