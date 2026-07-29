import locationRepo from "../../repositories/location/location.repository";
import { generateCode } from "../../utils/generateCode";
import {buildWhere} from "../../utils/buildWhere.js";
import businessRepo from "../../repositories/business/business.repository.js";
import userRepo from "../../repositories/user/user.repository.js";
import eventRepo from "../../repositories/event/event.repository.js";

class LocationService {

    async create(data: any, options?: any) {

        // console.log(data, options);

        switch (data.entityType) {
            case "business":
                const business = await businessRepo.findOne({
                    business_code: data.entityCode,
                });

                if(!business){
                    throw new Error("Business doesn't exist");
                }
                break;

            case "user":

                const user = await userRepo.findOne({
                    user_code: data.entityCode,
                })
                if (!user){
                    throw new Error("User doesn't exist");
                }
                break;

            case "event":
                const event = await eventRepo.findOne({
                    event_code: data.entityCode,
                })
                if (!event){
                    throw new Error("Event doesn't exist");
                }
                break;
        }

        // Add Status column in Location Table

        const locationCode = generateCode();

        return await locationRepo.create({
            location_code: locationCode,
            entity_type: data.entityType || null,
            entity_code: data.entityCode || null,
            address_line_1: data.addressLine1 || null,
            address_line_2: data.addressLine2 || null,
            city: data.city || null,
            state: data.state || null,
            country: data.country || null,
            postal_code: data.postalCode || null,
        }, options);
    }

    // Get all Locations

    async getAll(query: any = {}) {
        // console.log(query)
        const where = buildWhere(query);

        console.log(query.include);

        return locationRepo.findAll({
            where,
            include: Array.isArray(query.include)
                ? query.include
                : [],
            limit: query.limit ? Number(query.limit) : undefined,
            offset: query.offset ? Number(query.offset) : undefined,
            order: [
                [
                    query.sort_by || "created_at",
                    query.sort_order || "DESC"
                ]
            ]
        });
    }

    // Get location By location Code
    async getByLocationCode(locationCode: string, query: any = {}, actor: any) {

        const location = await locationRepo.findOne(
            {
                location_code: locationCode
            },
            {
                include: Array.isArray(query.include) ? query.include : [],
            }
        );

        if (!location) {
            throw new Error("location not found");
        }

        return location;
    }

    // Get location By Any Field
    async getByField(where: any, query: any = {}, actor: any) {
        // console.log(where);
        const location = await locationRepo.findOne(
            where,
            {
                include: query.include || []
            }
        );

        if (!location) {
            throw new Error("location not found");
        }

        return location;
    }

    // Update location
    async update(locationCode: string, data: any, actor: any) {

        const location = await locationRepo.findOne({
            location_code: locationCode
        });

        if (!location) throw new Error("location not found");

        return await locationRepo.update(
            { location_code: locationCode },
            data
        );
    }

    // Delete location

    async delete(locationCode: string, actor: any) {
        const location = await locationRepo.findOne({
            location_code: locationCode
        });

        if (!location) {
            throw new Error("location not found");
        }

        return await locationRepo.delete({
            location_code: locationCode
        });
    }

    // Deactivate location

    async deactivate(locationCode: string, data: any, actor: any) {

        const location = await locationRepo.findOne({
            location_code: locationCode
        });

        if (!location) {
            throw new Error("location not found");
        }

        return await locationRepo.deactivate({
                location_code: locationCode
            },
            data
        );
    }
}

export default new LocationService();