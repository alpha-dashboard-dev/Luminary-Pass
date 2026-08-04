import eventRepo from "../../repositories/event/event.repository";
import initModels from "../../database/sequelize/models/index.cjs";
import { generateCode } from "../../utils/generateCode";
import {buildWhere} from "../../utils/buildWhere.js";
import venueRepo from "../../repositories/venue/venue.repository.js";
import checklistRepo from "../../repositories/event/checkList.repository.js";
import {
    addHoursToNow,
    normalizeDateOnly,
    normalizeDeadline,
    normalizeTimeToHHMM,
    parseDate
} from "../../utils/dateTimeFormat.js";
import attachmentService from "../mediaAttachment/attachment.service.js";
const db = initModels();

class EventService {

    // Create event
    async create(data: any, actor: any){
        // console.log(data)

        const { name, startDate, endDate, startTime, applicationDeadline, influencerCapacity, description, influencerOffer, offerAmount,
            dressCode, additionalGuests, specialRequirements, status, taskDetails, images } = data

        console.log(images)

        const transaction = await db.sequelize.transaction();

        try{

            const eventCode = generateCode()
            const invitationCode = generateCode()
            const venue = await venueRepo.findOne({
                business_code: actor.businessCode,
            })

            // console.log(venue.venue_code)

            if(!venue) {
                throw new Error("Venue does not exist")
            }
        //
            const event = await eventRepo.create(
                {
                    event_code: eventCode,
                    business_code: actor.businessCode,
                    venue_code: venue.venue_code,
                    title: name,
                    description: description,
                    start_date: startDate,
                    end_date: endDate,
                    start_time: startTime,
                    application_deadline: parseDate(applicationDeadline),
                    influencer_capacity: influencerCapacity,
                    description_influencer_received: influencerOffer,
                    offer_value: offerAmount,
                    dress_code: dressCode,
                    additional_guests: additionalGuests,
                    special_instructions: specialRequirements,
                    created_by: actor.userCode,
                    status: status,
                },
                {   transaction }
            );

            const checklistData = taskDetails.map((task: any) => {
                const hours = Number(task.taskDeadline)

                return {
                    checklist_code: generateCode(),
                    event_code: eventCode,
                    description: task.taskDescription,
                    submission_deadline: addHoursToNow(hours) // deadline calculated from now with given hours, minimum 24 hours
                }
            })
            const eventTasks = await checklistRepo.bulkCreate(
                checklistData,
                {   transaction }
            );

            await transaction.commit();

            const options = {
                entityType: "event",
                entityCode: eventCode,
                title: name,
                mediaType: "image",
                attachmentCategory: "gallery",
                uploadedBy: actor.userCode,
            }

            const attachment = await attachmentService.uploadMultiple(images, options)


            return{
                event,
                eventTasks,
                attachment,
            }

        }catch(err){
            await transaction.rollback();

            throw err;
        }
    }

    // Get all events
    async getAll(query: any = {}) {
        // console.log(query.where)
        const where = buildWhere(query);

        return eventRepo.findAll(
            where,
            {
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