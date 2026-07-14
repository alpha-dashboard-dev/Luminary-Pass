import userRepo from "../../repositories/user/user.repository.js";
import userSessionRepo from "../../repositories/user/userSession.repository.js";

import {comparePassword,} from "../../utils/hashPassword.js";

import {generateAccessToken, generateRefreshToken, verifyRefreshToken,} from "../../utils/jwt.js";

import { generateCode } from "../../utils/generateCode.js";
import {hash} from "bcrypt";
import userService from "../user/user.service.js";
import {sequelize} from "../../database/sequelize/sequelize.js";
import attachmentService from "../mediaAttachment/attachment.service.js";

class AuthService {

    /* first step: create Account
            1)full name
            2) Email or phone
            3) Password
            4) confirm Password
        Second Step: Connect Instagram account

        third step: upload instagram dashboard screenshot for verification

        fourth step: add profile details
            1) bio
            2)category
            3) country
            4) city

        5 step: showcase your work
        upload at-least 4 photos

        our team review your application within 24 hours


     */

    async registerInfluencer(data: any){

        const {
            fullName,
            email,
            phone,
            password,
            confirmPassword,

            instagram,

            bio,
            category,
            country,
            city,

            verificationScreenshot,
            portfolioImages

        } = data;

        const transaction = await sequelize.transaction();

        try {
            if(password !== confirmPassword){
                throw new Error("Passwords do not match");
            }

            // step 1) create user
            const user = userService.create(
                {
                    firstName: fullName,
                    email: email,
                    phone: phone,
                    password: password,
                    role_code: "ROL00003"
                },
                {transaction}
            );

            // Step 2) Connect Instagram

            // Step 3) Media Attachment for verification

            const media = attachmentService.create({


            })

            // Step 4) Add influencer profile details
            const influencer = await influencer.create({
                user_code: user.user_code,
                bio: bio,



            })
            // step 5) show_case work

            await transaction.commit();

        }
        catch(error){

            await transaction.rollback();

            throw error;

        }

    }

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