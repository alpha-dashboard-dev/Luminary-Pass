import initModels from "../../database/sequelize/models/index.cjs"
import dbHelper from "../../database/dbHelper/dbHelper"
import {buildIncludes} from "../../utils/buildInclude.js";

const db = initModels();

class AttachmentRepository {

    private tables: any;

    constructor() {
        this.tables = db.Attachment;
    }

    async create(data: any, options?: any) {
        return await dbHelper.create(this.tables, data, options);
    }

    async findOne(where: any = {}, options: any = {}) {
        return await dbHelper.findOne(
            this.tables,
            {
                where,
                include: buildIncludes(
                    this.tables,
                    options.include || [],
                )
            }
        );
    }

    async findAll(where: any = {}, options: any = {}) {

        const include = buildIncludes(
            this.tables,
            options.include || [],
        )
        return await dbHelper.findAll(
            this.tables,
            where,
            {
                ...options,
                include
            }
        );
    }

    async update(where: any, data: any, options: any = {}) {
        return dbHelper.update(
            this.tables,
            where,
            data,
            options
        );
    }

    async deactivate(where: any, data: any) {
        return dbHelper.update(
            this.tables,
            where,
            data
        )
    }

    async delete(where: any, options: any = {}) {
        return await dbHelper.delete(
            this.tables,
            where,
            options
        );
    }


    async getByEntity(entityType, entityCode){

        return this.findAll({
            where:{
                entity_type:entityType,
                entity_code:entityCode,
                status:"active"
            }
        });

    }

    async getByCategory(entityType, entityCode, category){

        return this.findAll({

            where:{

                entity_type:entityType,

                entity_code:entityCode,

                attachment_category:category,

                status:"active"

            }

        });

    }
}

export default new AttachmentRepository();