import User from "../models/user.model";

class UserRepository {

    async create(data: any) {
        return await User.create(data);
    }

    async findOne(where: any) {
        return await User.findOne({ where });
    }

    async findAll(where: any = {}) {
        return await User.findAll({ where });
    }

    async update(where: any, data: any) {
        await User.update(data, { where });

        return await User.findOne({ where });
    }

    async delete(where: any) {
        return await User.destroy({ where });
    }
}

export default new UserRepository();