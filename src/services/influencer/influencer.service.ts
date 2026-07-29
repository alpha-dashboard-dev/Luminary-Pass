import influencerRepo from "../../repositories/influencer/influencer.repository.js";
import { generateCode } from "../../utils/generateCode.js";
import {buildWhere} from "../../utils/buildWhere.js";
import userRepo from "../../repositories/user/user.repository.js";
import invitationRepo from "../../repositories/event/invitation.repository.js";
import participantRepo from "../../repositories/event/participant.repository.js";
import instagramService from "../socialMedia/instagram/instagram.service.js";
import checkListRepo from "../../repositories/event/checkList.repository.js";
import participantChecklistMediaRepo from "../../repositories/event/paticipant_checklist_media"
import participantChecklistRepo from "../../repositories/event/participantChecklist.repository.js";

class InfluencerService {
    private async validateSubmission(eventCode: string, influencerCode: string) {

        const task =
            await checkListRepo.findOne({
                event_code: eventCode
            });

        if (!task) {
            throw new Error("Task not found.");
        }

        const participant = await participantRepo.findOne({
                event_code: eventCode,
                influencer_code: influencerCode
            });

        if (!participant) {
            throw new Error(
                "Influencer is not participating in this event."
            );
        }

        return {
            task,
            participant
        };

    }

    private async getSelectedMedia(influencerCode: string, mediaIds: string[]) {

        const instagramMedia = await instagramService.getMedia(influencerCode);

        const mediaMap = new Map(
                instagramMedia.map(
                    (item: any) => [item.id, item]
                )
            );

        const selectedMedia = [];

        for (const mediaId of mediaIds) {

            const media = mediaMap.get(mediaId);

            if (!media) {
                throw new Error(
                    `Invalid media selected: ${mediaId}`
                );
            }

            selectedMedia.push(media);

        }

        return selectedMedia;

    }



    // Create Influencer
    async create(data: any, options?: any) {

        console.log(data)


        const user = await userRepo.findOne({
            user_code: data.userCode,
        })

        if(!user){
            throw new Error("User does not exist");
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

        return await influencerRepo.create(
            {
                influencer_code: influencerCode,
                user_code: data.userCode,
                bio: data.bio,
                gender: data.gender,
                date_of_birth: data.dateOfBirth,
                user_name: data.username,
                account_type: data.account_type,
                follower_count: data.followers_count,
                media_count: data.media_count,
            },
            options
        );
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
        if(data.bio !== undefined)
            allowed.bio = data.bio;
        if(data.gender !== undefined)
            allowed.gender = data.gender;
        if(data.dateOfBirth !== undefined)
            allowed.date_of_birth = data.dateOfBirth;
        if(data.description !== undefined)
            allowed.description = data.description;
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

        // console.log(eventCode, mediaIds, actor);
        try{

            if (!Array.isArray(mediaIds) || mediaIds.length === 0) {
                throw new Error("Please select at least one post.");
            }

            const influencer = await influencerRepo.findOne({
                user_code: actor.userCode
            });

            if (!influencer) {
                throw new Error("Influencer doesn't exist.");
            }

            const { task, participant } = await this.validateSubmission(eventCode, influencer.influencer_code);

            // console.log(task, participant);

            const selectedMedia = await this.getSelectedMedia(influencer.influencer_code, mediaIds);

            // console.log(selectedMedia);

            const checklist = await participantChecklistRepo.findOne({
                participant_code: participant.participant_code,
                checklist_code: task.checklist_code,
            });

            // console.log(checklist);
            //
            // const participantChecklistMediaCode = generateCode()
            //
            const mediaRecords = selectedMedia.map((media: any) => ({
                participant_checklist_media_code: generateCode(),
                participant_checklist_code: checklist.participant_checklist_code,
                instagram_media_id: media.id
            }));

            // console.log(mediaRecords);

            await participantChecklistMediaRepo.bulkCreate(mediaRecords);

            return {

                message: "Instagram posts submitted successfully.",

                totalSubmitted: mediaRecords.length

            };


        } catch (error: any) {

            // console.log(error);
            //
            // console.log(error.errors);
            //
            // console.log(error.parent);

            throw error;
        }
    }

}

export default new InfluencerService();