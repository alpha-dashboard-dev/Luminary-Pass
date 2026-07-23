import initModels from "../../database/sequelize/models/index.cjs"
import dbHelper from "../../database/dbHelper/dbHelper"
import {buildIncludes} from "../../utils/buildInclude.js";

const db = initModels();

class EventRepository {

    private tables: any;

    constructor() {
        this.tables = db.Event;
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
        // console.log(options);

        const include = buildIncludes(
            this.tables,
            options.include || [],
        )

        console.log(include);
        return await dbHelper.findAll(
            this.tables,
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

    async delete(where: any) {
        return await dbHelper.delete(
            this.tables,
            where,
        );
    }

    async count(where: any, options: any = {}) {
        return await dbHelper.count(
            this.tables,
            where,
            options
        )
    }

    async query(options: any = {}) {
        // console.log(options)
        return await dbHelper.query(this.tables, options);
    }
}

export default new EventRepository();