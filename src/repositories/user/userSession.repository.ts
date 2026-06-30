import UserSession from "../../database/sequelize/models/index.cjs";
import dbHelper from "../../dbHelper/dbHelper.js";
import { buildIncludes } from "../../utils/buildInclude.js";

class UserSessionRepository {

    async create(data: any) {
        return await UserSession.create(data);
    }

    async findOne(where: any) {
        return await UserSession.findOne({ where });
    }

    async update(where: any, data: any) {
        await UserSession.update(data, { where });
        return await UserSession.findOne({ where });
    }

    async delete(where: any) {
        return await UserSession.destroy({ where });
    }
}

export default new UserSessionRepository();