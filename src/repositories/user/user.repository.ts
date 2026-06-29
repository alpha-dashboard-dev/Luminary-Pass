import initModels from "../../database/sequelize/models/index.js";
import { buildIncludes } from "../../utils/buildInclude";
import dbHelper from "../../dbHelper/dbHelper";

const db = initModels();

class UserRepository {

    private tables: any;

    constructor() {
        this.tables = db.User;
    }

    async create(data: any, options?: any) {
        return dbHelper.create(this.tables, data, options);
    }

    async findAll(options: any = {}) {

        const include = buildIncludes(
            this.tables,
            options.include || []
        );

        return dbHelper.findAll(
            this.tables,
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

    async deactivate(where: any, data: any) {
        return dbHelper.update(
            this.tables,
            where,
            data
        )
    }

    async delete(where: any) {
        return dbHelper.delete(
            this.tables,
            where
        );
    }
}

export default new UserRepository();