import checklistRepo from "../../repositories/event/checkList.repository";

import { generateCode } from "../../utils/generateCode";
import {buildWhere} from "../../utils/buildWhere.js";
import eventRepo from "../../repositories/event/event.repository.js";

class checklistService {

    // CREATE checklist

    async create(data: any) {

        const event = await eventRepo.findOne({
            event_code: data.eventCode
        })

        if (!event) {
            throw new Error("Event does not exist");
        }

        const checklistCode = generateCode();

        return await checklistRepo.create({
            checklist_code: checklistCode,
            event_code: data.eventCode,
            title: data.title,
            description: data.description,
            checklist_type: data.checklistType,
            points: data.points,
            submission_deadline: data.submissionDeadline,
            is_required: data.isRequired,
            display_order: data.displayOrder,
            status: data.status,
        });
    }

    // Get all checklists

    async getAll(query: any = {}, actor: any) {
        // console.log(query.where)
        const where = buildWhere(query);

        return checklistRepo.findAll(
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

    // Get checklist By checklist Code
    async getByChecklistCode(checklistCode: string, query: any = {}, actor: any) {

        const checklist = await checklistRepo.findOne(
            {
                checklist_code: checklistCode
            },
            {
                include: Array.isArray(query.include) ? query.include : [],
            }
        );

        if (!checklist) {
            throw new Error("checklist not found");
        }

        return checklist;
    }

    // Get checklist By Any Field
    async getByField(where: any, query: any = {}, actor: any) {
        console.log(where);
        const checklist = await checklistRepo.findOne(
            where,
            {
                include: query.include || []
            }
        );

        if (!checklist) {
            throw new Error("checklist not found");
        }

        return checklist;
    }

    // Update checklist
    async update(checklistCode: string, data: any, actor: any) {

        const checklist = await checklistRepo.findOne({
            checklist_code: checklistCode
        });

        if (!checklist) throw new Error("checklist not found");

        return await checklistRepo.update(
            { checklist_code: checklistCode },
            data
        );
    }

    // Delete checklist

    async delete(checklistCode: string, actor: any) {
        const checklist = await checklistRepo.findOne({
            checklist_code: checklistCode
        });

        if (!checklist) {
            throw new Error("checklist not found");
        }

        return await checklistRepo.delete({
            checklist_code: checklistCode
        });
    }
}

export default new checklistService();