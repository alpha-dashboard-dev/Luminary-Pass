import userRepo from "../../repositories/user/user.repository.js";
import {generateCode} from "../../utils/generateCode.js";
import influencerRepo from "../../repositories/influencer/influencer.repository.js";
import categoryRepo from "../../repositories/category/category.repository.js";
import locationRepo from "../../repositories/location/location.repository.js";
import emailService from "../sendEmail/email.service.js";
import {sequelize} from "../../database/sequelize/sequelize.js";

class RegistrationService {

    /*
        my signup process have multi steps,
        first user (influencer) put their basic info, then signin with instagram OAuth, then they upload their instagram dashboard pic for verification,
        then they put their influencer details like bio, category, , then again they upload their 4-5 picture of their work
     */


    // Influencer Registration through Mobile App, ok write complete code for each step, with service & controller method + routes

    async register(data: any) {

        const {
            firstName,
            lastName,
            email,
            phone,
            password,
            confirmPassword,
            bio,
            gender,
            dateOfBirth,
            instagram,

            verificationScreenshot,

            portfolioImages
        } = data;


        // 1. Validate password

        if(password !== confirmPassword){
            throw new Error("Password does not match");
        }


        // 2. Create User

        const user = await userService.create({

            firstName,
            lastName,

            email,
            phone,

            password,

            roleCode: "INF00001", // influencer role

            userType: "INFLUENCER",

            status: "ACTIVE"

        });



        // 3. Create Influencer Profile

        const influencer =
            await influencerService.create({

                userCode: user.user_code,

                bio,

                gender,

                dateOfBirth

            });



        // 4. Save Instagram Login Data

        if(instagram){

            await socialLoginService.create({

                userCode: user.user_code,

                influencerCode:
                influencer.influencer_code,

                provider: "INSTAGRAM",

                socialId: instagram.id,

                username: instagram.username,

                accessToken: instagram.accessToken,

                refreshToken:
                    instagram.refreshToken || null

            });

        }



        // 5. Save Instagram verification screenshot

        if(verificationScreenshot){

            await attachmentService.create({

                entityType: "influencers",

                entityCode: influencer.influencer_code,

                title: "Instagram Insights Screenshot",

                mediaType: verificationScreenshot.mediaType,

                fileName: verificationScreenshot.fileName,

                fileExtension: verificationScreenshot.fileExtension,

                fileSize:
                verificationScreenshot.fileSize,

                url:
                verificationScreenshot.url,

                isPrimary:true,

                visibility:"PRIVATE",

                uploadedBy:
                user.user_code,

                displayOrder:1,

                status:"ACTIVE"

            });

        }



        // 6. Save Portfolio Images

        if(!portfolioImages || portfolioImages.length < 4){

            throw new Error(
                "Minimum 4 portfolio images are required"
            );

        }


        let order = 1;

        for(const image of portfolioImages){


            await attachmentService.create({

                entityType:"influencers",

                entityCode:
                influencer.influencer_code,


                title:
                    "Influencer Portfolio",


                mediaType:
                image.mediaType,


                fileName:
                image.fileName,


                fileExtension:
                image.fileExtension,


                fileSize:
                image.fileSize,


                url:
                image.url,


                isPrimary:
                    order === 1,


                visibility:"PUBLIC",


                uploadedBy:
                user.user_code,


                displayOrder:
                order,


                status:"ACTIVE"

            });


            order++;

        }



        return {
            userCode: user.user_code,
            influencerCode: influencer.influencer_code,
            message: "Your application has been submitted. Our team will review within 24 hours."
        };

    }



    // Influencer Registration through website
    async registerInfluencer(data: any) {

        const { fullName, userName, email, phone, followerCount, country, contentCategory, description } = data


        const transaction = await sequelize.transaction();

        try {

            if (email) {
                const emailExists = await userRepo.findOne(
                    {
                        email: email
                    }
                );

                if (emailExists) {
                    throw new Error("Email already exists");
                }
            }


            if (phone) {
                const phoneExists = await userRepo.findOne({
                    phone: phone
                })

                if (phoneExists) {
                    throw new Error("Phone already exists");
                }

            }
            const userCode = generateCode();
            const influencerCode = generateCode();
            const categoryCode = generateCode();
            const locationCode = generateCode();


            const user = await userRepo.create(
                {
                    user_code: userCode,
                    organization_code: "ORG00001",
                    role_code: "ROL00003",
                    first_name: fullName || null,
                    email:  email || null,
                    phone: phone || null,
                    status: "inactive",
                },
                { transaction }
            );

            const influencer = await influencerRepo.create(
                {
                    influencer_code: influencerCode,
                    user_code: userCode,
                    user_name: userName,
                    follower_count: followerCount,
                    description: description,
                },
                {  transaction }
            )


            const category = await categoryRepo.create(
                {
                    category_code: categoryCode,
                    entity_type: "influencer",
                    entity_code: userCode,
                    name: contentCategory,
                    status: "inactive",
                },
                { transaction }
            )

            const userLocation = await locationRepo.create(
                {
                    location_code: locationCode,
                    entity_type: "user",
                    entity_code: userCode,
                    country: country,
                },
                { transaction }
            )

            await transaction.commit();

            if (email) {
                await emailService.sendBusinessEmailVerification(email, userCode, fullName);
            }

            return {
                user,
                category,
                userLocation,
            };

        } catch (err) {

            await transaction.rollback();

            throw err;
        }
    }
}

export default new RegistrationService();