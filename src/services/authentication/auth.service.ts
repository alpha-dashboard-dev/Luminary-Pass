import userRepo from "../../repositories/user/user.repository.js";
import userSessionRepo from "../../repositories/user/userSession.repository.js";

import {comparePassword, hashPassword,} from "../../utils/hashPassword.js";

import {generateAccessToken, generateRefreshToken, verifyRefreshToken,} from "../../utils/jwt.js";

import { generateCode } from "../../utils/generateCode.js";
import {env} from "../../config/env.js";
import businessRepo from "../../repositories/business/business.repository.js";
import userRoleRepo from "../../repositories/user/userRole.repository.js";


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

    async login(data: any, request: any) {

        // console.log(data);

        const { email, password, fcmToken, deviceName, deviceType, timezone } = data;

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
            throw new Error("User doesn't exist with this email.");
        }

        // console.log(user)
        const userRole = await userRoleRepo.findOne({
            role_code: user.role_code,
        })

        // console.log(userRole)


        // it only check for business_owner so it may be uerrole.role === "business_owner"
        if(userRole.role !== "admin" && userRole.role !== "influencer") {
            const business = await businessRepo.findOne({
                business_code: user.business_code,
            })

            if (business.status !== "active") {
                throw new Error("Your Business account is inactive");
            }
        }


        if (user.status !== "active") {
            throw new Error("Your account is inactive");
        }

        const matched = await comparePassword(password, user.password);

        if (!matched) {
            throw new Error("Invalid password");
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

        const refreshExpiry = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);

        await userSessionRepo.create({

            session_code: sessionCode,
            user_code: user.user_code,
            refresh_token: refreshToken,
            ip_address: request.ip,
            user_agent: request.headers["user-agent"],
            device_name: deviceName ?? null,
            device_type: deviceType ?? "desktop",
            timezone: timezone ?? null,
            fcm_token: fcmToken ?? null,
            status: "active",
            expires_at: refreshExpiry,
            last_activity_at: new Date(),

        });

        return {

            user: {

                userCode: user.user_code,
                organizationCode: user.organization_code,
                businessCode: user.business_code,
                roleCode: user.role_code,
                role: user.role,
            },
            accessToken,
            refreshToken,
            expiresIn: env.JWT_ACCESS_TOKEN_EXPIRES_IN,

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