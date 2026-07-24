import socialLoginRepo from "../../repositories/socialLogin/socialLogin.repository";
import { generateCode } from "../../utils/generateCode";
import {buildWhere} from "../../utils/buildWhere.js";

class socialLoginService {

    async create(data: any) {

        // console.log(data);

        const socialLoginCode = generateCode();

        return await socialLoginRepo.create({
            social_login_code: socialLoginCode,
            user_code: data.userCode,
            provider: data.provider,
            provider_user_id: data.providerUserId,
            access_token: data.accessToken,
            refresh_token: data.refreshToken,
            token_expires_at: data.expiresIn,
            last_login_at: data.lastLoginAt || new Date(),
        });
    }

    async getAll(query: any = {}) {
        // console.log(query.where)
        const where = buildWhere(query);

        return socialLoginRepo.findAll({
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
    // Get socials By social code
    async getBySocialLoginCode(socialCode: string, query: any = {}) {

        const social = await socialLoginRepo.findOne(
            {
                social_login_code: socialCode
            },
            {
                include: Array.isArray(query.include) ? query.include : [],
            }
        );

        if (!social) {
            throw new Error("social not found");
        }

        return social;
    }

    // Get social By Any Field
    async getByField(where: any, query: any = {}) {
        // console.log(where);
        const social = await socialLoginRepo.findOne(
            where,
            {
                include: query.include || []
            }
        );

        if (!social) {
            throw new Error("social not found");
        }

        return social;
    }

    // Update social
    async update(socialCode: string, data: any) {

        const social = await socialLoginRepo.findOne({
            social_login_code: socialCode
        });

        if (!social) throw new Error("social not found");


        return await socialLoginRepo.update(
            { social_login_code: socialCode },
            data
        );
    }

    // Delete social

    async delete(socialCode: string) {
        const social = await socialLoginRepo.findOne({
            social_login_code: socialCode
        });

        if (!social) {
            throw new Error("social not found");
        }

        return await socialLoginRepo.delete({
            social_login_code: socialCode
        });
    }
}

export default new socialLoginService();