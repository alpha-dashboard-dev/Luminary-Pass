import userRoleRepo from "../../repositories/user/userRole.repository.js"
import { generateCode} from "../../utils/generateCode.js";

class UserRoleService {

    async create(data: any, actor: any){

        // if(!actor){
        //     throw new Error("Unauthorized Access");
        // }

        const roleCode = generateCode()

        return userRoleRepo.create({
            role_code: roleCode,
            business_code: data.businessCode,
            role: data.role,
            rank: data.rank,
            description: data.description,
        })
    }

    async getAll(query: any = {}, actor: any) {
        // console.log(query.where)
        // const where = buildWhere(query);

        // if (!this.isAdmin(actor)) {
        //     where.business_code = actor.businessCode;
        // }

        return userRoleRepo.findAll({
            // where,
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

    async getByRoleCode(roleCode: string,query: any = {}, actor: any) {

        const role = await userRoleRepo.findOne(
            {
                role_code: roleCode
            },
            {
                include: Array.isArray(query.include) ? query.include : [],

            }
        );

        if (!role) {
            throw new Error("Role not found");
        }

        return role;
    }

    async getByAnyField(where: any, actor: any, query: any = {}) {
        const role = await userRoleRepo.findOne(
            where,
            {
                include: query.include || []
            }
        );

        if (!role) {
            throw new Error("Role not found");
        }

        return role;
    }

    async update(roleCode: string, data: any, actor: any) {

        const role = await userRoleRepo.findOne({
            role_code: roleCode
        });

        if (!role) throw new Error("Role not found");

        // this.assertBusinessAccess(actor, user.business_code);
        //
        // if (actor.userType !== ROLES.ADMIN && data.user_type && !STAFF_USER_TYPES.includes(data.user_type)) {
        //     throw new Error(
        //         "Invalid role assignment"
        //     );
        // }

        const allowed: any = {};
        if (data.rank !== undefined)
            allowed.rank = data.rank;
        if (data.description !== undefined)
            allowed.description = data.description;

        return await userRoleRepo.update(
            { role_code: roleCode },
            data
        );
    }

    // ========================
    // DELETE (Hard DELETE)
    // ========================

    async delete(roleCode: string, actor: any) {
        const role = await userRoleRepo.findOne({
                role_code: roleCode
            });

        if (!role) {
            throw new Error(
                "Role not found"
            );
        }

        // if (actor.userType !== ROLES.ADMIN) {
        //     throw new Error(
        //         "Only admin can permanently delete users"
        //     );
        // }

        return await userRoleRepo.delete({
            role_code: roleCode
        });
    }
}

export default new UserRoleService();