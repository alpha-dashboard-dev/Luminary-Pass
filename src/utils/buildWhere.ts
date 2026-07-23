import { FILTER_CONFIG } from "./filter.config";
import { Op } from "sequelize";

export function buildWhere(filters: any = {}) {

    console.log(filters);

    const where: any = {};

    // console.log(where)

    // console.log(filters)
    // console.log(FILTER_CONFIG);

    for (const key in filters) {

        const value = filters[key];

        if (value === undefined || value === null || value === "") {
            continue;
        }

        const config = FILTER_CONFIG[key];

        if (!config) continue;

        //  SEARCH (OR condition)
        if (config.type === "or") {

            where[Op.or] = config.fields.map((f: any) => ({

                [f.field]: {
                    [f.op]:
                        f.op === Op.like
                            ? `%${value}%`
                            : value
                }

            }));

            continue;
        }
        where[config.field] = {
            [config.op]: value
        };
    }

    return where;
}