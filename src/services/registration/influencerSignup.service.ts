import userService from "../user/user.service";
import influencerService from "../influencer/influencer.service";
import onboardingService from "../registration/onboarding.service";
import socialLoginService from "../socialMedia/socialLogin.service.js";
import attachmentService from "../mediaAttachment/attachment.service.js";
import userRepo from "../../repositories/user/user.repository.js";
import {generateCode} from "../../utils/generateCode.js";
import influencerRepo from "../../repositories/influencer/influencer.repository.js";
import initModels from "../../database/sequelize/models/index.cjs";
import influencerOnboardingRepo from "../../repositories/influencer/influencerOnboarding.repositories.js";
import {InfluencerSignupStep} from "../../utils/constants/influencerSignupSteps.js";
import {hashPassword} from "../../utils/hashPassword.js";


const db = initModels()


class InfluencerSignupService {

    // Step 1

    async basicInfo(data: any){

        // console.log(data);
        const transaction = await db.sequelize.transaction();

        const { fullName, email, phone, password }  =   data;

        try {

            const emailExists = await userRepo.findOne(
                {
                    email: data.email
                }
            );

            if (emailExists) {
                throw new Error("Email already exists");
            }

            const phoneExists = await userRepo.findOne({
                phone: data.phone
            })

            if (phoneExists) {
                throw new Error("Phone already exists");
            }

            const userCode = generateCode();
            const influencerCode = generateCode();
            let password

            if(data.password){
                password = await hashPassword(data.password);
            }


            // console.log(userCode, influencerCode);

            const user = await userRepo.create(
                {
                    user_code: userCode,
                    first_name: fullName,
                    email: email,
                    phone: phone,
                    password: password,
                    role_code: "ROL00003",
                    status: "inactive"
                },
                {   transaction }
            );

            const influencer = await influencerRepo.create(
                {
                    influencer_code: influencerCode,
                    user_code: userCode,
                },
                {   transaction }
            );
            //
            const onboarding = await onboardingService.create(
                {
                    userCode: userCode,
                },
                {   transaction }
            );

            await transaction.commit();

            // await onboardingService.completeStep(user.user_code, 1);

            return {
                userCode: userCode,
                influencerCode: influencerCode,
            };

        } catch (err) {

            await transaction.rollback();
            throw err;
        }
    }
    // Step 2
    async connectInstagram(data:any){

        const { userCode, instagram } = data;
        await onboardingService.canAccessStep(userCode, 2);
        const influencer = await influencerService.findByUserCode(
                userCode
            );
        await socialLoginService.create({

            userCode,

            influencerCode: influencer.influencer_code,

            provider:"instagram",

            socialId: instagram.id,

            username: instagram.username,

            accessToken: instagram.accessToken

        });

        await onboardingService.completeStep(userCode, 2);

        return {
            message: "Instagram connected"
        };
    }



    // Step 3
    // async uploadVerification(userCode:string, file:any){
    //
    //
    //     await onboardingService.canAccessStep(
    //         userCode,
    //         3
    //     );
    //
    //
    //
    //     // const influencer = await influencerService.findByUserCode(userCode);
    //
    //
    //
    //     // const uploaded = await cloudinaryService.upload(
    //     //
    //     //         file,
    //     //
    //     //         {
    //     //
    //     //             folder:
    //     //                 `luminary-pass/influencers/${influencer.influencer_code}/verification`
    //     //
    //     //         }
    //     //
    //     //     );
    //
    //
    //
    //
    //     await attachmentService.create({
    //
    //         entityType:"influencers",
    //
    //         entityCode:
    //         influencer.influencer_code,
    //
    //         category:
    //             "instagram_verification",
    //
    //         url:
    //         uploaded.secureUrl,
    //
    //         publicId:
    //         uploaded.publicId,
    //
    //         visibility:"PRIVATE",
    //
    //         uploadedBy:userCode
    //
    //     });
    //
    //
    //
    //
    //     await onboardingService.completeStep(
    //         userCode,
    //         3
    //     );
    //
    //
    //
    //     return uploaded;
    //
    //
    // }

//     Step 4
//     async profile(
//         userCode:string,
//         data:any
//     ){
//
//
//         await onboardingService.canAccessStep(
//             userCode,
//             4
//         );
//
//
//
//         const influencer =
//             await influencerService.findByUserCode(
//                 userCode
//             );
//
//
//
//         await influencerService.update(
//
//             influencer.influencer_code,
//
//             data
//
//         );
//
//
//
//         await onboardingService.completeStep(
//             userCode,
//             4
//         );
//
//
//         return {
//
//             message:
//                 "Profile completed"
//
//         };
//
//
//     }
//
//     async portfolio(
//         userCode:string,
//         files:any[]
//     ){
//
//
//         if(files.length < 4){
//
//             throw new Error(
//                 "Minimum 4 images required"
//             );
//
//         }
//
//
//
//         await onboardingService.canAccessStep(
//             userCode,
//             5
//         );
//
//
//
//         const influencer =
//             await influencerService.findByUserCode(
//                 userCode
//             );
//
//
//
//         let order=1;
//
//
//         for(const file of files){
//
//
//
//             const uploaded =
//                 await cloudinaryService.upload(
//
//                     file,
//
//                     {
//
//                         folder:
//                             `luminary-pass/influencers/${influencer.influencer_code}/portfolio`
//
//                     }
//
//                 );
//
//
//
//
//             await attachmentService.create({
//
//                 entityType:"influencer",
//
//                 entityCode: influencer.influencer_code,
//
//                 category:"portfolio",
//
//                 url: uploaded.secureUrl,
//
//                 publicId: uploaded.publicId,
//
//                 displayOrder: order,
//                 visibility:"public",
//
//                 uploadedBy:userCode
//
//             });
//
//
//             order++;
//
//         }
//
//
//
//
//         await onboardingService.completeStep(
//             userCode,
//             5
//         );
//
//
//
//         return {
//
//             message:
//                 "Application submitted"
//
//         };
//
//
//     }
}


export default new InfluencerSignupService();