import userRepo from "../../repositories/user/user.repository.js";
import {generateCode} from "../../utils/generateCode.js";
import influencerRepo from "../../repositories/influencer/influencer.repository.js";
import categoryRepo from "../../repositories/category/category.repository.js";
import locationRepo from "../../repositories/location/location.repository.js";
import emailService from "../sendEmail/email.service.js";
import {sequelize} from "../../database/sequelize/sequelize.js";

class RegistrationService {


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