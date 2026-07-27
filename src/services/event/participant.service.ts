import participantRepo from "../../repositories/event/participant.repository";

import { generateCode } from "../../utils/generateCode";
import {buildWhere} from "../../utils/buildWhere.js";
import eventRepo from "../../repositories/event/event.repository.js";
import influencerRepo from "../../repositories/influencer/influencer.repository.js";

class participantService {

    // CREATE participant

    async create(data: any) {

        const event = await eventRepo.findOne({
            event_code: data.eventCode
        })

        if (!event) {
            throw new Error("Event does not exist");
        }

        const influencer = await influencerRepo.findOne({
            influencer_code: data.influencerCode
        })

        if (!influencer) {
            throw new Error("influencer does not exist");
        }

        // if source is invitation verify sourceCode from invitation table
        // or if source is application verify sourceCode from event table (event_code)


        const participantCode = generateCode();

        return await participantRepo.create({
            participant_code: participantCode,
            event_code: data.eventCode,
            influencer_code: data.influencerCode,
            source: data.source,
            source_code: data.sourceCode,
            status: data.status,
        });
    }

    // Get all participants

    async getAll(query: any = {}, actor: any) {
        // console.log(query.where)
        const where = buildWhere(query);

        if(!actor){
            throw new Error("Unauthorized Access");
        }

        return participantRepo.findAll({
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

    // Get participant By participant Code
    async getByParticipantCode(participantCode: string, query: any = {}, actor: any) {

        const participant = await participantRepo.findOne(
            {
                participant_code: participantCode
            },
            {
                include: Array.isArray(query.include) ? query.include : [],
            }
        );

        if (!participant) {
            throw new Error("participant not found");
        }

        return participant;
    }

    // Get participant By Any Field
    async getByField(where: any, query: any = {}, actor: any) {
        console.log(where);
        const participant = await participantRepo.findOne(
            where,
            {
                include: query.include || []
            }
        );

        if (!participant) {
            throw new Error("participant not found");
        }

        return participant;
    }

    // Update participant
    async update(participantCode: string, data: any, actor: any) {

        const participant = await participantRepo.findOne({
            participant_code: participantCode
        });

        if (!participant) throw new Error("participant not found");

        return await participantRepo.update(
            { participant_code: participantCode },
            data
        );
    }

    // Delete participant

    async delete(participantCode: string, actor: any) {
        const participant = await participantRepo.findOne({
            participant_code: participantCode
        });

        if (!participant) {
            throw new Error("participant not found");
        }

        return await participantRepo.delete({
            participant_code: participantCode
        });
    }

    async participantCheckin(participantCode: string, actor: any) {

    }
}

export default new participantService();