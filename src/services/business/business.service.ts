import businessRepo from "../../repositories/busines/business.repository";
import userRepo from "../../repositories/user/user.repository"

import { hashPassword } from "../../utils/hashPassword";
import { generateCode } from "../../utils/generateCode";
import {buildWhere} from "../../utils/buildWhere.js";
import initModels from "../../database/sequelize/models/index.cjs";

const db = initModels();

class BusinessService {

    // Create Business + Owner
    async create(data: any, actor?: any) {

        // validateBusiness(data);

        const transaction = await db.sequelize.transaction();

        try {

            const businessCode = generateCode();

            const ownerCode = generateCode();

            const defaultPassword = await hashPassword(businessCode);

            const business = await businessCode.create(
                {
                    business_code: businessCode,
                    owner_user_code: null,

                    // organization_code: data.organization_code,

                    name: data.name.trim(),

                    email: data.email || null,

                    phone: data.phone,

                    timezone: data.timezone || null,

                    description: data.description,

                    status: data.status || "active",
                },
                { transaction }
            );

            const owner = await userRepo.create(
                {
                    user_code: ownerCode,

                    // organization_code: data.organization_code,

                    business_code: businessCode,
                    role_code: data.role_code,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email || null,

                    phone: data.phone,

                    password: defaultPassword,

                    user_type: "business_owner",
                    status: data.status || "active",
                },
                { transaction }
            );

            await businessRepo.update(
                {
                    business_code: businessCode
                },
                {
                    owner_user_code: ownerCode,
                },
                { transaction }
            );

            await transaction.commit();

            return {
                business,
                owner,
            };

        } catch (err) {

            await transaction.rollback();

            throw err;
        }
    }


    // async create(data: any, actor: any) {
    //     console.log(actor);
    //
    //     if (!actor) throw new Error("Unauthorized");
    //
    //     const emailExists = await businessRepo.findOne(
    //         {
    //             email: data.email
    //         }
    //     );
    //
    //     if (emailExists) {
    //         throw new Error("Email already exists");
    //     }
    //
    //     const phoneExists = await businessRepo.findOne({
    //         phone: data.phone
    //     })
    //
    //     if (phoneExists) {
    //         throw new Error("Phone already exists");
    //     }
    //
    //     const businessCode = generateCode();
    //
    //     const password = await hashPassword(data.password);
    //
    //     return await businessRepo.create({
    //         business_code: businessCode,
    //         name: data.name,
    //         email: data.email.trim().toLowerCase(),
    //         phone: data.phone,
    //         password,
    //         status: data.status
    //     });
    // }

    // Get all Businesses

    async getAll(query: any = {}, actor: any) {
        // console.log(query.where)
        const where = buildWhere(query);

        if(!actor){
            throw new Error("Unauthorized Access");
        }

        return businessRepo.findAll({
            where,
            include: Array.isArray(query.include)
                ? query.include
                : [],
            limit: query.limit ? Number(query.limit) : undefined,
            offset: query.offset ? Number(query.offset) : undefined,
            order: [
                [
                    query.sort_by || "created_at",
                    query.sort_order || "DESC"
                ]
            ]
        });
    }

    // Get Business By Business Code
    async getByBusinessCode(businessCode: string, query: any = {}, actor: any) {

        const business = await businessRepo.findOne(
            {
                business_code: businessCode
            },
            {
                include: Array.isArray(query.include) ? query.include : [],
            }
        );

        if (!business) {
            throw new Error("business not found");
        }

        return business;
    }

    // Get business By Any Field
    async getByField(where: any, query: any = {}, actor: any) {
        console.log(where);
        const business = await businessRepo.findOne(
            where,
            {
                include: query.include || []
            }
        );

        if (!business) {
            throw new Error("business not found");
        }

        return business;
    }

    // Update Business
    async update(businessCode: string, data: any, actor: any) {

        const business = await businessRepo.findOne({
            business_code: businessCode
        });

        if (!business) throw new Error("business not found");

        if (data.password) {
            data.password = await hashPassword(data.password);
        }

        return await businessRepo.update(
            { business_code: businessCode },
            data
        );
    }

    // Delete business

    async delete(businessCode: string, actor: any) {
        const business = await businessRepo.findOne({
            business_code: businessCode
        });

        if (!business) {
            throw new Error("business not found");
        }

        return await businessRepo.delete({
            business_code: businessCode
        });
    }

    // Deactivate business

    async deactivate(businessCode: string, data: any, actor: any) {

        const business = await businessRepo.findOne({
            business_code: businessCode
        });

        if (!business) {
            throw new Error("User not found");
        }

        return await businessRepo.deactivate({
                business_code: businessCode
            },
            data
        );
    }
}

export default new BusinessService();