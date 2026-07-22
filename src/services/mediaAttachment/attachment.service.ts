import attachmentRepo from "../../repositories/mediaAttachment/attachment.repository";

import FolderGenerator from "./helpers/folderGenerator";
import FileNameGenerator from "./helpers/fileNameGenerator";
import EntityResolver from "./helpers/entityResolver";

import AttachmentValidator from "./validator/attachmentValidator";

import { generateCode } from "../../utils/generateCode";
import StorageFactory from "./storageFactory.service";


class AttachmentService {


    private storage:any;


    constructor(){
        this.storage = StorageFactory.make();
    }

    /**
     * Upload Single File
     */
    async upload(file:any, options:any){

        // console.log(file, options);

        AttachmentValidator.validate(file);


        const entity = await EntityResolver.exists(
            options.entityType,
            options.entityCode
        );

        // console.log(entity)

        if(!entity){
            throw new Error(`${options.entityType} not found`);
        }
        const folder = FolderGenerator.generate(options.entityType, options.attachmentCategory);

        // console.log(file.filename)

        const fileName = FileNameGenerator.generate(options.entityCode, options.attachmentCategory, file.filename);

        const uploaded = await this.storage.upload(
                file,
                {
                    folder,
                    fileName
                }
            );
        // console.log(uploaded);

        const attachment = await attachmentRepo.create({
                attachment_code: generateCode(),
                entity_type: options.entityType,
                entity_code: options.entityCode,
                attachment_category: options.attachmentCategory,
                title: options.title || null,
                media_type: options.mediaType,
                disk: uploaded.disk,
                folder,
                file_name: fileName,
                original_file_name: file.filename,
                file_extension: fileName.split(".").pop(),
                mime_type: file.mimetype,
                file_size: file.size || null,
                public_id: uploaded.publicId || null,
                secure_url: uploaded.secureUrl,
                uploaded_by: options.uploadedBy,
                is_primary: options.isPrimary ?? false,
                visibility: options.visibility ?? "private",
                display_order: options.displayOrder ?? 1,
                status: "active"
            });
        return attachment;
    }

    /**
     * Upload Multiple Files
     */
    async uploadMultiple(files:any[], options:any){

        // console.log(files, options);

        const attachments=[];
        for(const file of files){
            const attachment = await this.upload(file, options);
            attachments.push(attachment);
        }
        return attachments;
    }


    /**
     * Delete Attachment
     */
    async delete(attachmentCode:string){


        const attachment = await attachmentRepo.findOne({
            attachment_code: attachmentCode
        });

        if(!attachment){
            throw new Error("Attachment not found");
        }

        if(attachment.public_id){
            await this.storage.delete(attachment.public_id);
        }



        await attachmentRepo.update(

            {
                attachment_code:
                attachmentCode
            },

            {
                status:"deleted"
            }

        );



        return {
            message:
                "Attachment deleted successfully"
        };


    }

    /**
     * Replace Existing Attachment
     */
    async replace(
        attachmentCode:string,
        file:any
    ){


        const attachment =
            await attachmentRepo.findOne({

                attachment_code:
                attachmentCode

            });



        if(!attachment){

            throw new Error(
                "Attachment not found"
            );

        }



        AttachmentValidator.validate(file);



        const folder =
            attachment.folder;



        const fileName =
            FileNameGenerator.generate(

                attachment.entity_code,

                attachment.attachment_category,

                file.filename

            );



        const uploaded =
            await this.storage.replace(

                attachment.public_id,

                file,

                {
                    folder,
                    fileName
                }

            );



        return await attachmentRepo.update(

            {
                attachment_code:
                attachmentCode
            },


            {

                file_name:
                fileName,


                original_file_name:
                file.filename,


                file_size:
                file.size,


                mime_type:
                file.mimetype,


                public_id:
                uploaded.publicId,


                secure_url:
                uploaded.secureUrl

            }

        );


    }





    /**
     * Move Attachment
     */
    async move(attachmentCode:string, newFolder:string){


        const attachment = await attachmentRepo.findOne({
                attachment_code: attachmentCode
            });



        if(!attachment){
            throw new Error("Attachment not found");
        }

        const newPublicId = `${newFolder}/${attachment.file_name}`;
        const moved = await this.storage.move(

                attachment.public_id,

                {
                    newPublicId
                }

            );



        return await attachmentRepo.update(

            {
                attachment_code: attachmentCode
            },


            {
                folder: newFolder,
                public_id: moved.public_id,
                secure_url: moved.secure_url

            }

        );


    }


}


export default new AttachmentService();































