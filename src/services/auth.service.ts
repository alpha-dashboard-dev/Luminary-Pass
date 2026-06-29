import UserRepository from "../repositories/user.repository";
import UserSessionRepository from "../repositories/userSession.repository";

import {
    hashPassword,
    comparePassword
} from "../utils/password";

import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken
} from "../utils/jwt";

import { generateCode } from "../utils/generateCode";

class AuthService {

    async register(data: any) {

        const existing = await UserRepository.findOne({
            email: data.email
        });

        if (existing) {
            throw new Error("User already exists");
        }

        const user = await UserRepository.create({
            user_code: generateCode(),
            role_code: data.role_code,
            organization_code: data.organization_code || null,
            business_code: data.business_code || null,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone: data.phone,
            password: await hashPassword(data.password),
            user_type: data.user_type,
            status: "active"
        });

        return user;
    }

    async login(data: any) {

        const user = await UserRepository.findOne({
            email: data.email
        });

        if (!user) throw new Error("Invalid credentials");

        const valid = await comparePassword(
            data.password,
            user.password
        );

        if (!valid) throw new Error("Invalid credentials");

        const payload = {
            userCode: user.user_code,
            roleCode: user.role_code,
            businessCode: user.business_code
        };

        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        await UserSessionRepository.create({
            session_code: generateCode(),
            user_code: user.user_code,
            refresh_token: refreshToken,
            ip_address: data.ip_address || null,
            user_agent: data.user_agent || null,
            device_name: data.device_name || null,
            expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            status: "active"
        });

        return {
            user,
            accessToken,
            refreshToken
        };
    }

    async refresh(refreshToken: string) {

        const decoded: any = verifyRefreshToken(refreshToken);

        const session = await UserSessionRepository.findOne({
            refresh_token: refreshToken,
            user_code: decoded.userCode,
            status: "active"
        });

        if (!session) {
            throw new Error("Invalid session");
        }

        return {
            accessToken: generateAccessToken(decoded)
        };
    }

    async logout(refreshToken: string) {

        await UserSessionRepository.update(
            { refresh_token: refreshToken },
            { status: "revoked" }
        );

        return true;
    }
}

export default new AuthService();