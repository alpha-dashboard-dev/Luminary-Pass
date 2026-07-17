import userRepo from "../../repositories/user/user.repository.js";
import userSessionRepo from "../../repositories/user/userSession.repository.js";

import {comparePassword, hashPassword,} from "../../utils/hashPassword.js";

import {generateAccessToken, generateRefreshToken, verifyRefreshToken,} from "../../utils/jwt.js";

import { generateCode } from "../../utils/generateCode.js";


class AuthService {

    async register(data: any) {

        try {

            if (data.email) {
                const emailExists = await userRepo.findOne(
                    {
                        email: data.email
                    }
                );

                if (emailExists) {
                    throw new Error("Email already exists");
                }
            }


            if (data.phone) {
                const phoneExists = await userRepo.findOne({
                    phone: data.phone
                })

                if (phoneExists) {
                    throw new Error("Phone already exists");
                }

            }

            const userCode = generateCode();
            // const sessionCode = generateCode();
            let password

            if (data.password) {
                password = await hashPassword(data.password);
            }

            // const signup_session = await signup_sessionRepo.create({
            //     signup_code: sessionCode,
            //     user_code: userCode,
            //     account_type: "Account Creation",
            //     current_step: 1,
            //     status: "in_progress"
            //
            // })

            return await userRepo.create({
                user_code: userCode,
                organization_code: data.organizationCode || null,
                business_code: data.businessCode || null,
                role_code: data.roleCode,
                first_name: data.fullName || null,
                last_name: data.lastName || null,
                email: data.email.trim().toLowerCase(),
                phone: data.phone || null,
                password: password || null,
                user_type: data.userType || null,
                avatar: null,
                status: data.status || "inactive"
            });

        } catch (err){
            throw err;
        }
    }


    // async registerBusiness(data: any) {
    //
    //     const { firstName, businessName, email, phone, venueCategory, country, planInterest, description } = data
    //
    //
    //     const transaction = await db.sequelize.transaction();
    //
    //     try {
    //
    //         if (email) {
    //             const emailExists = await userRepo.findOne(
    //                 {
    //                     email: email
    //                 }
    //             );
    //
    //             if (emailExists) {
    //                 throw new Error("Email already exists");
    //             }
    //         }
    //
    //
    //         if (phone) {
    //             const phoneExists = await userRepo.findOne({
    //                 phone: phone
    //             })
    //
    //             if (phoneExists) {
    //                 throw new Error("Phone already exists");
    //             }
    //
    //         }
    //
    //         const businessCode = generateCode();
    //         const ownerCode = generateCode();
    //         const venueCode = generateCode();
    //         const categoryCode = generateCode();
    //         const locationCode = generateCode();
    //
    //         const business = await businessRepo.create(
    //             {
    //                 business_code: businessCode,
    //                 owner_user_code: ownerCode,
    //                 name: businessName.trim(),
    //                 email: email || null,
    //                 phone: phone,
    //                 billing_plan: planInterest
    //             },
    //             { transaction }
    //         );
    //
    //         const owner = await userRepo.create(
    //             {
    //                 user_code: ownerCode,
    //                 business_code: businessCode,
    //                 role_code: "ROL00002",
    //                 first_name: firstName || null,
    //                 email:  email || null,
    //                 phone: phone || null,
    //                 status: "inactive",
    //             },
    //             { transaction }
    //         );
    //
    //         const venue = await venueRepo.create(
    //             {
    //                 venue_code: venueCode,
    //                 business_code: businessCode,
    //                 description: description || null,
    //                 status: "inactive"
    //             },
    //             { transaction }
    //         )
    //
    //         const category = await categoryRepo.create(
    //             {
    //                 category_code: categoryCode,
    //                 entity_type: "venue",
    //                 entity_code: venueCode,
    //                 name: venueCategory,
    //                 status: "inactive",
    //             },
    //             { transaction }
    //         )
    //
    //         const businessLocation = await locationRepo.create(
    //             {
    //                 location_code: locationCode,
    //                 entity_type: "business",
    //                 entity_code: businessCode,
    //                 country: country,
    //             },
    //             { transaction }
    //         )
    //
    //         await transaction.commit();
    //
    //         if (email) {
    //             await emailService.sendBusinessActivationEmail(email, businessCode, businessName);
    //         }
    //
    //
    //         return {
    //             business,
    //             owner,
    //             venue,
    //             category,
    //             businessLocation,
    //         };
    //
    //     } catch (err) {
    //
    //         await transaction.rollback();
    //
    //         throw err;
    //     }
    // }

    async login(data: any, request: any) {

        // console.log(data);

        const { email, password } = data;

        if (!email || !password) {
            throw new Error("Email and password are required");
        }

        const user = await userRepo.findOne(
            { email },
            {
                include: [
                    {
                        alias: "role",
                    }
                ]
            }
        );

        if (!user) {
            throw new Error("Invalid email or password");
        }


        if (user.status !== "active") {
            throw new Error("Your account is inactive");
        }

        const matched = await comparePassword(password, user.password);

        if (!matched) {
            throw new Error("Invalid email or password");
        }

        const sessionCode = generateCode();

        const accessToken = generateAccessToken({
            userCode: user.user_code,
            sessionCode,
            type: "access",
        });

        const refreshToken = generateRefreshToken({
            userCode: user.user_code,
            sessionCode,
            type: "refresh",
        });

        const refreshExpiry = new Date(
            Date.now() + 15 * 24 * 60 * 60 * 1000
        );

        await userSessionRepo.create({

            session_code: sessionCode,

            user_code: user.user_code,

            refresh_token: refreshToken,

            ip_address: request.ip,

            user_agent: request.headers["user-agent"],

            device_name: null,

            device_type: "desktop",

            timezone: null,

            fcm_token: null,

            status: "active",

            expires_at: refreshExpiry,

            last_activity_at: new Date(),

        });

        return {

            user: {

                userCode: user.user_code,

                firstName: user.first_name,

                lastName: user.last_name,

                email: user.email,

                phone: user.phone,

                businessCode: user.business_code,

                role: user.role,

            },

            accessToken,

            refreshToken,

            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,

        };
    }

