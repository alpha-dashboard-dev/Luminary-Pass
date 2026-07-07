import participantChecklistRepo from "../../repositories/event/participantChecklist.repository";

import { generateCode } from "../../utils/generateCode";
import {buildWhere} from "../../utils/buildWhere.js";

class participantChecklistService {


    async create(data: any, actor: any) {

        if (!actor) throw new Error("Unauthorized");


        const participantChecklistCode = generateCode();

        return await participantChecklistRepo.create({
            participant_checklist_code: participantChecklistCode,
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

    async getAll(query: any = {}, actor: any) {
        // console.log(query.where)
        const where = buildWhere(query);

        if(!actor){
            throw new Error("Unauthorized Access");
        }

        return participantChecklistRepo.findAll({
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


    async getByParticipantChecklistCode(participantChecklistCode: string, query: any = {}) {

        const event = await participantChecklistRepo.findOne(
            {
                participant_checklist_code: participantChecklistCode
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
        const event = await participantChecklistRepo.findOne(
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

    async update(participantChecklistCode: string, data: any) {

        const event = await participantChecklistRepo.findOne({
            participant_checklist_code: participantChecklistCode
        });

        if (!event) throw new Error("event not found");

        return await participantChecklistRepo.update(
            { participant_checklist_code: participantChecklistCode },
            data
        );
    }


    async delete(participantChecklistCode: string) {
        const event = await participantChecklistRepo.findOne({
            participant_checklist_code: participantChecklistCode
        });

        if (!event) {
            throw new Error("event not found");
        }

        return await participantChecklistRepo.delete({
            participant_checklist_code: participantChecklistCode
        });
    }
}

export default new participantChecklistService();