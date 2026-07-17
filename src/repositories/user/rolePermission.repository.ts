import initModels from "../../database/sequelize/models/index.cjs"
import dbHelper from "../../database/dbHelper/dbHelper"
import {buildIncludes} from "../../utils/buildInclude.js";

const db = initModels()

class RolePermissionRepository {

    private tables: any

    constructor() {
        this.tables = db.RolePermissions
    }

    async create(data: any){
        dbHelper.create(this.tables, data)
    }

    async bulkCreate(data: any){
        dbHelper.bulkCreate(this.tables, data)
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

    // async findAll(where: any = {}, options: any = {}) {
    //
    //     const include = buildIncludes(
    //         this.tables,
    //         options.include || []
    //     );
    //
    //     return dbHelper.findAll(
    //         this.tables,
    //         where,
    //         {
    //             ...options,
    //             include
    //         }
    //     );
    // }

    async delete(where: any) {
        return dbHelper.delete(
            this.tables,
            where
        );
    }
}

export default new RolePermissionRepository()