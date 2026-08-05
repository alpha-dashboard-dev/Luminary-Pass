import attachmentService from "../../services/mediaAttachment/attachment.service";
import {FastifyReply, FastifyRequest} from "fastify";


class AttachmentController {

    async upload(req:any, reply:any){

        const data = await req.file();

        if (!data) {
            return reply.code(400).send({
                success:false,
                message:"File is required"
            });
        }

        const fields = data.fields || {};

        const options = {
            entityType: fields.entityType?.value,
            entityCode: fields.entityCode?.value,
            attachmentCategory: fields.category?.value,
            uploadedBy: req.user.userCode,
            mediaType: fields.mediaType?.value || "image"
        };


        if (!options.entityType || !options.entityCode || !options.attachmentCategory) {
            return reply.code(400).send({
                success:false,
                message:"Missing attachment metadata",
                fields:Object.keys(fields)
            });
        }


        const attachment = await attachmentService.upload(
            data,
            options
        );


        return reply.send({
            success:true,
            data:attachment
        });
    }



    // async upload(req:any, reply:any){
    //
    //
    //     const data = await req.file();
    //     // console.log(data);
    //     const fields = data.fields;
    //     const options = {
    //
    //         entityType: fields.entityType.value,
    //         entityCode: fields.entityCode.value,
    //         attachmentCategory: fields.category.value,
    //         uploadedBy: req.user.userCode,
    //         mediaType: fields.mediaType?.value || "image"
    //     };
    //     console.log(options);
    //
    //
    //     const attachment = await attachmentService.upload(data, options);
    //
    //
    //
    //     return reply.send({
    //         success:    true,
    //         data:   attachment
    //     });
    //
    //
    // }
    //




    async uploadMultiple(req:any,reply:any){


        const files=[];


        for await(
            const file of req.files()
            ){

            files.push(file);

        }



        const body =
            req.body;



        const attachments =
            await attachmentService.uploadMultiple(

                files,

                body

            );



        return reply.send({

            success:true,

            data:attachments

        });


    }

    async delete(req: FastifyRequest, reply: FastifyReply) {

        try {
            const attachmentCode = String(req.params.attachmentCode)

            await attachmentService.delete(attachmentCode, req.user);

            return reply.status(200).send({
                success: true,
                message: "Attachment permanently deleted"
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }

    async replace(req:any,reply:any){


        const file =
            await req.file();



        const result =
            await attachmentService.replace(

                req.params.attachmentCode,

                file

            );



        return reply.send({

            success:true,

            data:result

        });


    }






    async move(req:any,reply:any){


        const result =
            await attachmentService.move(

                req.params.attachmentCode,

                req.body.folder

            );


        return reply.send({

            success:true,

            data:result

        });


    }



}


export default new AttachmentController();









// import { FastifyReply, FastifyRequest } from "fastify";
// import attachmentService from "../../services/mediaAttachment/attachment.service";
// import {validateAttachment} from "../../utils/validator.js";
//
// class attachmentController {
//
//     async create(req: FastifyRequest, reply: FastifyReply) {
//
//         try{
//             const data = req.body;
//             validateAttachment(data);
//             const result =  await attachmentService.create(
//                 data,
//                 req.user
//             )
//             return reply.status(200).send({
//                 success: true,
//                 message: "attachment created successfully",
//                 data: result
//             });
//         }
//         catch (err: any) {
//             return reply.status(400).send({
//                 success: false,
//                 message: err.message
//             });
//         }
//     }
//
//     async getAll(req: FastifyRequest, reply: FastifyReply) {
//
//         try {
//             let include = req.query.include ?? "";
//             include = [
//             ]
//             // console.log(include)
//             const data =
//                 await attachmentService.getAll(
//                     {
//                         ...req.query,
//                         include
//                     },
//                     req.user
//                 );
//
//             return reply.status(200).send({
//                 success: true,
//                 data,
//             });
//
//         } catch (err: any) {
//             return reply.status(400).send({
//                 success: false,
//                 message: err.message
//             });
//         }
//     }
//
//     // Get by attachment code
//     async getByAttachmentCode(req: FastifyRequest, reply: FastifyReply) {
//
//         try {
//             let include = req.query.include ?? "";
//             include = [
//             ]
//             const attachmentCode = String(req.params.attachmentCode)
//             const result = await attachmentService.getByAttachmentCode(
//                 attachmentCode,
//                 {
//                     ...req.query,
//                     include
//                 },
//                 req.user,
//             );
//
//             return reply.status(200).send({
//                 success: true,
//                 result,
//             });
//
//         } catch (err: any) {
//
//             return reply.status(404).send({
//                 success: false,
//                 message: err.message,
//             });
//         }
//     }
//
//     // Get By Any Field
//     async getByField(req: FastifyRequest, reply: FastifyReply) {
//
//         try {
//             let include = req.query.include ?? "";
//             include = [
//             ]
//             const where = {...req.query};
//             const result = await attachmentService.getByField(
//                 where,
//                 {
//                     ...req.query,
//                     include
//                 },
//                 req.user,
//             );
//
//             return reply.status(200).send({
//                 success: true,
//                 result,
//             });
//
//         } catch (err: any) {
//
//             return reply.status(404).send({
//                 success: false,
//                 message: err.message,
//             });
//         }
//     }
//
//
//     //Update attachment
//
//     async update(req: FastifyRequest, reply: FastifyReply) {
//
//         try {
//
//             const attachmentCode = String(req.params.attachmentCode);
//
//             const data = await attachmentService.update(
//                 attachmentCode,
//                 req.body,
//                 req.user
//             );
//
//             return reply.status(200).send({
//                 success: true,
//                 message: "Attachment updated successfully",
//                 data,
//             });
//
//         } catch (err: any) {
//
//             return reply.status(400).send({
//                 success: false,
//                 message: err.message,
//             });
//         }
//     }
//
//     async deactivate(req: FastifyRequest, reply: FastifyReply) {
//         try{
//             const attachmentCode = String(req.params.attachmentCode)
//             const data = req.body
//             console.log(data)
//             await attachmentService.deactivate(
//                 attachmentCode,
//                 data,
//                 req.user
//             );
//
//             return reply.status(200).send({
//                 success: true,
//                 message: "Attachment deactivated",
//                 data,
//             });
//
//
//         }catch(err){
//             return reply.status(400).send({
//                 success: false,
//                 message: err.message
//             });
//         }
//     }
//
//     //  DELETE attachment
//     async delete(req: FastifyRequest, reply: FastifyReply) {
//
//         try {
//             const attachmentCode = String(req.params.attachmentCode)
//
//             await attachmentService.delete(
//                 attachmentCode,
//                 req.user
//             );
//
//             return reply.status(200).send({
//                 success: true,
//                 message: "Attachment permanently deleted"
//             });
//
//         } catch (err: any) {
//
//             return reply.status(400).send({
//                 success: false,
//                 message: err.message
//             });
//         }
//     }
// }
//
// export default  new attachmentController();