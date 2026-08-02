import initModels from "../../database/sequelize/models/index.cjs"
import dbHelper from "../../database/dbHelper/dbHelper"
import {buildIncludes} from "../../utils/buildInclude.js";

const db = initModels();

class participantChecklistRepository {

    private tables: any;

    constructor() {
        this.tables = db.EventParticipantChecklist;
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

        // console.log(options)

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
}

export default new participantChecklistRepository();