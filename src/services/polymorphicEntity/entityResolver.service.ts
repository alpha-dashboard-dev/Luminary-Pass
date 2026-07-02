import businessRepo from "../../repositories/busines/business.repository";
import userRepo from "../../repositories/user/user.repository.js";

class EntityResolver {

    /**
     * Supported entities
     */
    private readonly entities: Record<
        string,
        {
            repo: any;
            key: string;
        }
    > = {

        business: {
            repo: businessRepo,
            key: "business_code",
        },

        user: {
            repo: userRepo,
            key: "user_code",
        },

        // organization: {
        //     repo: organizationRepo,
        //     key: "organization_code",
        // },
    };

    /**
     * Get entity configuration
     */
    private getConfig(entityType: string) {

        const config = this.entities[entityType];

        if (!config) {
            throw new Error(`Unsupported entity type: ${entityType}`);
        }

        return config;
    }

    /**
     * Return supported entity types
     */
    getSupportedEntities() {

        return Object.keys(this.entities);
    }

    /**
     * Find single entity
     */
    async find(
        entityType: string,
        entityCode: string
    ) {

        const config = this.getConfig(entityType);

        return await config.repo.findOne({
            [config.key]: entityCode
        });
    }

    /**
     * Find or throw error
     */
    async findOrFail(
        entityType: string,
        entityCode: string
    ) {

        const entity = await this.find(
            entityType,
            entityCode
        );

        if (!entity) {
            throw new Error(
                `${entityType} not found`
            );
        }

        return entity;
    }

    /**
     * Check existence
     */
    async exists(
        entityType: string,
        entityCode: string
    ) {

        const entity = await this.find(
            entityType,
            entityCode
        );

        return !!entity;
    }

    /**
     * Resolve one polymorphic record
     */
    async resolve(record: any) {

        if (!record) {
            return null;
        }

        const entity = await this.find(

            record.entity_type,

            record.entity_code

        );

        return {

            ...(record.toJSON
                ? record.toJSON()
                : record),

            entity

        };
    }

    /**
     * Resolve multiple polymorphic records
     *
     * Prevents N+1 queries.
     */
    async resolveMany(records: any[]) {

        if (!records.length) {
            return [];
        }

        //----------------------------------------
        // Group entity codes by entity type
        //----------------------------------------

        const grouped: Record<string, string[]> = {};

        for (const record of records) {

            const type = record.entity_type;
            const code = record.entity_code;

            if (!grouped[type]) {
                grouped[type] = [];
            }

            if (!grouped[type].includes(code)) {
                grouped[type].push(code);
            }
        }

        //----------------------------------------
        // Load every entity type once
        //----------------------------------------

        const entityMap = new Map();

        for (const entityType of Object.keys(grouped)) {

            const config = this.entities[entityType];

            if (!config) {
                continue;
            }

            const entities = await config.repo.findAll({

                where: {

                    [config.key]: grouped[entityType]

                }

            });

            for (const entity of entities) {

                entityMap.set(

                    `${entityType}:${entity[config.key]}`,

                    entity

                );
            }
        }

        //----------------------------------------
        // Attach entity
        //----------------------------------------

        return records.map(record => {

            const key = `${record.entity_type}:${record.entity_code}`;

            return {

                ...(record.toJSON
                    ? record.toJSON()
                    : record),

                entity: entityMap.get(key) || null

            };

        });

    }

    /**
     * Validate entity before create/update
     */
    async validate(
        entityType: string,
        entityCode: string
    ) {

        const exists = await this.exists(
            entityType,
            entityCode
        );

        if (!exists) {
            throw new Error(
                `${entityType} not found`
            );
        }
    }

    /**
     * Get repository
     */
    getRepository(entityType: string) {

        return this.getConfig(entityType).repo;
    }

    /**
     * Get key
     */
    getKey(entityType: string) {

        return this.getConfig(entityType).key;
    }

}

export default new EntityResolver();