// import attachmentRepo from "../../repositories/mediaAttachment/attachment.repository";
// import { generateCode } from "../../utils/generateCode";
// import {buildWhere} from "../../utils/buildWhere.js";
// import businessRepo from "../../repositories/business/business.repository.js";
// import userRepo from "../../repositories/user/user.repository.js";
// import eventRepo from "../../repositories/event/event.repository.js";
// import orgRepo from "../../repositories/organization/organization.repository.js";
// import influencerRepo from "../../repositories/influencer/influencer.repository.js";
//
// class attachmentService {
//
//     // Create attachment
//
//     async create(data: any) {
//
//
//         switch (data.entityType) {
//             case "organization":
//                 const organization = orgRepo.findOne({
//                     organization_code: data.entityCode,
//                 })
//                 if (!organization){
//                     throw new Error("Organization doesn't exist");
//                 }
//                 break;
//
//             case "business":
//                 const business = await businessRepo.findOne({
//                     business_code: data.entityCode,
//                 });
//
//                 if(!business){
//                     throw new Error("Business doesn't exist");
//                 }
//                 break;
//
//             case "users":
//
//                 const user = await userRepo.findOne({
//                     user_code: data.entityCode,
//                 })
//                 if (!user){
//                     throw new Error("User doesn't exist");
//                 }
//                 break;
//
//             case "events":
//                 const event = await eventRepo.findOne({
//                     event_code: data.entityCode,
//                 })
//                 if (!event){
//                     throw new Error("Event doesn't exist");
//                 }
//                 break;
//
//             case "influencers":
//                 const influencer = await influencerRepo.findOne({
//                     influencer_code: data.entityCode,
//                 })
//                 if (!influencer){
//                     throw new Error("Influencer doesn't exist");
//                 }
//                 break;
//         }
//
//         const attachmentUploader = await userRepo.findOne({
//             user_code: data.uploadedBy,
//         })
//
//         if (!attachmentUploader){
//             throw new Error("User doesn't exist");
//         }
//
//         const attachmentCode = generateCode();
//
//         return await attachmentRepo.create({
//             attachment_code: attachmentCode,
//             entity_type: data.entityType,
//             entity_code: data.entityCode,
//             title: data.title,
//             media_type: data.mediaType,
//             file_name: data.fileName,
//             file_extension: data.fileExtension,
//             file_size: data.fileSize,
//             url: data.url,
//             is_primary: data.isPrimary,
//             visibility: data.visibility,
//             uploaded_by: data.uploadedBy,
//             display_order: data.displayOrder,
//             status: data.status,
//         });
//     }
//
//     // Get all attachments
//
//     async getAll(query: any = {}) {
//         const where = buildWhere(query);
//         return attachmentRepo.findAll({
//             where,
//             include: Array.isArray(query.include)
//                 ? query.include
//                 : [],
//             limit: query.limit ? Number(query.limit) : undefined,
//             offset: query.offset ? Number(query.offset) : undefined,
//             order: [
//                 [
//                     query.sort_by || "created_at",
//                     query.sort_order || "ASC"
//                 ]
//             ]
//         });
//     }
//
//     // Get attachment By attachment code
//     async getByAttachmentCode(attachmentCode: string, query: any = {}, actor: any) {
//
//         const attachment = await attachmentRepo.findOne(
//             {
//                 attachment_code: attachmentCode
//             },
//             {
//                 include: Array.isArray(query.include) ? query.include : [],
//             }
//         );
//
//         if (!attachment) {
//             throw new Error("attachment not found");
//         }
//
//         return attachment;
//     }
//
//     // Get attachment By Any Field
//     async getByField(where: any, query: any = {}) {
//         // console.log(where);
//         const attachment = await attachmentRepo.findOne(
//             where,
//             {
//                 include: query.include || []
//             }
//         );
//
//         if (!attachment) {
//             throw new Error("attachment not found");
//         }
//
//         return attachment;
//     }
//
//     // Update attachment
//     async update(attachmentCode: string, data: any, actor: any) {
//
//         const attachment = await attachmentRepo.findOne({
//             attachment_code: attachmentCode
//         });
//
//         if (!attachment) throw new Error("attachment not found");
//
//
//         return await attachmentRepo.update(
//             { attachment_code: attachmentCode },
//             data
//         );
//     }
//
//     // Delete attachment
//
//     async delete(attachmentCode: string, actor: any) {
//         const attachment = await attachmentRepo.findOne({
//             attachment_code: attachmentCode
//         });
//
//         if (!attachment) {
//             throw new Error("attachment not found");
//         }
//
//         return await attachmentRepo.delete({
//             attachment_code: attachmentCode
//         });
//     }
//
//     // Deactivate attachment
//
//     async deactivate(attachmentCode: string, data: any, actor: any) {
//
//         const attachment = await attachmentRepo.findOne({
//             attachment_code: attachmentCode
//         });
//
//         if (!attachment) {
//             throw new Error("attachment not found");
//         }
//
//         return await attachmentRepo.deactivate({
//                 attachment_code: attachmentCode
//             },
//             data
//         );
//     }
// }
//
// export default new attachmentService();