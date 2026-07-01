import userRepo from "../../repositories/user/user.repository.js";
import userSessionRepo from "../../repositories/user/userSession.repository.js";

import {comparePassword,} from "../../utils/hashPassword.js";

import {generateAccessToken, generateRefreshToken, verifyRefreshToken,} from "../../utils/jwt.js";

import { generateCode } from "../../utils/generateCode.js";

class AuthService {

    /**
     * Login
     */
    async login(data: any, request: any) {

        // console.log(data);

        const { email, password } = data;

        if (!email || !password) {
            throw new Error("Email and password are required");
        }

        //--------------------------------------------------
        // Find user
        //--------------------------------------------------

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

        //--------------------------------------------------
        // Active?
        //--------------------------------------------------

        if (user.status !== "active") {
            throw new Error("Your account is inactive");
        }

        //--------------------------------------------------
        // Password
        //--------------------------------------------------

        const matched = await comparePassword(password, user.password);

        if (!matched) {
            throw new Error("Invalid email or password");
        }

        //--------------------------------------------------
        // Session
        //--------------------------------------------------

        const sessionCode = generateCode();

        //--------------------------------------------------
        // Tokens
        //--------------------------------------------------

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

        //--------------------------------------------------
        // Save Session
        //--------------------------------------------------

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

        //--------------------------------------------------
        // Response
        //--------------------------------------------------

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

        //--------------------------------------------------

        const payload: any =
            verifyRefreshToken(token);

        //--------------------------------------------------

        const session =
            await userSessionRepo.findOne({

                session_code:
                payload.sessionCode,

                refresh_token: token,

                status: "active",

            });

        if (!session) {
            throw new Error("Invalid session");
        }

        //--------------------------------------------------

        if (
            session.expires_at &&
            new Date(session.expires_at) <
            new Date()
        ) {

            await userSessionRepo.update(
                {
                    session_code:
                    session.session_code,
                },
                {
                    status: "expired",
                }
            );

            throw new Error(
                "Refresh token expired"
            );
        }

        //--------------------------------------------------

        const accessToken =
            generateAccessToken({

                userCode:
                payload.userCode,

                sessionCode:
                payload.sessionCode,

                type: "access",

            });

        const refreshToken =
            generateRefreshToken({

                userCode:
                payload.userCode,

                sessionCode:
                payload.sessionCode,

                type: "refresh",

            });

        //--------------------------------------------------

        await userSessionRepo.update(
            {
                session_code:
                payload.sessionCode,
            },
            {
                refresh_token:
                refreshToken,

                last_activity_at:
                    new Date(),
            }
        );

        //--------------------------------------------------

        return {

            accessToken,

            refreshToken,

            expiresIn:
            process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,

        };
    }

    /**
     * Current User
     */
    async me(userCode: string) {

        const user = await userRepo.findOne(
            {
                user_code: userCode,
            },
            {
                include: [
                    {
                        alias: "role",
                        include: [
                            {
                                alias: "permissions",
                            }
                        ]
                    }
                ]
            }
        );

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    }

}

export default new AuthService();