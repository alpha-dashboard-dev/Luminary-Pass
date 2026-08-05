// import { generateCode } from "../../utils/generateCode";
// import {buildWhere} from "../../utils/buildWhere.js";
// import venueRepo from "../../repositories/venue/venue.repository.js";
// import userRepo from "../../repositories/user/user.repository.js";
// import StorageFactory from "../mediaAttachment/storageFactory.service.js";
// import AttachmentValidator from "../mediaAttachment/validator/attachmentValidator.js";
// import FolderGenerator from "../mediaAttachment/helpers/folderGenerator.js";
// import FileNameGenerator from "../mediaAttachment/helpers/fileNameGenerator.js";
// import {parseMimeType} from "../../utils/attachment.js";
// import venueAttachmentRepo from "../../repositories/venue/venueAttachment.repository";
//
// class attachmentService {
//
//     // Create attachment
//
//     // async create(data: any) {
//     //
//     //     const venueExists = await venueRepo.findOne({
//     //         venue_code: data.venueCode
//     //     })
//     //
//     //     if(!venueExists) {
//     //         throw new Error("Venue does not exist");
//     //     }
//     //
//     //     const userExists = await userRepo.findOne({
//     //         user_code: data.uploadedBy
//     //     })
//     //
//     //     if(!userExists) {
//     //         throw new Error("User does not exist");
//     //     }
//     //
//     //
//     //     const attachmentCode = generateCode();
//     //
//     //     return await attachmentRepo.create({
//     //         attachment_code: attachmentCode,
//     //         venue_code: data.venueCode,
//     //         attachment_type: data.attachmentType,
//     //         attachment_platform_category: data.attachmentPlatformCategory,
//     //         file_name: data.fileName,
//     //         file_extension: data.fileExtension,
//     //         file_size: data.fileSize,
//     //         url: data.url,
//     //         is_primary: data.isPrimary,
//     //         visibility: data.visibility,
//     //         uploaded_by: data.uploadedBy,
//     //         status: data.status,
//     //     });
//     // }
//
//     private storage:any;
//
//
//     constructor(){
//         this.storage = StorageFactory.make();
//     }
//
//     // upload single file
//     async upload(file:any, options:any){
//
//         console.log(file, options);
//
//         AttachmentValidator.validate(file);
//
//         const folder = FolderGenerator.generate("venue", options.attachmentCategory);
//         const fileName = FileNameGenerator.generate(options.venueCode, options.attachmentCategory, file.filename);
//         console.log(folder, fileName);
//         //
//         const uploaded = await this.storage.upload(
//             file,
//             {
//                 folder,
//                 fileName
//             }
//         );
//
//
//         const venueAttachment = await venueAttachmentRepo.create({
//             attachment_code: generateCode(),
//             venue_code: options.venueCode,
//             attachment_type: options.attachmentCategory,
//             title: options.title || null,
//             media_type: options.mediaType,
//             disk: uploaded.disk,
//             folder,
//             file_name: fileName,
//             original_file_name: file.filename,
//             file_extension: fileName.split(".").pop(),
//             mime_type: file.mimetype,
//             file_size: file.size || null,
//             public_id: uploaded.publicId || null,
//             secure_url: uploaded.secureUrl,
//             uploaded_by: options.uploadedBy,
//             is_primary: options.isPrimary ?? false,
//             visibility: options.visibility ?? "private",
//             display_order: options.displayOrder ?? 1,
//             status: "active"
//         });
//         return venueAttachment;
//     }
//
//     // upload Multiple files
//     async uploadMultiple(files:any[], options:any){
//
//         const attachments=[];
//
//         for(const file of files){
//             const media_type = parseMimeType(file.mimetype)
//             const attachment = await this.upload(file,
//                 {
//                     ...options,
//                     mediaType: media_type.fileType
//                 });
//             attachments.push(attachment);
//         }
//         return attachments;
//     }
//
//     // Get all attachments
//
//     async getAll(query: any = {}, actor: any) {
//         const where = buildWhere(query);
//
//         // Admin can see all venues
//         // Non-admin can only see their business's venues
//         if(actor.roleCode !== "ROL00001") {
//             where.business_code = actor.businessCode;
//         }
//
//         return venueAttachmentRepo.findAll(
//             where,
//             {
//                 include: Array.isArray(query.include)
//                     ? query.include
//                     : [],
//                 limit: query.limit ? Number(query.limit) : undefined,
//                 offset: query.offset ? Number(query.offset) : undefined,
//                 order: [
//                     [
//                         query.sort_by || "created_at",
//                         query.sort_order || "DESC"
//                     ]
//                 ]
//             });
//     }
//
//     // Get attachment By attachment code
//     async getByAttachmentCode(attachmentCode: string, query: any = {}, actor: any) {
//
//         const attachment = await venueAttachmentRepo.findOne(
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
//         const attachment = await venueAttachmentRepo.findOne(
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
//         const attachment = await venueAttachmentRepo.findOne({
//             attachment_code: attachmentCode
//         });
//
//         if (!attachment) throw new Error("attachment not found");
//
//
//         return await venueAttachmentRepo.update(
//             { attachment_code: attachmentCode },
//             data
//         );
//     }
//
//     // Delete attachment
//
//     async delete(attachmentCode: string, actor: any) {
//         const attachment = await venueAttachmentRepo.findOne({
//             attachment_code: attachmentCode
//         });
//
//         if (!attachment) {
//             throw new Error("attachment not found");
//         }
//
//         return await venueAttachmentRepo.delete({
//             attachment_code: attachmentCode
//         });
//     }
//
//     // Deactivate attachment
//
//     async deactivate(attachmentCode: string, data: any, actor: any) {
//
//         const attachment = await venueAttachmentRepo.findOne({
//             attachment_code: attachmentCode
//         });
//
//         if (!attachment) {
//             throw new Error("attachment not found");
//         }
//
//         return await venueAttachmentRepo.deactivate({
//                 attachment_code: attachmentCode
//             },
//             data
//         );
//     }
// }
//
// export default new attachmentService();