import initModels from "../../database/sequelize/models/index.cjs"
import dbHelper from "../../database/dbHelper/dbHelper.js"
import {buildIncludes} from "../../utils/buildInclude.js";

const db = initModels();

class InfluencerRepository {

    private tables: any;

    constructor() {
        this.tables = db.Influencer;
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

    async findAll(options: any = {}) {

        const include = buildIncludes(
            this.tables,
            options.include || [],
        )
        return await dbHelper.findAll(
            this.tables,
            {
                ...options,
                include
            }
        );
    }

    async update(where: any, data: any, options: any = {}) {

        console.log(data)
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
}

export default new InfluencerRepository();