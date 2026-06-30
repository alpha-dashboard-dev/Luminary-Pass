import rolePermissionRepo from "../../repositories/user/rolePermission.repository.js"
import userRoleRepo from "../../repositories/user/userRole.repository.js"
import permissionRepo from "../../repositories/user/permission.repository.js"

import { generateCode } from "../../utils/generateCode.js";

class RolePermissionService {
    async create(data: any, actor: any){
        const {roleCode, permissionCode} = data;

        const role = await userRoleRepo.findOne({
                role_code: roleCode,
        })

        if (!role){
            throw new Error("No role found");
        }

        const permission = await permissionRepo.findOne({
            permission_code: permissionCode,
        })

        if (!permission){
            throw new Error("No permission found");
        }

        const rolePermissionCode = generateCode()

        return await rolePermissionRepo.create({
            role_permission_code: rolePermissionCode,
            role_code: roleCode,
            permission_code: permissionCode,
        })
    }

}

export default new RolePermissionService();