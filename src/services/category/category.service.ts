import categoryRepo from "../../repositories/category/category.repository";

import { hashPassword } from "../../utils/hashPassword";
import { generateCode } from "../../utils/generateCode";
import {buildWhere} from "../../utils/buildWhere.js";

class CategoryService {

    async create(data: any, actor: any) {
        // console.log(actor);

        if (!actor) throw new Error("Unauthorized");


        // const category = await categoryRepo.findOne({
        //     name: data.name
        // })
        //
        // if (category) {
        //     throw new Error("Category already exists");
        // }

        const categoryCode = generateCode();

        return await categoryRepo.create({
            category_code: categoryCode,
            entity_type: data.entityType,
            entity_code: data.entityCode,
            name: data.name,
            description: data.description,
            status: data.status
        });
    }

    // Get all Categories

    async getAll(query: any = {}, actor: any) {
        // console.log(query.where)
        const where = buildWhere(query);

        if(!actor){
            throw new Error("Unauthorized Access");
        }

        return categoryRepo.findAll({
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

    // Get Category By category Code
    async getByCategoryCode(categoryCode: string, query: any = {}, actor: any) {

        const category = await categoryRepo.findOne(
            {
                category_code: categoryCode
            },
            {
                include: Array.isArray(query.include) ? query.include : [],
            }
        );

        if (!category) {
            throw new Error("Category not found");
        }

        return category;
    }

    // Get Category By Any Field
    async getByField(where: any, query: any = {}, actor: any) {
        // console.log(where);
        const category = await categoryRepo.findOne(
            where,
            {
                include: query.include || []
            }
        );

        if (!category) {
            throw new Error("Category not found");
        }

        return category;
    }

    // Update Category
    async update(categoryCode: string, data: any, actor: any) {

        const category = await categoryRepo.findOne({
            category_code: categoryCode
        });

        if (!category) throw new Error("Category not found");

        return await categoryRepo.update(
            { category_code: categoryCode },
            data
        );
    }

    // Delete Category

    async delete(categoryCode: string, actor: any) {
        const category = await categoryRepo.findOne({
            category_code: categoryCode
        });

        if (!category) {
            throw new Error("Category not found");
        }

        return await categoryRepo.delete({
            category_code: categoryCode
        });
    }

    // Deactivate Category

    async deactivate(categoryCode: string, data: any, actor: any) {

        const category = await categoryRepo.findOne({
            category_code: categoryCode
        });

        if (!category) {
            throw new Error("Category not found");
        }

        return await categoryRepo.deactivate({
                category_code: categoryCode
            },
            data
        );
    }
}

export default new CategoryService();