import userService from "../user/user.service";
import influencerService from "../influencer/influencer.service";
import onboardingService from "../registration/onboarding.service";
import socialLoginService from "../socialMedia/socialLogin.service.js";
import attachmentService from "../mediaAttachment/attachment.service.js";
import userRepo from "../../repositories/user/user.repository.js";
import {generateCode} from "../../utils/generateCode.js";
import influencerRepo from "../../repositories/influencer/influencer.repository.js";
import initModels from "../../database/sequelize/models/index.cjs";
import {InfluencerSignupStep} from "../../utils/constants/influencerSignupSteps.js";
import {hashPassword} from "../../utils/hashPassword.js";
import {generateSignupToken} from "../../utils/signupToken.js";
import socialLoginRepo from "../../repositories/socialLogin/socialLogin.repository.js";
import {parseMimeType} from "../../utils/attachment.js";
import locationService from "../location/location.service.js";
import categoryService from "../category/category.service.js";


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
            let hashedPassword

            if(data.password){
                hashedPassword = await hashPassword(password);
            }
            // console.log(userCode, influencerCode);

            const user = await userRepo.create(
                {
                    user_code: userCode,
                    first_name: fullName,
                    email: email,
                    phone: phone,
                    password: hashedPassword,
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

            const signupToken = generateSignupToken(userCode);
            const onboarding = await onboardingService.create(
                {
                    userCode: userCode,
                    signupToken: signupToken.token,
                    expiresAt: signupToken.expiresAt,
                },
                {   transaction }
            );

            // console.log(onboarding.toJSON());

            await onboardingService.completeStep(
                userCode,
                InfluencerSignupStep.BASIC_INFO,
                {   transaction }
            );

            await transaction.commit();

            return {
                user: user,
                influencer: influencer,
                signupToken: signupToken,
                currentStep: 2
            };

        } catch (err) {

            if(!transaction.finished)
                await transaction.rollback();

            throw err;
        }
    }
    // Step 2

    async connectInstagram(data:any){

        const { userCode, providerUserId, accessToken, expiresIn } = data;

        // console.log(userCode, providerUserId, accessToken)
        await onboardingService.canAccessStep(userCode, 2);
        const influencer = await influencerRepo.findOne({
            user_code: userCode
        });

        // console.log(influencer);

        const existing = await socialLoginRepo.findOne({
            user_code: userCode,
            provider: "instagram",
        });

        if (existing) {
            throw new Error("Instagram account is already connected.");
        }

        // console.log(existing);

        // const existingProvider = await socialLoginRepo.findOne({
        //     provider: "instagram",
        //     provider_user_id: providerUserId,
        // });
        // console.log(existingProvider);
        // if (existingProvider && existingProvider.user_code !== userCode) {
        //     throw new Error("This Instagram account is already connected to another user.");
        // }

        const expiresAt = new Date(Date.now() + expiresIn * 1000);

        // console.log(influencer);

        // const socialLoginCode = generateCode()
        await socialLoginService.create({
            userCode,
            provider: "instagram",
            providerUserId,
            accessToken,
            expiresAt,
        });

        const signupToken = generateSignupToken(userCode);
        console.log(signupToken);
        const onboarding = await onboardingService.update(
           userCode,
            {
                signup_token: signupToken.token,
                expires_at: signupToken.expiresAt,
            },
        );

        await onboardingService.completeStep(userCode, InfluencerSignupStep.INSTAGRAM_CONNECT);

        // console.log(signupToken)

        return {
            influencer,
            signupToken,
            currentStep: 3,
            message: "Instagram connected"
        };
    }

    // Step 3
    async uploadVerification(userCode:string, file:any){

        // console.log(userCode, file);

        const mediaType = parseMimeType(file.mimetype)
        // console.log(mediaType);

        await onboardingService.canAccessStep(userCode, 3);

        const influencer = await influencerService.getByField(
            {
                user_code:  userCode
            }
        );

        // console.log(influencer);
        //
        const attachment = await attachmentService.upload(
                file,
                {
                    entityType: "influencer",
                    entityCode: influencer.influencer_code,
                    attachmentCategory: "proof",
                    mediaType: mediaType.fileType,
                    uploadedBy: userCode,
                    visibility: "private"
                }
            );

        const signupToken = generateSignupToken(userCode);
        const onboarding = await onboardingService.update(
            userCode,
            {
                signup_token: signupToken.token,
                expires_at: signupToken.expiresAt,
            },
        );
        //
        await onboardingService.completeStep(
            userCode,
            InfluencerSignupStep.VERIFICATION,
        );

        return {
            attachment,
            signupToken: signupToken,
            currentStep: 4
        };

    }

    // Step 4
    async profile(userCode:string, data:any){

        const transaction = await db.sequelize.transaction();

        try {

                const {bio, categories, country, city} = data

                await onboardingService.canAccessStep(userCode, InfluencerSignupStep.PROFILE);

                const influencer = await influencerRepo.findOne({
                    user_code: userCode
                });

                if(!influencer){
                    throw new Error("Influencer doesn't exist");
                }

            // console.log(influencer);

                const result = await influencerRepo.update(
                    {
                        influencer_code: influencer.influencer_code,
                    },
                    {
                        bio: bio
                    },
                    { transaction }
                );

                const influencerLocation = await locationService.create(
                    {
                        entityType: "user",
                        entityCode: userCode,
                        country: country,
                        city: city
                    },

                    { transaction }
                )

                let influencerCategories;

                for( const category of categories ){

                    // console.log(category);

                    influencerCategories = await categoryService.create(
                        {
                            entityType: "influencer",
                            entityCode: influencer.influencer_code,
                            categoryName: category

                        },
                        {   transaction }
                    )

                }
            //
                const signupToken = generateSignupToken(userCode);
                const onboarding = await onboardingService.update(
                    userCode,
                    {
                        signup_token: signupToken.token,
                        expires_at: signupToken.expiresAt,
                    },
                    { transaction}
                );
                await onboardingService.completeStep(
                    userCode,
                    InfluencerSignupStep.PROFILE,
                    { transaction }
                );

                await transaction.commit();
                return {
                    message: "Profile completed",
                    result: result,
                    signupToken: signupToken,
                    nextStep: InfluencerSignupStep.PORTFOLIO
                };

        } catch(err){

            if(!transaction.finished)
                await transaction.rollback();
            throw err;
        }
    }

    // upload portfolio
    async portfolio(userCode:string, uploadedFiles:any[]){

        // console.log(userCode, uploadedFiles);
        try{
                if(uploadedFiles.length < 2){
                    throw new Error("Minimum 4 images required");
                }

                await onboardingService.canAccessStep(userCode, 5);

                const influencer = await influencerRepo.findOne({
                    user_code: userCode
                });

                if(!influencer){
                    throw new Error("Influencer doesn't exist");
                }

                // console.log(influencer);

                const attachments = attachmentService.uploadMultiple(
                    uploadedFiles,
                    {
                        entityType: "influencer",
                        entityCode: influencer.influencer_code,
                        attachmentCategory: "portfolio",
                        uploadedBy: userCode,
                        visibility: "public"
                    }
                )

                await onboardingService.completeStep(userCode, InfluencerSignupStep.PORTFOLIO);

                // const signupToken = generateSignupToken(userCode);
                // const onboarding = await onboardingService.update(
                //     userCode,
                //     {
                //         signup_token: null,
                //         expires_at: null,
                //         status: "completed"
                //     },
                // );
            return {
                    message: "Application submitted",
                    attachments
                };
        } catch (err){
            throw err;
        }

    }
}


export default new InfluencerSignupService();