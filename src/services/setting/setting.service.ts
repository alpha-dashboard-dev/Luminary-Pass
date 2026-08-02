import settingRepository from "../../repositories/setting/setting.repository";
import { generateCode } from "../../utils/generateCode";
import {buildWhere} from "../../utils/buildWhere.js";

class settingService {

    // Create settings

    async create(data: any) {
        const settingCode = generateCode();

        return await settingRepository.create({
            setting_code: settingCode,
            entity_type: data.entityType,
            entity_code: data.entityCode,
            setting_key: data.settingKey,
            setting_value: data.settingValue,
            description: data.description,
        });
    }

    // Get all settings

    async getAll(query: any = {}) {
        // console.log(query.where)
        const where = buildWhere(query);

        return settingRepository.findAll(
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

    // Get settings By setting code
    async getBySettingCode(settingCode: string, query: any = {}) {

        const setting = await settingRepository.findOne(
            {
                setting_code: settingCode
            },
            {
                include: Array.isArray(query.include) ? query.include : [],
            }
        );

        if (!setting) {
            throw new Error("setting not found");
        }

        return setting;
    }

    // Get setting By Any Field
    async getByField(where: any, query: any = {}) {
        console.log(where);
        const setting = await settingRepository.findOne(
            where,
            {
                include: query.include || []
            }
        );

        if (!setting) {
            throw new Error("setting not found");
        }

        return setting;
    }

    // Update setting
    async update(settingCode: string, data: any) {

        const setting = await settingRepository.findOne({
            setting_code: settingCode
        });

        if (!setting) throw new Error("setting not found");


        return await settingRepository.update(
            { setting_code: settingCode },
            data
        );
    }

    // Delete setting

    async delete(settingCode: string) {
        const setting = await settingRepository.findOne({
            setting_code: settingCode
        });

        if (!setting) {
            throw new Error("setting not found");
        }

        return await settingRepository.delete({
            setting_code: settingCode
        });
    }

    // Deactivate setting

    async deactivate(settingCode: string, data: any) {

        const setting = await settingRepository.findOne({
            setting_code: settingCode
        });

        if (!setting) {
            throw new Error("setting not found");
        }

        return await settingRepository.deactivate({
                setting_code: settingCode
            },
            data
        );
    }
}

export default new settingService();