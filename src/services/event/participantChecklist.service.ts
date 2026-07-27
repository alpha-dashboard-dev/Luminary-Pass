import participantChecklistRepo from "../../repositories/event/participantChecklist.repository";

import { generateCode } from "../../utils/generateCode";
import {buildWhere} from "../../utils/buildWhere.js";
import participantRepo from "../../repositories/event/participant.repository.js";
import checkListRepo from "../../repositories/event/checkList.repository.js";

class participantChecklistService {


    async create(data: any) {

        const participantExists = await participantRepo.findOne({
            participant_code: data.participantCode
        })

        if (!participantExists) {
            throw new Error("Participant does not exist");
        }

        const taskExists = await checkListRepo.findOne({
            checklist_code: data.checklistCode
        })

        if(!taskExists) {
            throw new Error("Task does not exist");
        }

        const participantChecklistCode = generateCode();

        return await participantChecklistRepo.create({
            participant_checklist_code: participantChecklistCode,
            participant_code: data.participantCode,
            checklist_code: data.checklistCode,
            submission_url: data.submissionUrl,
            submission_type: data.submissionType,
            submitted_at: data.submittedAt,
            review_status: data.reviewStatus,
            reviewed_by: data.reviewedBy,
            reviewed_at: data.reviewedAt,
            review_notes: data.reviewNotes,
            completion_status: data.reviewCompletionStatus,
            points_awarded: data.pointsAwarded,
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

        const participantChecklist = await participantChecklistRepo.findOne(
            {
                participant_checklist_code: participantChecklistCode
            },
            {
                include: Array.isArray(query.include) ? query.include : [],
            }
        );

        if (!participantChecklist) {
            throw new Error("Participant checklist not found");
        }

        return participantChecklist;
    }

    // Get event By Any Field
    async getByField(where: any, query: any = {}) {
        // console.log(where);
        const checklist = await participantChecklistRepo.findOne(
            where,
            {
                include: query.include || []
            }
        );

        if (!checklist) {
            throw new Error("Participant checklist not found");
        }

        return checklist;
    }

    async update(participantChecklistCode: string, data: any) {

        const checklist = await participantChecklistRepo.findOne({
            participant_checklist_code: participantChecklistCode
        });

        if (!checklist) throw new Error("Participant checklist not found");

        return await participantChecklistRepo.update(
            { participant_checklist_code: participantChecklistCode },
            data
        );
    }


    async delete(participantChecklistCode: string) {
        const checklist = await participantChecklistRepo.findOne({
            participant_checklist_code: participantChecklistCode
        });

        if (!checklist) {
            throw new Error("Participant checklist not found");
        }

        return await participantChecklistRepo.delete({
            participant_checklist_code: participantChecklistCode
        });
    }
}

export default new participantChecklistService();