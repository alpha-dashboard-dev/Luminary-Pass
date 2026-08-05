import checklistAttachmentRepo from "../../repositories/event/checklistAttachment.repository";

import { generateCode } from "../../utils/generateCode";
import {buildWhere} from "../../utils/buildWhere.js";
import checkListRepo from "../../repositories/event/checkList.repository.js";

class checklistAttachmentService {

    // CREATE attachment

    async create(data: any) {

        const checklistExists = await checkListRepo.findOne({
            checklist_code: data.checklistCode
        })

        if (!checklistExists) {
            throw new Error("Checklist does not exist!");
        }

        const attachmentCode = generateCode();

        return await checklistAttachmentRepo.create({
            attachment_code: attachmentCode,
            checklist_code: data.checklistCode,
            file_name: data.fileName,
            file_url: data.fileUrl,
            attachment_type: data.attachmentType,
            file_extension: data.fileExtension,
            file_size: data.fileSize,
            uploaded_by: data.uploadedBy,
        });
    }

    // Get all attachments

    async getAll(query: any = {}, actor: any) {
        // console.log(query.where)
        const where = buildWhere(query);

        if(!actor){
            throw new Error("Unauthorized Access");
        }

        return checklistAttachmentRepo.findAll(
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

    // Get attachment By attachment Code
    async getByAttachmentCode(attachmentCode: string, query: any = {}, actor: any) {

        const attachment = await checklistAttachmentRepo.findOne(
            {
                attachment_code: attachmentCode
            },
            {
                include: Array.isArray(query.include) ? query.include : [],
            }
        );

        if (!attachment) {
            throw new Error("attachment not found");
        }

        return attachment;
    }

    // Get attachment By Any Field
    async getByField(where: any, query: any = {}, actor: any) {
        console.log(where);
        const attachment = await checklistAttachmentRepo.findOne(
            where,
            {
                include: query.include || []
            }
        );

        if (!attachment) {
            throw new Error("attachment not found");
        }

        return attachment;
    }

    // Update attachment
    async update(attachmentCode: string, data: any, actor: any) {

        const attachment = await checklistAttachmentRepo.findOne({
            attachment_code: attachmentCode
        });

        if (!attachment) throw new Error("attachment not found");

        return await checklistAttachmentRepo.update(
            { attachment_code: attachmentCode },
            data
        );
    }

    // Delete attachment

    async delete(attachmentCode: string, actor: any) {
        const attachment = await checklistAttachmentRepo.findOne({
            attachment_code: attachmentCode
        });

        if (!attachment) {
            throw new Error("attachment not found");
        }

        return await checklistAttachmentRepo.delete({
            attachment_code: attachmentCode
        });
    }
}

export default new checklistAttachmentService();