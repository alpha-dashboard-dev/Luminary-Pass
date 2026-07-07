import { FastifyReply, FastifyRequest } from "fastify";
import orgService from "../../services/organization/organization.service";
import {validateOrganization} from "../../utils/validator.js";

class organizationController {

    async create(req: FastifyRequest, reply: FastifyReply) {

        try{
            const data = req.body;
            validateOrganization(data);
            const result =  await orgService.create(
                data,
                req.user
            )
            return reply.status(200).send({
                success: true,
                message: "Organization created successfully",
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
                {
                    alias: "users",
                    attributes: [],
                },
            ]
            // console.log(include)
            const data =
                await orgService.getAll(
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

    // Get by organization code
    async getByOrganizationCode(req: FastifyRequest, reply: FastifyReply) {

        try {
            let include = req.query.include ?? "";
            include = [
                {
                    alias: "users",
                    attributes: [],
                },
            ]
            const organizationCode = String(req.params.organizationCode);
            console.log(organizationCode);
            const result = await orgService.getByOrganizationCode(
                    organizationCode,
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
                {
                    alias: "users",
                    attributes: [],
                },
            ]
            const where = {...req.query};
            const result = await orgService.getByField(
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


    //Update Organization

    async update(req: FastifyRequest, reply: FastifyReply) {

        try {

            const organizationCode = String(req.params.organizationCode);

            const data = await orgService.update(
                organizationCode,
                req.body,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "Organization updated successfully",
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
            const organizationCode = String(req.params.organizationCode)
            const data = req.body
            // console.log(data)
            await orgService.deactivate(
                organizationCode,
                data,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "Organization deactivated",
                data,
            });


        }catch(err){
            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }

    //  DELETE Organization
    async delete(req: FastifyRequest, reply: FastifyReply) {

        try {
            const organizationCode = String(req.params.organizationCode)

            await orgService.delete(
                organizationCode,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "Organization permanently deleted"
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }
}

export default  new organizationController();