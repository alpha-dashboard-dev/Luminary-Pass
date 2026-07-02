import userRepo from "../../repositories/user/user.repository";

import { hashPassword } from "../../utils/hashPassword";
import { generateCode } from "../../utils/generateCode";
import {buildWhere} from "../../utils/buildWhere.js";

class UserService {

    // Create Users

    async create(data: any, actor: any) {
        console.log(actor);

        if (!actor) throw new Error("Unauthorized");

        const emailExists = await userRepo.findOne(
            {
                email: data.email
            }
        );

        if (emailExists) {
            throw new Error("Email already exists");
        }

        const phoneExists = await userRepo.findOne({
            phone: data.phone
        })

        if (phoneExists) {
            throw new Error("Phone already exists");
        }

        const userCode = generateCode();

        const password = await hashPassword(data.password);

        return await userRepo.create({
            user_code: userCode,
            organization_code: data.organizationCode,
            business_code: data.businessCode,
            role_code: data.roleCode,
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email.trim().toLowerCase(),
            phone: data.phone,
            password,
            user_type: data.userType,
            avatar: null,
            status: data.status
        });
    }

    // Get all users

    async getAll(query: any = {}, actor: any) {
        // console.log(query.where)
        const where = buildWhere(query);

        if(!actor){
            throw new Error("Unauthorized Access");
        }

        return userRepo.findAll({
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

        return user;
    }

    // Get User By Any Field
    async getByField(where: any, query: any = {}, actor: any) {
        console.log(where);
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
}

export default new UserService();