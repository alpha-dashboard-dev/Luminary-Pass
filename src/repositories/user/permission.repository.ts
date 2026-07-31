import initModels from "../../database/sequelize/models/index.cjs"
import dbHelper from "../../database/dbHelper/dbHelper"
import {buildIncludes} from "../../utils/buildInclude.js";

const db = initModels()

class Permission {

    private tables: any

    constructor() {
        this.tables = db.Permission
    }

    async create(data: any, options?: any) {
        return dbHelper.create(this.tables, data, options)
    }

    async findAll(where: any = {}, options: any = {}) {
        // console.log(options);

        const include = buildIncludes(
            this.tables,
            options.include || []
        );

        return dbHelper.findAll(
            this.tables,
            where,
            {
                ...options,
                include
            }
        );
    }

    async findOne(where: any = {}, options: any = {}) {
        return dbHelper.findOne(
            this.tables,
            {
                where,
                include: buildIncludes(
                    this.tables,
                    options.include || []
                ),
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

    async delete(where: any) {
        return dbHelper.delete(
            this.tables,
            where
        );
    }
}

export default new Permission();