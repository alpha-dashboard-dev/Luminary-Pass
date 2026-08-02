import participantChecklistMediaRepo from "../../repositories/event/paticipant_checklist_media";
import instagramService from "../socialMedia/instagram/instagram.service.js";
import eventRepo from "../../repositories/event/event.repository.js";
import participantRepo from "../../repositories/event/participant.repository.js";
import participantChecklistRepo from "../../repositories/event/participantChecklist.repository.js";
import influencerRepo from "../../repositories/influencer/influencer.repository.js";


class ParticipantChecklistMediaService {

    async getSubmittedMedia(participantChecklistCode: string, actor: any) {
        // console.log(participantChecklistCode);

        const checklist = await participantChecklistRepo.findOne({
                participant_checklist_code: participantChecklistCode
            });

        if (!checklist) {
            throw new Error("Checklist not found.");
        }

        const participant = await participantRepo.findOne({
                participant_code: checklist.participant_code
            });

        if (!participant) {
            throw new Error("Participant not found.");
        }

        const event =
            await eventRepo.findOne({
                event_code: participant.event_code,
                business_code: actor.businessCode
            });

        if (!event) {
            throw new Error("You are not authorized to review this submission.");
        }

        const influencer = await influencerRepo.findOne({
                influencer_code: participant.influencer_code
            });

        const mediaRecords = await participantChecklistMediaRepo.findAll(
            {
                participant_checklist_code: participantChecklistCode
            }
        );

        return await Promise.all(

            mediaRecords.map(async (item: any) => ({

                participantChecklistMediaCode: item.participant_checklist_media_code,

                instagramMediaId: item.instagram_media_id,

                status: item.status,

                remarks: item.remarks,

                remarksBy: item.remarks_by,

                instagram: await instagramService.getMediaById(influencer.influencer_code, item.instagram_media_id)
            }))

        );

    }


    async remarkMediaAgainstEvent(participantChecklistMediaCode: string, data: any, actor: any) {

        const media = await participantChecklistMediaRepo.findOne({

                participant_checklist_media_code:
                participantChecklistMediaCode

            });

        if (!media) {
            throw new Error("Media not found.");
        }

        const checklist =
            await participantChecklistRepo.findOne({

                participant_checklist_code:
                media.participant_checklist_code

            });

        if (!checklist) {
            throw new Error("Checklist not found.");
        }

        const participant =
            await participantRepo.findOne({

                participant_code:
                checklist.participant_code

            });

        if (!participant) {
            throw new Error("Participant not found.");
        }

        const event = await eventRepo.findOne({
                event_code: participant.event_code,
                business_code: actor.businessCode
            });

        if (!event) {
            throw new Error("You are not authorized to review this media.");
        }

        await participantChecklistMediaRepo.update(
            {

                participant_checklist_media_code: participantChecklistMediaCode

            },

            {

                status: data.status,

                remarks: data.remarks,

                remarks_by: actor.userCode

            }

        );

        return {
            message: "Media reviewed successfully."
        };

    }

}

export default new ParticipantChecklistMediaService;