import influencerRepo from "../../repositories/influencer/influencer.repository.js";
import { generateCode } from "../../utils/generateCode.js";
import {buildWhere} from "../../utils/buildWhere.js";
import userRepo from "../../repositories/user/user.repository.js";
import invitationRepo from "../../repositories/event/invitation.repository.js";

class InfluencerService {


    // Create Influencer
    async create(data: any) {

        // console.log(data)


        const user = await userRepo.findOne({
            user_code: data.userCode,
        })

        if(!user){
            throw new Error("Influencer does not exist");
        }

        const influencer = await influencerRepo.findOne(
            {
                user_code: data.userCode
            }
        );

        if (influencer) {
            throw new Error("Influencer already exists");
        }

        const influencerCode = generateCode();

        return await influencerRepo.create({
            influencer_code: influencerCode,
            user_code: data.userCode,
            bio: data.bio,
            gender: data.gender,
            date_of_birth: data.dateOfBirth,
            user_name: data.username,
            account_type: data.account_type,
            follower_count: data.followers_count,
            media_count: data.media_count,
        });
    }

    // Get all influencers

    async getAll(query: any = {}, actor: any) {
        // console.log(query.where)
        const where = buildWhere(query);

        if(!actor){
            throw new Error("Unauthorized Access");
        }

        return influencerRepo.findAll({
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

    // Get influencers By influencer code
    async getByInfluencerCode(influencerCode: string, query: any = {}, actor: any) {
        console.log(influencerCode);

        const influencer = await influencerRepo.findOne(
            {
                influencer_code: influencerCode
            },
            {
                include: Array.isArray(query.include) ? query.include : [],
            }
        );

        if (!influencer) {
            throw new Error("influencer not found");
        }

        return influencer;
    }

    // Get influencer By Any Field
    async getByField(where: any, query: any = {}, actor: any) {
        // console.log(where);
        const influencer = await influencerRepo.findOne(
            where,
            {
                include: query.include || []
            }
        );

        if (!influencer) {
            throw new Error("influencer not found");
        }

        return influencer;
    }

    // Update influencer
    async update(influencerCode: string, data: any, actor: any) {

        // console.log(influencerCode, data)
        const influencer = await influencerRepo.findOne({
            influencer_code: influencerCode
        });

        if (!influencer) throw new Error("influencer not found");

        const allowed: any = {};
        if (data.username !== undefined)
            allowed.user_name = data.username;
        if (data.account_type !== undefined)
            allowed.account_type = data.account_type;
        if (data.followers_count !== undefined)
            allowed.follower_count = data.followers_count;
        if(data.media_count !== undefined)
            allowed.media_count = data.media_count;

        // console.log(allowed);

        return await influencerRepo.update(
            { influencer_code: influencerCode },
            allowed
        );
    }

    // Delete influencer

    async delete(influencerCode: string, actor: any) {
        const influencer = await influencerRepo.findOne({
            influencer_code: influencerCode
        });

        if (!influencer) {
            throw new Error("influencer not found");
        }

        return await influencerRepo.delete({
            influencer_code: influencerCode
        });
    }

    async findEventInvitation(influencerCode: string, actor: any) {

        const influencer = await influencerRepo.findOne({
            influencer_code: influencerCode
        })

        if (!influencer) {
            throw new Error("influencer not found");
        }

        const eventInvitation = await invitationRepo.findAll({
            where: {
                entity_code: influencerCode
                // status: "accepted",
            }
        })

        if (!eventInvitation) {
            throw new Error("No Invitation found against this influencer");
        }

        // console.log(eventInvitation);

        return eventInvitation;
    }


    async submitEventTask(checklistCode: string, taskData: any, actor: any) {

        // console.log(checklistCode, taskData, actor);

        const influencer = await influencerRepo.findOne({
            user_code: actor.userCode
        })


        console.log(influencer);


    }
}

export default new InfluencerService();