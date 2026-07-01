import repo from "../../repositories/user/user.repository";

// import { validateUser } from "../utils/validator";

import { hashPassword } from "../../utils/hashPassword";

import { generateCode } from "../../utils/generateCode";
import { buildWhere } from "../../utils/buildWhere";

class UserService {

    // ========================
    // CREATE USER
    // ========================

    async create(data: any, actor: any) {

        if (!actor) throw new Error("Unauthorized");

        // validateUser(data);

        const exists = await repo.findOne(
            {email: data.email}
        );

        if (exists) {
            throw new Error("Email already exists");
        }

        const user_code = generateCode();

        const password = await hashPassword(data.password);

        return await repo.create({
            user_code,
            business_code: data.business_code,

            user_type: data.user_type,

            email: data.email.trim().toLowerCase(),

            password,

            name: data.name,

            phone: data.phone,

            employee_type: data.employee_type || null,

            is_active: data.is_active || "active",
        });
    }

    // ========================
    // GET ALL USERS
    // ========================

    async getAll(query: any = {}, actor: any) {
        // console.log(query.where)
        const where = buildWhere(query);

        if (!this.isAdmin(actor)) {
            where.business_code = actor.businessCode;
        }

        return repo.findAll({
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

    async getByCode(userCode: string, actor: any, query: any = {}) {

        const user = await repo.findOne(
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

        this.assertBusinessAccess(
            actor,
            user.business_code
        );

        return user;
    }

    async getOne(where: any, actor: any, query: any = {}) {
        const user = await repo.findOne(
            where,
            {
                include: query.include || []
            }
        );

        if (!user) {
            throw new Error("User not found");
        }

        this.assertBusinessAccess(
            actor,
            user.business_code
        );

        return user;
    }

    // ========================
    // UPDATE USER
    // ========================

    async update(userCode: string, data: any, actor: any) {

        const user = await repo.findOne({
            user_code: userCode
        });

        if (!user) throw new Error("User not found");

        this.assertBusinessAccess(actor, user.business_code);

        if (actor.userType !== ROLES.ADMIN && data.user_type && !STAFF_USER_TYPES.includes(data.user_type)) {
            throw new Error(
                "Invalid role assignment"
            );
        }

        if (data.password) {
            data.password =
                await hashPassword(
                    data.password
                );
        }

        return await repo.update(
            { user_code: userCode },
            data
        );
    }

    // ========================
    // DELETE (Hard DELETE)
    // ========================

    async delete(userCode: string, actor: any) {
        const user =
            await repo.findOne({
                user_code: userCode
            });

        if (!user) {
            throw new Error(
                "User not found"
            );
        }

        this.assertBusinessAccess(
            actor,
            user.business_code
        );

        if (actor.userType !== ROLES.ADMIN) {
            throw new Error(
                "Only admin can permanently delete users"
            );
        }

        return await repo.delete({
            user_code: userCode
        });
    }

    // ========================
    // STATUS CHANGE
    // ========================

    async deactivate(userCode: string, data: any, actor: any) {

        const user = await repo.findOne({
            user_code: userCode
        });

        if (!user) {
            throw new Error("User not found");
        }

        this.assertBusinessAccess(
            actor,
            user.business_code
        );

        return await repo.deactivate({
                user_code: userCode
            },
            data
        );
    }
}

export default new UserService();