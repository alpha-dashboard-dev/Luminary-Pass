import eventRepo from "../../repositories/event/event.repository";
import initModels from "../../database/sequelize/models/index.cjs";
import { generateCode } from "../../utils/generateCode";
import {buildWhere} from "../../utils/buildWhere.js";
import businessRepo from "../../repositories/business/business.repository.js";
import venueRepo from "../../repositories/venue/venue.repository.js";
import userRepo from "../../repositories/user/user.repository.js";
import checklistRepo from "../../repositories/event/checkList.repository.js";
import {normalizeDateOnly, normalizeDeadline, normalizeTimeToHHMM, parseDate} from "../../utils/dateTimeFormat.js";
import attachmentService from "../mediaAttachment/attachment.service.js";

const db = initModels();

class EventService {

    // Create event
    async create(data: any, actor: any){
        // console.log(data)

        const { eventName, eventStartDate, eventEndDate, eventStartTime,
            applicationDeadline, influencerCapacity, description, influencerOfferDescription, offerValue,
            dressCode, additionalGuests, specialRequirements, taskDescription, taskDeadline,
            eventStatus, images } = data

        const transaction = await db.sequelize.transaction();

        try{

            const eventCode = generateCode()
            const checklistCode = generateCode()
            const venue = await venueRepo.findOne({
                business_code: actor.businessCode,
            })

            // console.log(venue.venue_code)

            if(!venue) {
                throw new Error("Venue does not exist")
            }

            const event = await eventRepo.create(
                {
                    event_code: eventCode,
                    business_code: actor.businessCode,
                    venue_code: venue.venue_code,
                    title: eventName,
                    description: description,
                    start_date: normalizeDateOnly(eventStartDate),
                    end_date: normalizeDateOnly(eventEndDate),
                    start_time: normalizeTimeToHHMM(eventStartTime),
                    application_deadline: parseDate(applicationDeadline),
                    influencer_capacity: influencerCapacity,
                    description_influencer_received: influencerOfferDescription,
                    offer_value: offerValue,
                    dress_code: dressCode,
                    additional_guests: additionalGuests,
                    special_instructions: specialRequirements,
                    status: eventStatus,
                },
                {   transaction }
            );

            const eventTask = await checklistRepo.create(
                {
                    checklist_code: checklistCode,
                    event_code: eventCode,
                    description: taskDescription || null,
                    submission_deadline: parseDate(taskDeadline) || null,
                },
                {   transaction }
            );

            await transaction.commit();

            const options = {
                entityType: "event",
                entityCode: eventCode,
                title: eventName,
                mediaType: "image",
                attachmentCategory: "gallery",
                uploadedBy: actor.userCode,
            }


            const attachment = await attachmentService.uploadMultiple(images, options)
            return{
                event,
                eventTask,
                attachment,
            }

        }catch(err){
            await transaction.rollback();

            throw err;
        }
    }

    // async create(data: any, actor: any) {
    //
    //     // console.log(data.eventData.eventName, actor);
    //     const business = await businessRepo.findOne({
    //         business_code: data.businessCode,
    //     })
    //
    //     if(!business) {
    //         throw new Error("Business does not exist")
    //     }
    //
    //     const venue = await venueRepo.findOne({
    //         venue_code: data.venueCode
    //     })
    //
    //     if(!venue) {
    //         throw new Error("Venue does not exist")
    //     }
    //
    //     const creator = await userRepo.findOne({
    //         user_code: data.createdBy
    //     })
    //
    //     if(!creator) {
    //         throw new Error("Creator does not exist")
    //     }
    //
    //     const eventCode = generateCode();
    //
    //     // add separate column for start & end date and time
    //
    //     return await eventRepo.create({
    //         event_code: eventCode,
    //         business_code: data.businessCode,
    //         venue_code: data.venueCode,
    //         title: data.title,
    //         description: data.description,
    //         start_datetime: data.startDateTime,
    //         end_datetime: data.endDateTime,
    //         application_deadline: data.applicationDeadline,
    //         influencer_capacity: data.influencerCapacity,
    //         dress_code: data.dressCode,
    //         special_instructions: data.specialInstructions,
    //         visibility: data.visibility,
    //         created_by: data.createdBy,
    //         status: data.status,
    //     });
    // }

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
        // console.log(where);
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

    async getByFilter(filter: any = {}) {
        const event = await eventRepo.findOne({
            filter,
        })
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

    async totalEventByBusiness(businessCode: string){

        let totalEvents;

        totalEvents = await eventRepo.count({
            business_code: businessCode
        })

        return totalEvents;
    }
}

export default new EventService();