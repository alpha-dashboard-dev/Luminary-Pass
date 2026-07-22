import eventRepo from "../../repositories/event/event.repository";

import { generateCode } from "../../utils/generateCode";
import {buildWhere} from "../../utils/buildWhere.js";
import businessRepo from "../../repositories/business/business.repository.js";
import venueRepo from "../../repositories/venue/venue.repository.js";
import userRepo from "../../repositories/user/user.repository.js";

class EventService {

    // Create event

    async create(data: any) {

        const business = await businessRepo.findOne({
            business_code: data.businessCode,
        })

        if(!business) {
            throw new Error("Business does not exist")
        }

        const venue = await venueRepo.findOne({
            venue_code: data.venueCode
        })

        if(!venue) {
            throw new Error("Venue does not exist")
        }

        const creator = await userRepo.findOne({
            user_code: data.createdBy
        })

        if(!creator) {
            throw new Error("Creator does not exist")
        }

        const eventCode = generateCode();

        // add separate column for start & end date and time

        return await eventRepo.create({
            event_code: eventCode,
            business_code: data.businessCode,
            venue_code: data.venueCode,
            title: data.title,
            description: data.description,
            start_datetime: data.startDateTime,
            end_datetime: data.endDateTime,
            application_deadline: data.applicationDeadline,
            influencer_capacity: data.influencerCapacity,
            dress_code: data.dressCode,
            special_instructions: data.specialInstructions,
            visibility: data.visibility,
            created_by: data.createdBy,
            status: data.status,
        });
    }

    // Get all events

    async getAll(query: any = {}) {
        // console.log(query.where)
        const where = buildWhere(query);

        return eventRepo.findAll({
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

    // Get event By event Code
    async getByEventCode(eventCode: string, query: any = {}) {

        const event = await eventRepo.findOne(
            {
                event_code: eventCode
            },
            {
                include: Array.isArray(query.include) ? query.include : [],
            }
        );

        if (!event) {
            throw new Error("event not found");
        }

        return event;
    }

    // Get event By Any Field
    async getByField(where: any, query: any = {}) {
        console.log(where);
        const event = await eventRepo.findOne(
            where,
            {
                include: query.include || []
            }
        );

        if (!event) {
            throw new Error("event not found");
        }

        return event;
    }

    // Update event
    async update(eventCode: string, data: any, actor: any) {

        const event = await eventRepo.findOne({
            event_code: eventCode
        });

        if (!event) throw new Error("event not found");

        return await eventRepo.update(
            { event_code: eventCode },
            data
        );
    }

    // Delete event

    async delete(eventCode: string, actor: any) {
        const event = await eventRepo.findOne({
            event_code: eventCode
        });

        if (!event) {
            throw new Error("event not found");
        }

        return await eventRepo.delete({
            event_code: eventCode
        });
    }
}

export default new EventService();