    /**
     * Logout
     */
    async logout(sessionCode: string) {

        const session = await userSessionRepo.findOne({
            session_code: sessionCode,
        });

        if (!session) {
            throw new Error("Session not found");
        }

        await userSessionRepo.update(
            {
                session_code: sessionCode,
            },
            {
                status: "revoked",
            }
        );

        return {
            success: true,
        };
    }

    /**
     * Refresh Token
     */
    async refreshToken(token: string) {

        if (!token) {
            throw new Error("Refresh token is required");
        }

        const payload: any = verifyRefreshToken(token);

        const session = await userSessionRepo.findOne({
                session_code: payload.sessionCode,
                refresh_token: token,
                status: "active",
            });

        if (!session) {
            throw new Error("Invalid session");
        }

        if (session.expires_at && new Date(session.expires_at) < new Date()) {

            await userSessionRepo.update(
                {
                    session_code: session.session_code,
                },
                {
                    status: "expired",
                }
            );

            throw new Error("Refresh token expired");
        }


        const accessToken = generateAccessToken({
                userCode: payload.userCode,
                sessionCode: payload.sessionCode,
                type: "access",
            });

        const refreshToken = generateRefreshToken({
                userCode: payload.userCode,
                sessionCode: payload.sessionCode,
                type: "refresh",
            });

        await userSessionRepo.update(
            {
                session_code: payload.sessionCode,
            },
            {
                refresh_token: refreshToken,
                last_activity_at: new Date(),
            }
        );

        return {

            accessToken,
            refreshToken,
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
        };
    }

    async me(userCode: string, query: any = {}) {

        const user = await userRepo.findOne(
            {
                user_code: userCode,
            },
            {
                include: Array.isArray(query.include) ? query.include : [],
                // include: [
                //     {
                //         alias: "role",
                //         include: [
                //             {
                //                 alias: "permissions",
                //             }
                //         ]
                //     }
                // ]
            }
        );

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    }

}

export default new AuthService();

/*

async register(data: any) {

    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        confirmPassword,

        bio,
        gender,
        dateOfBirth,

        instagram,

        verificationScreenshot,

        portfolioImages
    } = data;


    // 1. Validate password

    if(password !== confirmPassword){
        throw new Error("Password does not match");
    }


    // 2. Create User

    const user = await userService.create({

        firstName,
        lastName,

        email,
        phone,

        password,

        roleCode: "INF00001", // influencer role

        userType: "INFLUENCER",

        status: "ACTIVE"

    });



    // 3. Create Influencer Profile

    const influencer =
        await influencerService.create({

            userCode: user.user_code,

            bio,

            gender,

            dateOfBirth

        });



    // 4. Save Instagram Login Data

    if(instagram){

        await socialLoginService.create({

            userCode: user.user_code,

            influencerCode:
            influencer.influencer_code,

            provider: "INSTAGRAM",

            socialId: instagram.id,

            username: instagram.username,

            accessToken: instagram.accessToken,

            refreshToken:
            instagram.refreshToken || null

        });

    }



    // 5. Save Instagram verification screenshot

    if(verificationScreenshot){

        await attachmentService.create({

            entityType: "influencers",

            entityCode:
            influencer.influencer_code,

            title:
            "Instagram Insights Screenshot",

            mediaType:
            verificationScreenshot.mediaType,

            fileName:
            verificationScreenshot.fileName,

            fileExtension:
            verificationScreenshot.fileExtension,

            fileSize:
            verificationScreenshot.fileSize,

            url:
            verificationScreenshot.url,

            isPrimary:true,

            visibility:"PRIVATE",

            uploadedBy:
            user.user_code,

            displayOrder:1,

            status:"ACTIVE"

        });

    }



    // 6. Save Portfolio Images

    if(!portfolioImages || portfolioImages.length < 4){

        throw new Error(
            "Minimum 4 portfolio images are required"
        );

    }


    let order = 1;

    for(const image of portfolioImages){


        await attachmentService.create({

            entityType:"influencers",

            entityCode:
            influencer.influencer_code,


            title:
            "Influencer Portfolio",


            mediaType:
            image.mediaType,


            fileName:
            image.fileName,


            fileExtension:
            image.fileExtension,


            fileSize:
            image.fileSize,


            url:
            image.url,


            isPrimary:
            order === 1,


            visibility:"PUBLIC",


            uploadedBy:
            user.user_code,


            displayOrder:
            order,


            status:"ACTIVE"

        });


        order++;

    }



    return {

        userCode:
        user.user_code,

        influencerCode:
        influencer.influencer_code,

        message:
        "Your application has been submitted. Our team will review within 24 hours."

    };

}
 */