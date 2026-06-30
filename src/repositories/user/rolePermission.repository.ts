import initModels from "../../database/sequelize/models/index.cjs"
import dbHelper from "../../dbHelper/dbHelper"

const db = initModels()

class RolePermissionRepository {

    private tables: any

    constructor() {
        this.tables = db.RolePermissions
    }

    async create(data: any){
        dbHelper.create(this.tables, data)
    }
}

export default new RolePermissionRepository()