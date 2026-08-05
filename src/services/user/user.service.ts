import userRepo from "../../repositories/user/user.repository";

import { hashPassword } from "../../utils/hashPassword";
import { generateCode } from "../../utils/generateCode";
import {buildWhere} from "../../utils/buildWhere.js"
import initModels from "../../database/sequelize/models/index.cjs";
import emailService from "../sendEmail/email.service";
import businessRepo from "../../repositories/business/business.repository";
import locationRepo from "../../repositories/location/location.repository";
import categoryRepo from "../../repositories/category/category.repository";
import influencerRepo from "../../repositories/influencer/influencer.repository";
import userRoleRepo from "../../repositories/user/userRole.repository";
import venueRepo from "../../repositories/venue/venue.repository.js";

const db = initModels();

class UserService {

    // Create Users

    async create(data: any, options?: any) {

        // console.log(data, options);

        const emailExists = await userRepo.findOne(
            {
                email: data.email
            }
        );

        if (emailExists) {
            throw new Error("Email already exists");
        }

        if(data.phone){
            const phoneExists = await userRepo.findOne({
                phone: data.phone
            })

            if (phoneExists) {
                throw new Error("Phone already exists");
            }
        }


        const userCode = generateCode();
        let password

        if(data.password){
             password = await hashPassword(data.password);
        }

        return await userRepo.create(
            {
                user_code: userCode,
                organization_code: data.organizationCode || null,
                business_code: data.businessCode || null,
                role_code: data.roleCode,
                first_name: data.firstName || null,
                last_name: data.lastName || null,
                email: data.email.trim().toLowerCase(),
                phone: data.phone || null,
                password: password || null,
                user_type: data.userType || null ,
                avatar: null,
                status: data.status
            },
            options
        );
    }

    // Get all users

