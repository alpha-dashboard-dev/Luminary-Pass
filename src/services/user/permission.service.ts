import permissionRepo from "../../repositories/user/permission.repository.js"
import { generateCode} from "../../utils/generateCode.js";
import {buildWhere} from "../../utils/buildWhere.js";

class PermissionService {

    async create(data: any, actor: any){
        // console.log(actor.roleCode);

        if(!actor || actor.roleCode !== "ROL00001"){
            throw new Error("Unauthorized Access");
        }

        const existing = await permissionRepo.findOne({
            module: data.module,
            name: data.name
        });

        if (existing) {
            throw new Error("Permission already exists");
        }

        const permissionCode = generateCode()

        return permissionRepo.create({
            permission_code: permissionCode,
            module: data.module,
            name: data.name,
        })
    }

    async getAll(query: any = {}, actor: any) {
        // console.log(query.where)
        const where = buildWhere(query);

        // Admin can see all venues
        // Non-admin can only see their business's venues
        if(actor.roleCode !== "ROL00001") {
            where.business_code = actor.businessCode;
        }

        return permissionRepo.findAll(
            where,
            {
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

    async getByPermissionCode(permissionCode: string,query: any = {}, actor: any) {

        const permission = await permissionRepo.findOne(
            {
                permission_code: permissionCode
            },
            {
                include: Array.isArray(query.include) ? query.include : [],

            }
        );

        if (!permission) {
            throw new Error("Permission not found");
        }

        return permission;
    }

    async update(permissionCode: string, data: any, actor: any) {

        const permission = await permissionRepo.findOne({
            permission_code: permissionCode
        });

        if (!permission) throw new Error("Permission not found");


        const allowed: any = {};
        if (data.module !== undefined)
            allowed.module = data.module;
        if (data.name !== undefined)
            allowed.name = data.name;

        return await permissionRepo.update(
            { permission_code: permissionCode },
            data
        );
    }

    // ========================
    // DELETE (Hard DELETE)
    // ========================

    async delete(permissionCode: string, actor: any) {
        const permission = await permissionRepo.findOne({
            permission_code: permissionCode
        });

        if (!permission) {
            throw new Error("Permission not found");
        }

        // if (actor.userType !== ROLES.ADMIN) {
        //     throw new Error(
        //         "Only admin can permanently delete users"
        //     );
        // }

        return await permissionRepo.delete({
            permission_code: permissionCode
        });
    }
}

export default new PermissionService();