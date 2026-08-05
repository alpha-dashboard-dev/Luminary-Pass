import orgRepo from "../../repositories/organization/organization.repository";

import { hashPassword } from "../../utils/hashPassword";
import { generateCode } from "../../utils/generateCode";
import {buildWhere} from "../../utils/buildWhere.js";

class OrganizationService {

    // Create Organization

    async create(data: any) {

        const emailExists = await orgRepo.findOne(
            {
                email: data.email
            }
        );

        if (emailExists) {
            throw new Error("Email already exists");
        }

        const phoneExists = await orgRepo.findOne({
            phone: data.phone
        })

        if (phoneExists) {
            throw new Error("Phone already exists");
        }

        const organizationCode = generateCode();

        const password = await hashPassword(data.password);

        return await orgRepo.create({
            organization_code: organizationCode,
            name: data.name,
            email: data.email.trim().toLowerCase(),
            phone: data.phone,
            password,
            status: data.status
        });
    }

    // Get all organizations

    async getAll(query: any = {}) {
        // console.log(query.where)
        const where = buildWhere(query);

        return orgRepo.findAll(
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

    // Get Organization By Organization Code
    async getByOrganizationCode(organizationCode: string, query: any = {}) {

        const organization = await orgRepo.findOne(
            {
                organization_code: organizationCode
            },
            {
                include: Array.isArray(query.include) ? query.include : [],
            }
        );

        if (!organization) {
            throw new Error("Organization not found");
        }

        return organization;
    }

    // Get Organization By Any Field
    async getByField(where: any, query: any = {}) {
        // console.log(where);
        const organization = await orgRepo.findOne(
            where,
            {
                include: query.include || []
            }
        );

        if (!organization) {
            throw new Error("Organization not found");
        }

        return organization;
    }

    // Update Organization
    async update(organizationCode: string, data: any) {

        const organization = await orgRepo.findOne({
            organization_code: organizationCode
        });

        if (!organization) throw new Error("Organization not found");

        if (data.password) {data.password = await hashPassword(data.password);
        }

        return await orgRepo.update(
            { organization_code: organizationCode },
            data
        );
    }

    // Delete Organization

    async delete(organizationCode: string) {
        const organization = await orgRepo.findOne({
                organization_code: organizationCode
            });

        if (!organization) {
            throw new Error("Organization not found");
        }

        return await orgRepo.delete({
            organization_code: organizationCode
        });
    }

    // Deactivate Organization

    async deactivate(organizationCode: string, data: any) {

        const organization = await orgRepo.findOne({
            organization_code: organizationCode
        });

        if (!organization) {
            throw new Error("User not found");
        }

        return await orgRepo.deactivate({
                organization_code: organizationCode
            },
            data
        );
    }
}

export default new OrganizationService();