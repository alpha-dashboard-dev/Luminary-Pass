import venueRepo from "../../repositories/venue/venue.repository";
import { generateCode } from "../../utils/generateCode";
import {buildWhere} from "../../utils/buildWhere.js";

class VenueService {

    // Create Venue

    async create(data: any, actor: any) {

        const emailExists = await venueRepo.findOne(
            {
                email: data.email
            }
        );

        if (emailExists) {
            throw new Error("Email already exists");
        }

        const phoneExists = await venueRepo.findOne({
            phone: data.phone
        })

        if (phoneExists) {
            throw new Error("Phone already exists");
        }

        const venueCode = generateCode();

        return await venueRepo.create({
            venue_code: venueCode,
            business_code: data.businessCode,
            name: data.name,
            email: data.email.trim().toLowerCase(),
            phone: data.phone,
            description: data.description,
            status: data.status
        });
    }

    // Get all venues

    async getAll(query: any = {}, actor: any) {
        // console.log(query.where)
        const where = buildWhere(query);

        // if(!actor){
        //     throw new Error("Unauthorized Access");
        // }

        return venueRepo.findAll({
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

    // Get Venue By venue code
    async getByVenueCode(venueCode: string, query: any = {}, actor: any) {

        const venue = await venueRepo.findOne(
            {
                venue_code: venueCode
            },
            {
                include: Array.isArray(query.include) ? query.include : [],
            }
        );

        if (!venue) {
            throw new Error("Venue not found");
        }

        return venue;
    }

    // Get Venue By Any Field
    async getByField(where: any, query: any = {}) {
        // console.log(where);
        const venue = await venueRepo.findOne(
            where,
            {
                include: query.include || []
            }
        );

        if (!venue) {
            throw new Error("venue not found");
        }

        return venue;
    }

    // Update venue
    async update(venueCode: string, data: any, actor: any) {

        const venue = await venueRepo.findOne({
            venue_code: venueCode
        });

        if (!venue) throw new Error("venue not found");

        const allowed: any = {};
        if (data.name !== undefined)
            allowed.name = data.name;
        if (data.email !== undefined)
            allowed.email = data.email;
        if (data.phone !== undefined)
            allowed.phone = data.phone;
        if (data.description !== undefined)
            allowed.description = data.description;
        if (data.status !== undefined)
            allowed.status = data.status;

        return await venueRepo.update(
            { venue_code: venueCode },
            allowed
        );
    }

    // Delete venue

    async delete(venueCode: string, actor: any) {
        const venue = await venueRepo.findOne({
            venue_code: venueCode
        });

        if (!venue) {
            throw new Error("Venue not found");
        }

        return await venueRepo.delete({
            venue_code: venueCode
        });
    }

    // Deactivate venue

    async deactivate(venueCode: string, data: any, actor: any) {

        const venue = await venueRepo.findOne({
            venue_code: venueCode
        });

        if (!venue) {
            throw new Error("Venue not found");
        }

        return await venueRepo.deactivate({
                venue_code: venueCode
            },
            data
        );
    }
}

export default new VenueService();