    async getAll(query: any = {}, actor: any) {
        // console.log(query.where)
        const where = buildWhere(query);

        if(actor.roleCode !== "ROL00001") {
            where.business_code = actor.businessCode;
        }

        return userRepo.findAll(
            where,
            {
                include: Array.isArray(query.include) ? query.include : [],
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

    // Get users By user code
    async getByUserCode(userCode: string, query: any = {}, actor: any) {

        const user = await userRepo.findOne(
            {
                user_code: userCode
            },
            {
                include: Array.isArray(query.include) ? query.include : [],
            }
        );

        if (!user) {
            throw new Error("User not found");
        }

        if(actor.roleCode !== "ROL00001") {
            if(user.business_code !== actor.businessCode) {
                throw new Error("User does not belong to your business");
            }
        }
        return user;
    }

    // Get User By Any Field
    async getByField(where: any, query: any = {}, actor: any) {
        // console.log(where);
        const user = await userRepo.findOne(
            where,
            {
                include: query.include || []
            }
        );

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    }

    // Update user
    async update(userCode: string, data: any, actor: any) {

        const user = await userRepo.findOne({
            user_code: userCode
        });

        if (!user) throw new Error("User not found");

        if(actor.roleCode !== "ROL00001") {
            if(user.business_code !== actor.businessCode) {
                throw new Error("Update failed! User does not belong to your business.");
            }
        }

        const allowed: any = {};
        if (data.firstName !== undefined)
            allowed.first_name = data.firstName;
        if (data.lastName !== undefined)
            allowed.last_name = data.lastName;
        if (data.email !== undefined)
            allowed.email = data.email;
        if (data.phone !== undefined)
            allowed.phone = data.phone;
        if (data.password !== undefined) {
            allowed.password = await hashPassword(data.password);
        }
        if (data.status !== undefined)
            allowed.status = data.status;


        return await userRepo.update(
            { user_code: userCode },
            allowed
        );
    }

    // Delete User

    async delete(userCode: string, actor: any) {
        const user = await userRepo.findOne({
            user_code: userCode
        });

        if (!user) {
            throw new Error("User not found");
        }

        return await userRepo.delete({
            user_code: userCode
        });
    }

    // Deactivate user

    async deactivate(userCode: string, data: any, actor: any) {

        const user = await userRepo.findOne({
            user_code: userCode
        });

        if (!user) {
            throw new Error("User not found");
        }

        return await userRepo.deactivate({
                user_code: userCode
            },
            data
        );
    }


    // activate Influencer Account through Website & send email to set up their profile
    async sendProfileSetupLink(userCode: string){
        try{
                const user = await userRepo.findOne({
                    user_code: userCode
                });

                if (!user) {
                    throw new Error("User not found");
                }

                if(user.profile_completed){
                // console.log("User profile already completed");
                    return;
                }

                const userRole = await userRoleRepo.findOne({
                    role_code: user.role_code
                })

                let emailVerified, result;

                if(userRole.role === "business_owner"){
                    // console.log("Business Owner", userRole.role);
                    emailVerified = await businessRepo.findOne({
                        owner_user_code: userCode,
                        email_verified: true

                    })

                    if(emailVerified){
                        // console.log("Email Verified", emailVerified)
                        result = await emailService.sendProfileSetupEmail(user.email, userCode, user.first_name);
                        throw new Error("Email Verified");
                    }else{
                        throw new Error("Email not Verified");
                    }
                }
                else if(userRole.role === "influencer"){
                    // console.log("Influencer", userRole.role);

                    result = await emailService.sendProfileSetupEmail(user.email, userCode, user.first_name );
                }

                return result;

        } catch(err){
            throw err
        }
    }

    async verifySetupLink(token: string){
        const user = await userRepo.findOne({
            profile_setup_token: token,
        });


        if (!user) {
            throw new Error("Invalid verification link");
        }
        // console.log(user)

        const isExpired = user.profile_setup_token_expires_at && new Date(user.profile_setup_token_expires_at) <= new Date();


        if (isExpired) {
            throw new Error("Verification link expired. Request for a new link");
        }

        // await userRepo.update(
        //     {
        //         user_code: user.user_code,
        //     },
        //     {
        //         profile_setup_token: null,
        //         profile_setup_token_expires_at: null,
        //         // profile_completed: true,
        //     }
        // );

        return true;
    }

    async setupProfile(data: any){

        // console.log(data)

        try{

            const user = await userRepo.findOne({
                profile_setup_token: data.token,
            });


            if (!user) {
                throw new Error("Invalid verification link");
            }
            // console.log(user)

            const isExpired = user.profile_setup_token_expires_at && new Date(user.profile_setup_token_expires_at) <= new Date();


            if (isExpired) {
                throw new Error("Verification link expired. Request for a new link");
            }

            let hashedPassword;
            if(data.password)
                hashedPassword = await hashPassword(data.password);

            await userRepo.update(
                {
                    user_code: user.user_code,
                },
                {
                    first_name: data.firstName,
                    last_name: data.lastName,
                    password: hashedPassword,
                    profile_setup_token: null,
                    profile_setup_token_expires_at: null,
                    profile_completed: true,
                }
            );



        } catch(err){
            throw err
        }
    }


    async activateUserAccount(userCode: string, data: any){

        // console.log(userCode, actor);
        try{

            const { status } = data

            // console.log(status)

            if (!["active", "inactive"].includes(status)) {
                throw new Error("Invalid status! Status must be active or inactive");
            }
            // Found user
            const user = await userRepo.findOne({
                user_code: userCode
            })
            if (!user) {
                throw new Error("User not found");
            }

            // check profile completed or not
            if(!user.profile_completed){
                // console.log("Profile not completed");
                throw new Error("Profile not completed");
            }

            // check user role
            const userRole = await userRoleRepo.findOne({
                role_code: user.role_code
            })

            if(userRole.role === "business_owner") {
                // console.log("business owner account");
                // account already active or not
                if(user.status !== "active"){

                    // find business
                    const business = await businessRepo.findOne({
                        owner_user_code: userCode
                    })

                    // find business venue
                    const venue = await venueRepo.findOne({
                        business_code: business.business_code
                    })

                    // business Owner active
                    await userRepo.update(
                        {
                            user_code: userCode
                        },
                        {
                            status: status
                        }

                    )

                    await businessRepo.update(
                        {
                            business_code: business.business_code
                        },
                        {
                            status: status
                        }
                    )

                    // console.log(business)

                    // business venue active
                    await venueRepo.update(
                        {
                            venue_code: venue.venue_code
                        },
                        {
                            status: status
                        }
                    )

                    // // venue category active
                    await categoryRepo.update(
                        {
                            entity_code: venue.venue_code
                        },
                        {
                            status: status
                        }
                    )
                    // business location active
                    await locationRepo.update(
                        {
                            entity_code: business.business_code,
                        },
                        {
                            status: true
                        }
                    )

                    // return true;
                }
                else{
                    throw new Error("Your account is already active");
                }
            }
            else if(userRole.role === "influencer"){
                // console.log("influencer account");
                // account already active or not
                if(user.status !== "active"){
                    await userRepo.update(
                        {user_code: userCode},
                        data
                    )
                    await locationRepo.update(
                        {
                            entity_code: userCode,
                        },
                        {
                            status: true
                        }
                    )
                    const influencer = await influencerRepo.findOne({
                        user_code: userCode
                    })
                    await categoryRepo.update(
                        {
                            entity_code: influencer.influencer_code,
                        },
                        data
                    )
                    // return true
                }
                else{
                    throw new Error("Your account is already active");
                }
            }

            return true;

        }catch(err){
            throw err
        }

    }
}

export default new UserService();