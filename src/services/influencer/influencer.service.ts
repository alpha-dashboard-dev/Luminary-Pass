import influencerRepo from "../../repositories/influencer/influencer.repository.js";
import { generateCode } from "../../utils/generateCode.js";
import {buildWhere} from "../../utils/buildWhere.js";
import userRepo from "../../repositories/user/user.repository.js";
import invitationRepo from "../../repositories/event/invitation.repository.js";
import participantRepo from "../../repositories/event/participant.repository.js";
import instagramService from "../socialMedia/instagram/instagram.service.js";
import participantChecklistRepo from "../../repositories/event/participantChecklist.repository.js";
import participantChecklistService from "../event/participantChecklist.service.js";
import checkListRepo from "../../repositories/event/checkList.repository.js";

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

        // console.log(influencer);

        const participantExists = await participantRepo.findOne({
            influencer_code: influencer.influencer_code
        })

        console.log(participantExists)

        if(participantExists.status === "checked_in"){


        }else{
            throw new Error("Influencer don't attend the event, so you're not able to submit the event task");
        }
    }

    async selectPostsAgainstEvent(eventCode: string, actor: any) {

        const influencer = await influencerRepo.findOne({
                user_code: actor.userCode
            });

        if (!influencer) {
            throw new Error("Influencer doesn't exist.");
        }

        const instagramMedia = await instagramService.getMedia(influencer.influencer_code);

        return instagramMedia.map((item: any) => ({

            id: item.id,

            mediaType: item.media_type,

            mediaUrl: item.media_url,

            thumbnailUrl: item.thumbnail_url,

            permalink: item.permalink,

            caption: item.caption,

            timestamp: item.timestamp,

            likeCount: item.like_count,

            commentsCount: item.comments_count

        }));

    }

    async submitSelectedPosts(eventCode: string, mediaIds: string[], actor: any) {

        if (!Array.isArray(mediaIds) || mediaIds.length === 0) {
            throw new Error("Please select at least one post.");
        }

        const influencer = await influencerRepo.findOne(
            {user_code: actor.userCode}
        );

        if (!influencer) {
            throw new Error("Influencer doesn't exist.");
        }

        const task = await checkListRepo.findOne({
            event_code: eventCode,
        })

        if (!task) {
            throw new Error("Task not found.");
        }

        const participantExists = await participantRepo.findOne({
            event_code: eventCode,
            influencer_code: influencer.influencer_code
        })

        // console.log(participantExists)

        const instagramMedia = await instagramService.getMedia(influencer.influencer_code);

        const validIds = new Set(
            instagramMedia.map(
                (media: any) => media.id
            )
        );

        // console.log("validIds", validIds);
        const selectedMedia = [];

        for (const mediaId of mediaIds) {

            if (!validIds.has(mediaId)) {
                throw new Error(
                    `Invalid media selected: ${mediaId}`
                );
            }

            const media = instagramMedia.find(
                (item: any) =>
                    item.id === mediaId
            );

            selectedMedia.push(media);
        }

        for (const media of selectedMedia) {

            await participantChecklistService.create({

                participantCode: participantExists.participant_code,
                checklistCode: task.checklist_code,
                submissionUrl: media.permalink,
                submissionType: media.media_type,
            })

            // await participantChecklistRepo.create({
            //
            //     participant_checklist_code: generateCode(),
            //
            //     event_code: eventCode,
            //
            //     influencer_code:
            //     influencer.influencer_code,
            //
            //     // instagram_media_id:
            //     // media.id,
            //
            //     submission_url:
            //     media.permalink,
            //
            //     media_type:
            //     media.media_type,
            //
            //     media_url:
            //     media.media_url,
            //
            //     thumbnail_url:
            //     media.thumbnail_url,
            //
            //     caption:
            //     media.caption,
            //
            //     metadata:
            //         JSON.stringify(media)
            //
            // });

        }

        return {
            message: "Instagram posts submitted successfully.",
            totalSubmitted: selectedMedia.length

        };
    }

}

export default new InfluencerService();