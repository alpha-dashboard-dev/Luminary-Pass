import businessRepo from "../../repositories/busines/business.repository";
import userRepo from "../../repositories/user/user.repository"
import orgRepo from "../../repositories/organization/organization.repository"

import { hashPassword } from "../../utils/hashPassword";
import { generateCode } from "../../utils/generateCode";
import {buildWhere} from "../../utils/buildWhere.js";
import initModels from "../../database/sequelize/models/index.cjs";

const db = initModels();

class BusinessService {

    // Create Business + Owner
    async create(data: any) {

        const transaction = await db.sequelize.transaction();

        try {

            const organization = await orgRepo.findOne({
                organization_code: data.organizationCode,
            })
            // console.log(organization)

            if(!organization) {
                throw new Error("Organization Not Found!");
            }

            const emailExists = await businessRepo.findOne(
                {
                    email: data.email
                }
            );

            if (emailExists) {
                throw new Error("Email already exists");
            }

            const phoneExists = await businessRepo.findOne({
                phone: data.phone
            })

            if (phoneExists) {
                throw new Error("Phone already exists");
            }

            const businessCode = generateCode();

            const ownerCode = generateCode();

            const business = await businessRepo.create(
                {
                    business_code: businessCode,
                    organization_code: data.organizationCode,
                    owner_user_code: ownerCode,

                    name: data.name.trim(),

                    email: data.email || null,

                    phone: data.phone,

                    timezone: data.timezone || null,

                    description: data.description || null,

                    status: data.status,
                },
                { transaction }
            );

            const owner = await userRepo.create(
                {
                    user_code: ownerCode,

                    organization_code: data.organizationCode,

                    business_code: businessCode,
                    role_code: data.roleCode,
                    // first_name: data.first_name || null,
                    // last_name: data.last_name || null,
                    // email:  null,
                    // phone: null,
                    // password: null,
                    // user_type: null,
                    status: "inactive",
                },
                { transaction }
            );

            // await businessRepo.update(
            //     {
            //         business_code: businessCode
            //     },
            //     {
            //         owner_user_code: ownerCode,
            //     },
            //     { transaction }
            // );

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
        // console.log(where);
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


    //    Delete business + their owner from user table
    async delete(businessCode: string, actor: any) {

        const transaction = await db.sequelize.transaction();

        try{
            const business = await businessRepo.findOne({
                business_code: businessCode
            });

            // console.log(business);

            if (!business) {
                throw new Error("business not found");
            }

            const ownerCode = business.owner_user_code;
            // console.log(ownerCode);

            const owner = await userRepo.findOne({
                user_code: ownerCode
            })

            // console.log(owner);

            if(!owner){
                throw new Error("User not found");
            }

            const businessCount = await businessRepo.count({
                owner_user_code: business.owner_user_code
            }, { transaction });

            // console.log(businessCount);


            await businessRepo.delete(
                {   business_code: businessCode },
                { transaction }
            )

            if (businessCount === 1) {
                await userRepo.delete(
                    { user_code: ownerCode },
                    { transaction }
                );
            }

            await transaction.commit();

            return {
                success: true,
                message: "Business and owner deleted successfully."
            };
        } catch (err) {

            await transaction.rollback();
            throw err;
        }

    }
}

export default new BusinessService();