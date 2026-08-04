import businessRepo from "../../repositories/business/business.repository";
import userRepo from "../../repositories/user/user.repository"
import orgRepo from "../../repositories/organization/organization.repository"

import { hashPassword } from "../../utils/hashPassword";
import { generateCode } from "../../utils/generateCode";
import {buildWhere} from "../../utils/buildWhere.js";
import initModels from "../../database/sequelize/models/index.cjs";
import venueRepo from "../../repositories/venue/venue.repository.js";
import categoryRepo from "../../repositories/category/category.repository.js";
import locationRepo from "../../repositories/location/location.repository.js";
import emailService from "../sendEmail/email.service.js";
import userService from "../user/user.service.js";
import userRoleService from "../user/userRole.service.js";

const db = initModels();

class BusinessService {

    // Business Registration through Web
    async registerBusiness(data: any) {

        const { firstName, businessName, email, phone, venueCategory, country, planInterest, description } = data


        const transaction = await db.sequelize.transaction();

        try {

            if (email) {
                const emailExists = await businessRepo.findOne(
                    {
                        email: email
                    }
                );

                if (emailExists) {
                    throw new Error("Email already exists");
                }
            }


            if (phone) {
                const phoneExists = await businessRepo.findOne({
                    phone: phone
                })

                if (phoneExists) {
                    throw new Error("Phone already exists");
                }

            }

            const businessCode = generateCode();
            const ownerCode = generateCode();
            const venueCode = generateCode();
            const categoryCode = generateCode();
            const locationCode = generateCode();

            const business = await businessRepo.create(
                {
                    business_code: businessCode,
                    organization_code: "ORG00001",
                    owner_user_code: ownerCode,
                    name: businessName.trim(),
                    email: email || null,
                    phone: phone,
                    billing_plan: planInterest,
                },
                { transaction }
            );

            const owner = await userRepo.create(
                {
                    user_code: ownerCode,
                    organization_code: "ORG00001",
                    business_code: businessCode,
                    role_code: "ROL00002",
                    first_name: firstName || null,
                    email:  email || null,
                    phone: phone || null,
                    status: "inactive",
                },
                { transaction }
            );

            const venue = await venueRepo.create(
                {
                    venue_code: venueCode,
                    business_code: businessCode,
                    description: description || null,
                    status: "inactive"
                },
                { transaction }
            )

            const category = await categoryRepo.create(
                {
                    category_code: categoryCode,
                    entity_type: "venue",
                    entity_code: venueCode,
                    name: venueCategory,
                    status: "inactive",
                },
                { transaction }
            )

            const businessLocation = await locationRepo.create(
                {
                    location_code: locationCode,
                    entity_type: "business",
                    entity_code: businessCode,
                    country: country,
                },
                { transaction }
            )

            await transaction.commit();

            if (email) {
                await emailService.sendBusinessEmailVerification(email, businessCode, businessName);
            }

            return {
                business,
                owner,
                venue,
                category,
                businessLocation,
            };

        } catch (err) {

            await transaction.rollback();

            throw err;
        }
    }

    // Email Verification
    async verifyEmail(token: string) {

        const business = await businessRepo.findOne({
            email_verification_token: token,
        });


        if (!business) {
            throw new Error("Invalid verification link");
        }

        const isExpired = business.email_verification_token_expires_at && new Date(business.email_verification_token_expires_at) <= new Date();


        if (isExpired) {
            throw new Error("Verification link expired. Request for a new link");
        }

        await businessRepo.update(
            {
                business_code: business.business_code,
            },
            {
                email_verified: true,
                email_verification_token: null,
                email_verification_token_expires_at: null,
            }
        );


        return true;
    }

    async resendVerificationEmail(email: string) {

        const business = await businessRepo.findOne({
            email: email,
        });


        if (!business) {
            throw new Error("Business not found");
        }


        if (business.email_verified) {
            throw new Error("Email already verified");
        }


        await emailService.sendBusinessEmailVerification(
            business.email,
            business.business_code,
            business.name
        );
        return true;
    }

    // Get all Businesses

    async getAll(query: any = {}, actor: any) {
        // console.log(query.where)
        const where = buildWhere(query);

        // Admin can see all businesses
        // Non-admin can only see their business details
        if(actor.roleCode !== "ROL00001") {
            where.business_code = actor.businessCode;
        }

        return businessRepo.findAll(
            where,
            {
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


    async inviteTeamMember(data: any, actor: any) {

        const transaction = await db.sequelize.transaction();

        try{


            const userExist = await userRepo.findOne({
                email: data.email
            })
            console.log(userExist)

            if(userExist){
                throw new Error("User already exist with this email")
            }

            // bypass email or bypass profile,
            // business owner decide whatever they create the user profile or
            // they only send email with the setupProfile, then user create their profile
            // they only send email with the setupProfile, then user create their profile
            // state checks user exist or not, profile completed or not

            // console.log("Profile created successfully")

            const role = await userRoleService.create(
                {
                    businessCode: actor.businessCode,
                    role: data.role,
                    rank: data.rank,
                    description: data.description,
                },
                {   transaction }
            )

            const member = await userService.create(
                {
                    organizationCode: actor.organizationCode,
                    businessCode: actor.businessCode,
                    roleCode: role.role_code,
                    firstName: data.name,
                    email: data.email,
                    userType: data.role,
                },
                {   transaction }
            )

            // console.log(member.user_code)
            await transaction.commit();

            await emailService.sendProfileSetupEmail(data.email, member.user_code, data.name)

            return true

        }catch(err){
            if(!transaction.finished)
                await transaction.rollback();
            throw err;
        }
    }


    // async activateBusiness(token: string) {
    //
    //     const business = await businessRepo.findOne({
    //         activation_token: token
    //     });
    //
    //     if (!business) {
    //         throw new Error("Invalid activation link");
    //     }
    //
    //     await businessRepo.update(
    //         {
    //             business_code: business.business_code
    //         },
    //         {
    //             status: "active",
    //             activation_token: null,
    //             activation_token_expires_at: null,
    //             email_verified: true,
    //         }
    //     );
    //
    //     await userRepo.update(
    //         {
    //             business_code: business.business_code
    //         },
    //         {
    //             status: "active"
    //         }
    //     );
    //
    //     return {
    //         message: "Business account activated successfully."
    //     };
    // }
}

export default new BusinessService();