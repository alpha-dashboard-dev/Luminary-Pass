import rolePermissionRepo from "../../repositories/user/rolePermission.repository.js";
import userRoleRepo from "../../repositories/user/userRole.repository.js";
import permissionRepo from "../../repositories/user/permission.repository.js";

import { generateCode } from "../../utils/generateCode.js";
import {buildWhere} from "../../utils/buildWhere.js";

class RolePermissionService {

    async assignPermissions(roleCode: string, permissions: string[], actor: any) {

        if (!permissions?.length) {
            return [];
        }

        // Verify role exists
        const role = await userRoleRepo.findOne({
            role_code: roleCode,
        });

        if (!role) {
            throw new Error("Role not found");
        }

        // Fetch all requested permissions
        const permissionRecords = await permissionRepo.findAll({
            where: {
                permission_code: permissions,
            },
        });

        if (permissionRecords.length !== permissions.length) {
            throw new Error("One or more permissions do not exist");
        }

        // Existing mappings
        const existingMappings = await rolePermissionRepo.findAll({
            where: {
                role_code: roleCode,
            },
        });

        const assignedPermissions = new Set(
            existingMappings.map((x: any) => x.permission_code)
        );

        // Create only missing mappings
        const rows = permissions
            .filter(permissionCode => !assignedPermissions.has(permissionCode))
            .map(permissionCode => ({
                role_permission_code: generateCode(),
                role_code: roleCode,
                permission_code: permissionCode,
            }));

        if (!rows.length) {
            return [];
        }

        return await rolePermissionRepo.bulkCreate(rows);
    }

    /**
     * Replace all permissions of a role
     */
    async replacePermissions(roleCode: string, permissions: string[]) {

        // Verify role
        const role = await userRoleRepo.findOne({
            role_code: roleCode,
        });

        if (!role) {
            throw new Error("Role not found");
        }

        // Validate permissions
        if (permissions.length) {

            const permissionRecords = await permissionRepo.findAll({
                where: {
                    permission_code: permissions,
                },
            });

            if (permissionRecords.length !== permissions.length) {
                throw new Error("One or more permissions do not exist");
            }
        }

        // Remove old mappings
        await rolePermissionRepo.delete({
            role_code: roleCode,
        });

        if (!permissions.length) {
            return [];
        }

        // Insert new mappings
        const rows = permissions.map(permissionCode => ({
            role_permission_code: generateCode(),
            role_code: roleCode,
            permission_code: permissionCode,
        }));

        return await rolePermissionRepo.bulkCreate(rows);
    }

    /**
     * Remove one permission from role
     */
    async removeOnePermission(roleCode: string, permissionCode: string) {

        const mapping = await rolePermissionRepo.findOne({
            role_code: roleCode,
            permission_code: permissionCode,
        });

        if (!mapping) {
            throw new Error("Permission is not assigned to this role");
        }

        return await rolePermissionRepo.delete({
            role_code: roleCode,
            permission_code: permissionCode,
        });
    }

    /**
     * Remove every permission from role
     */
    async removeAllPermissions(roleCode: string) {

        const role = await userRoleRepo.findOne({
            role_code: roleCode,
        });

        if (!role) {
            throw new Error("Role not found");
        }

        return await rolePermissionRepo.delete({
            role_code: roleCode,
        });
    }

    /**
     * Get all permissions assigned to role
     */
    async getPermissions(roleCode: string, query: any = {}, actor: any) {

        const role = await userRoleRepo.findOne({
            role_code: roleCode,
        });

        if (!role) {
            throw new Error("Role not found");
        }

        const where = buildWhere(query)

        return await rolePermissionRepo.findAll(
            {
                where: {
                    role_code: roleCode,
                },
                include: Array.isArray(query.include) ? query.include : [],
            }
        );
    }

}

export default new RolePermissionService();