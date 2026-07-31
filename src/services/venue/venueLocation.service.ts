import venueLocationRepo from "../../repositories/venue/venueLocation.repository";
import { generateCode } from "../../utils/generateCode";
import {buildWhere} from "../../utils/buildWhere.js";
import venueRepo from "../../repositories/venue/venue.repository.js";

class venueLocationService {

    // Create location

    async create(data: any, options?: any) {

        // console.log(data);

        const venueExists = await venueRepo.findOne({
            venue_code: data.venueCode
        })

        if (!venueExists) {
            throw new Error("Venue does not exist");
        }

        const locationCode = generateCode();

        return await venueLocationRepo.create(
            {
                venue_location_code: locationCode,
                venue_code: data.venueCode,
                address: data.address,
                area: data.area,
                city: data.city,
                country: data.country,
                map_link: data.mapLink,
                status: data.status
            },
            options
        );
    }

    // Get all locations

    async getAll(query: any = {}, actor: any) {
        const where = buildWhere(query);

        return venueLocationRepo.findAll({
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

    // Get location By location code
    async getByVenueLocationCode(locationCode: string, query: any = {}, actor: any) {

        const location = await venueLocationRepo.findOne(
            {
                venue_location_code: locationCode
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
    async getByField(where: any, query: any = {}) {
        // console.log(where);
        const location = await venueLocationRepo.findOne(
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

        const location = await venueLocationRepo.findOne({
            venue_location_code: locationCode
        });

        if (!location) throw new Error("location not found");

        return await venueLocationRepo.update(
            { venue_location_code: locationCode },
            data
        );
    }

    // Delete location

    async delete(locationCode: string, actor: any) {
        const location = await venueLocationRepo.findOne({
            venue_location_code: locationCode
        });

        if (!location) {
            throw new Error("location not found");
        }

        return await venueLocationRepo.delete({
            venue_location_code: locationCode
        });
    }

    // Deactivate location

    async deactivate(locationCode: string, data: any, actor: any) {

        const location = await venueLocationRepo.findOne({
            venue_location_code: locationCode
        });

        if (!location) {
            throw new Error("location not found");
        }

        return await venueLocationRepo.deactivate({
                venue_location_code: locationCode
            },
            data
        );
    }
}

export default new venueLocationService();