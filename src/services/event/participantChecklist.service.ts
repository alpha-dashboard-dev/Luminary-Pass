import participantChecklistRepo from "../../repositories/event/participantChecklist.repository";

import { generateCode } from "../../utils/generateCode";
import {buildWhere} from "../../utils/buildWhere.js";
import participantRepo from "../../repositories/event/participant.repository.js";
import checkListRepo from "../../repositories/event/checkList.repository.js";
import instagramService from "../socialMedia/instagram/instagram.service.js";

class participantChecklistService {


    async create(data: any) {

        // console.log(data);

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
            submitted_at: data.submittedAt || new Date(),
            review_status: data.reviewStatus,
            reviewed_by: data.reviewedBy || null,
            reviewed_at: data.reviewedAt || null,
            review_notes: data.reviewNotes || null,
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

        return participantChecklistRepo.findAll(
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

        // console.log(data);
        const allowed : any = {}

        if(data.reviewNotes !== undefined)
            allowed.review_notes = data.reviewNotes;
        if(data.pointsAwarded !== undefined)
            allowed.points_awarded = data.pointsAwarded;
        if(data.reviewedAt !== undefined)
            allowed.reviewed_at = data.reviewedAt || new Date();
        if(data.reviewStatus !== undefined)
            allowed.review_status = data.reviewStatus;
        if(data.reviewedBy !== undefined)
            allowed.reviewed_by = data.reviewedBy;

        // console.log(allowed)

        return await participantChecklistRepo.update(
            { participant_checklist_code: participantChecklistCode },
            allowed
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

    async reviewParticipantTask(participantChecklistCode: string, data: any, actor: any) {

        // console.log(data, actor)

        const task = await participantChecklistRepo.findOne({
            participant_checklist_code: participantChecklistCode
        })

        if(!task){
            throw new Error("Participant Task does not exist");
        }

        // console.log(task);

        const influencer = await participantRepo.findOne({
            participant_code: task.participant_code
        })

        // console.log(influencer.influencer_code);

        const media =  await instagramService.getMedia(influencer.influencer_code)

        // console.log(instagramMedia);

        const matched = media.find(m => m.permalink === task.submission_url);

        if (!matched) {
            throw new Error("Instagram post not found.");
        }

        // console.log(matched);
        let reviewTask;

        if(task.review_status === "pending")
        {
            reviewTask = await this.update(participantChecklistCode, {
                ...data,
                reviewedBy: actor.businessCode
            })
        }else {
            throw new Error(`Task is already ${task.review_status}`);
        }


        return reviewTask;
    }

}

export default new participantChecklistService();