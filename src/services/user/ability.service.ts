import abilityRepo from "../../repositories/user/ability.repository";
import { generateCode } from "../../utils/generateCode";
import {buildWhere} from "../../utils/buildWhere.js";
import businessRepo from "../../repositories/business/business.repository.js";
import userRepo from "../../repositories/user/user.repository.js";

class abilityService {

    // Create ability

    async create(data: any) {

        const businessExists = await businessRepo.findOne({
            business_code: data.businessCode,
        })

        if(!businessExists) {
            throw new Error("Business doesn't exist");
        }

        const userExists = await userRepo.findOne({
                user_code: data.userCode
        })

        if(!userExists) {
            throw new Error("User doesn't exist");
        }

        const user = await userRepo.findOne({
            user_code: data.addedBy
        })

        if(!user) {
            throw new Error("User doesn't exist, who want to add ability");
        }

        if(data.updatedBy){
            const user = await userRepo.findOne({
                user_code: data.updatedBy
            })

            if(!user) {
                throw new Error("User doesn't exist, who want to update ability");
            }
        }


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
        // Admin can see all venues
        // Non-admin can only see their business's venues
        if(actor.roleCode !== "ROL00001") {
            where.business_code = actor.businessCode;
        }


        return abilityRepo.findAll(
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