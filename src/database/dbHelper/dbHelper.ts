class dbHelper {

    get orm(): string {

        const active = process.env.ORM;

        if (!active) {
            throw new Error("ORM is not configured");
        }

        return active;
    }

    async create(table: any, data: any, options?: any) {
        // console.log(table)

        if (this.orm === "sequelize") {

            return await table.create(data, options);
        }

    }

    async bulkCreate(table: any, data: any[], options?: any) {
        if (this.orm === "sequelize") {
            return await table.bulkCreate(data, options);
        }
    }

    async findOne(table: any, options: any = {}) {

        if (this.orm === "sequelize") {

            return await table.findOne(options);
        }
    }

    async findAll(table: any, options: any = {})
    {

        // console.log(table)
        if (this.orm === "sequelize") {

            return await table.findAll(
                {
                    ...options
                }
            );
        }
    }

    // async findAll(table: any, where: any = {}, options: any = {}) {
    //
    //     if (this.orm === "sequelize") {
    //         return await table.findAll({
    //             where,
    //             ...options
    //         });
    //     }
    // }


    async update(table: any, where: any, data: any, options?: any) {
        if (this.orm === "sequelize") {

            await table.update(
                data,
                {
                    where,
                    ...options
                }
            );

            return await table.findOne({
                where,
            });
        }
    }

    async delete(table: any, where: any, options: any = {}) {

        if (this.orm === "sequelize") {

            return await table.destroy({
                where,
                ...options
            });
        }
    }

    async count(table: any, where: any, options: any = {}) {
        if (this.orm === "sequelize") {
            return await table.count({
                where,
                ...options,
            });
        }
    }
}

export default new dbHelper();