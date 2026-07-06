import abilityRepo from "../../repositories/user/ability.repository";

import { hashPassword } from "../../utils/hashPassword";
import { generateCode } from "../../utils/generateCode";
import {buildWhere} from "../../utils/buildWhere.js";

class abilityService {

    // Create ability

    async create(data: any, actor: any) {

        // const abilityCode = generateCode();

        return await abilityRepo.create({
            // ability_code: abilityCode,
            business_code: data.businessCode,
            user_code: data.userCode,
            ability: data.ability,
            status: data.status,
            added_by: data.addedBy,
            updated_by: data.updatedBy,
        });
    }

    // Get all abilities

    async getAll(query: any = {}, actor: any) {

        const where = buildWhere(query);

        return abilityRepo.findAll({
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

    // Get abilities By ability code
    async getByAbilityCode(abilityCode: string, query: any = {}, actor: any) {

        const ability = await abilityRepo.findOne(
            {
                id: abilityCode
            },
            {
                include: Array.isArray(query.include) ? query.include : [],
            }
        );

        if (!ability) {
            throw new Error("ability not found");
        }

        return ability;
    }

    // Get ability By Any Field
    async getByField(where: any, query: any = {}, actor: any) {
        // console.log(where);
        const ability = await abilityRepo.findOne(
            where,
            {
                include: query.include || []
            }
        );

        if (!ability) {
            throw new Error("ability not found");
        }

        return ability;
    }

    // Update ability
    async update(abilityCode: string, data: any, actor: any) {

        const ability = await abilityRepo.findOne({
            id: abilityCode
        });

        if (!ability) throw new Error("ability not found");


        return await abilityRepo.update(
            { id: abilityCode },
            data
        );
    }

    // Delete ability

    async delete(abilityCode: string, actor: any) {
        const ability = await abilityRepo.findOne({
            id: abilityCode
        });

        if (!ability) {
            throw new Error("ability not found");
        }

        return await abilityRepo.delete({
            id: abilityCode
        });
    }

    // Deactivate ability

    async deactivate(abilityCode: string, data: any, actor: any) {

        const ability = await abilityRepo.findOne({
            id: abilityCode
        });

        if (!ability) {
            throw new Error("ability not found");
        }

        return await abilityRepo.deactivate({
                id: abilityCode
            },
            data
        );
    }
}

export default new abilityService();