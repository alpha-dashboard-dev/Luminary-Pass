import attachmentRepo from "../../repositories/venue/venueAttachment.repository";
import { generateCode } from "../../utils/generateCode";
import {buildWhere} from "../../utils/buildWhere.js";

class attachmentService {

    // Create attachment

    async create(data: any, actor: any) {

        const attachmentCode = generateCode();

        return await attachmentRepo.create({
            attachment_code: attachmentCode,
            venue_code: data.venueCode,
            attachment_type: data.attachmentType,
            attachment_platform_category: data.attachmentPlatformCategory,
            file_name: data.fileName,
            file_extension: data.fileExtension,
            file_size: data.fileSize,
            url: data.url,
            is_primary: data.isPrimary,
            visibility: data.visibility,
            uploaded_by: data.uploadedBy,
            status: data.status,
        });
    }

    // Get all attachments

    async getAll(query: any = {}, actor: any) {
        const where = buildWhere(query);
        return attachmentRepo.findAll({
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

    // Get attachment By attachment code
    async getByAttachmentCode(attachmentCode: string, query: any = {}, actor: any) {

        const attachment = await attachmentRepo.findOne(
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
    async getByField(where: any, query: any = {}) {
        // console.log(where);
        const attachment = await attachmentRepo.findOne(
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

        const attachment = await attachmentRepo.findOne({
            attachment_code: attachmentCode
        });

        if (!attachment) throw new Error("attachment not found");


        return await attachmentRepo.update(
            { attachment_code: attachmentCode },
            data
        );
    }

    // Delete attachment

    async delete(attachmentCode: string, actor: any) {
        const attachment = await attachmentRepo.findOne({
            attachment_code: attachmentCode
        });

        if (!attachment) {
            throw new Error("attachment not found");
        }

        return await attachmentRepo.delete({
            attachment_code: attachmentCode
        });
    }

    // Deactivate attachment

    async deactivate(attachmentCode: string, data: any, actor: any) {

        const attachment = await attachmentRepo.findOne({
            attachment_code: attachmentCode
        });

        if (!attachment) {
            throw new Error("attachment not found");
        }

        return await attachmentRepo.deactivate({
                attachment_code: attachmentCode
            },
            data
        );
    }
}

export default new attachmentService();