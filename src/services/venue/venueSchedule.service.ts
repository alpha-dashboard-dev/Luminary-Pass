import venueScheduleRepo from "../../repositories/venue/venueSchedule.repository.js";
import { generateCode } from "../../utils/generateCode";
import {buildWhere} from "../../utils/buildWhere.js";
import venueRepo from "../../repositories/venue/venue.repository.js";

class VenueScheduleService {

    // Create Venue

    async create(data: any) {

        const venueExists = await venueRepo.findOne({
            venue_code: data.venueCode
        })

        if(!venueExists) {
                throw new Error("Venue does not exist");
        }

        const scheduleCode = generateCode();

        return await venueScheduleRepo.create({
            venue_schedule_code: scheduleCode,
            venue_code: data.venueCode,
            working_day: data.workingDay,
            start_time: data.startTime,
            end_time: data.endTime,
            status: data.status
        });
    }

    // Get all Venue Schedule

    async getAll(query: any = {}, actor: any) {
        // console.log(query.where)
        const where = buildWhere(query);

        // Admin can see all venues
        // Non-admin can only see their business's venues
        if(actor.roleCode !== "ROL00001") {
            where.business_code = actor.businessCode;
        }


        return venueScheduleRepo.findAll(
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

    // Get schedule By schedule code
    async getByScheduleCode(scheduleCode: string, query: any = {}) {

        const schedule = await venueScheduleRepo.findOne(
            {
                venue_schedule_code: scheduleCode
            },
            {
                include: Array.isArray(query.include) ? query.include : [],
            }
        );

        if (!schedule) {
            throw new Error("Schedule not found");
        }

        return schedule;
    }

    // Get Venue By Any Field
    async getByField(where: any, query: any = {}) {
        // console.log(where);
        const schedule = await venueScheduleRepo.findOne(
            where,
            {
                include: query.include || []
            }
        );

        if (!schedule) {
            throw new Error("Schedule not found");
        }

        return schedule;
    }

    // Update venue
    async update(scheduleCode: string, data: any, actor: any) {

        const schedule = await venueScheduleRepo.findOne({
            venue_schedule_code: scheduleCode
        });

        if (!schedule) throw new Error("venue not found");

        const allowed: any = {};
        if(data.workingDay !== undefined)
            allowed.working_day = data.workingDay
        if (data.startTime !== undefined)
            allowed.start_time = data.startTime;
        if (data.endTime !== undefined)
            allowed.end_time = data.endTime;
        if (data.status !== undefined)
            allowed.status = data.status;

        return await venueScheduleRepo.update(
            { venue_schedule_code: scheduleCode },
            allowed
        );
    }

    // Delete venue
    async delete(scheduleCode: string, actor: any) {
        const schedule = await venueScheduleRepo.findOne({
            venue_schedule_code: scheduleCode
        });

        if (!schedule) {
            throw new Error("Schedule not found");
        }

        return await venueScheduleRepo.delete({
            venue_schedule_code: scheduleCode
        });
    }

    // Deactivate venue

    async deactivate(scheduleCode: string, data: any, actor: any) {

        const schedule = await venueScheduleRepo.findOne({
            venue_schedule_code: scheduleCode
        });

        if (!schedule) {
            throw new Error("Schedule not found");
        }

        return await venueScheduleRepo.deactivate({
                venue_schedule_code: scheduleCode
            },
            data
        );
    }
}

export default new VenueScheduleService();