import { INCLUDE_CONFIG } from "./includeConfig";

function buildNestedIncludes(config: any): any[] {

    if (!config?.include) {
        return [];
    }

    // console.log(config)

    return Object.entries(config.include).map(
        ([alias, childConfig]: any) => ({
            association: alias,
            attributes: childConfig.attributes,
            // attributes: childConfig.attributes?.length ? childConfig.attributes : undefined,
            where: childConfig.where,
            required: childConfig.required,
            include: buildNestedIncludes(childConfig),
        })
    );
}

export function buildIncludes(model: any, includes: any[] = []) {

    const associations = model.associations || {};

    // console.log(associations);

    const modelName = model.name;
    // console.log(modelName)

    return includes.map(item => {
        // const alias = item.alias || item;
        const alias = typeof item === "string" ? item : item.association || item.alias;

        console.log(alias)

        if (!associations[alias]) {
            return null;
        }

        const config = INCLUDE_CONFIG?.[modelName]?.[alias] || {};

    //     return {
    //         association: alias,
    //         attributes: config.attributes,
    //         where: config.where,
    //         required: config.required,
    //         include: buildNestedIncludes(config),
    //     };
    // }).filter(Boolean);

        return {
            association: alias,

            // attributes: item.attributes ?? config.attributes,
            attributes: item.attributes?.length ? item.attributes : config.attributes,

            where: item.where ?? config.where,

            required: item.required ?? config.required,

            include: item.include ? buildIncludes(associations[alias].target, item.include) : buildNestedIncludes(config)
        };

    }).filter(Boolean);
}