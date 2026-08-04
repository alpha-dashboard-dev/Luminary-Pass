import eventInvitationRepo from "../../repositories/event/invitation.repository";

import { generateCode } from "../../utils/generateCode";
import {buildWhere} from "../../utils/buildWhere.js";
import eventRepo from "../../repositories/event/event.repository.js";
import influencerRepo from "../../repositories/influencer/influencer.repository.js";
import businessRepo from "../../repositories/business/business.repository.js";
import userRepo from "../../repositories/user/user.repository.js";
import participantService from "./participant.service.js";
import notificationService from "../notifications/notfication.service.js";

class EventInvitationService {

    // CREATE invitation
    async create(data: any, actor: any) {


        const event = await eventRepo.findOne({
            event_code: data.eventCode,
        })

        if (!event) {
            throw new Error("Event does not exist");
        }

        // console.log(event)

        // console.log(actor)

       if(actor.roleCode !== "ROL00001"){
           if(event.business_code !== actor.businessCode){
               throw new Error("Event does not belong to your business")
           }
       }

        switch (data.entityType) {
            case "business":
                const business = await businessRepo.findOne({
                    venue_code: data.entityCode,
                });

                if(!business){
                    throw new Error("Business doesn't exist");
                }
                break;

            case "influencer":

                const influencer = await influencerRepo.findOne({
                    influencer_code: data.entityCode,
                })
                if (!influencer){
                    throw new Error("Influencer doesn't exist");
                }
                break;
        }

       const inviterCode = data.invitedBy ? data.invitedBy : actor.userCode

        const inviter = await userRepo.findOne({
            user_code: inviterCode,
        })

        // console.log(inviterCode)

        if (!inviter) {
            throw new Error("Inviter doesn't exist");
        }

        // console.log(inviter);
        //
        //
        const invitationCode = generateCode();

        const invitation = await eventInvitationRepo.create({
            invitation_code: invitationCode,
            event_code: data.eventCode,
            entity_type: data.entityType,
            entity_code: data.entityCode,
            invited_by: inviterCode,
            invitation_message: data.invitationMessage,
            status: data.status,
            responded_at: data.respondedAt || null,
        });

        // send invitation notification to influencer

        // const notification = await notificationService.sendToUser(
        //     data.influencerCode,
        //     "Event Invitation",
        //     "Accept Event Invitation",
        //     {
        //         type: "EVENT_INVITATION",
        //         eventCode: data.eventCode,
        //     }
        // )

        return {
            invitation: invitation,
            // notification: notification,
        }
    }

    // Get all invitations

    async getAll(query: any = {}, actor: any) {
        // console.log(query.include)
        const where = buildWhere(query);

        if(!actor){
            throw new Error("Unauthorized Access");
        }

        return eventInvitationRepo.findAll(
            where,
            {
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

    // Get invitation By invitation Code
    async getByInvitationCode(invitationCode: string, query: any = {}, actor: any) {

        const invitation = await eventInvitationRepo.findOne(
            {
                invitation_code: invitationCode
            },
            {
                include: Array.isArray(query.include) ? query.include : [],
            }
        );

        if (!invitation) {
            throw new Error("invitation not found");
        }

        return invitation;
    }

    // Get invitation By Any Field
    async getByField(where: any, query: any = {}, actor: any) {
        // console.log(where);
        const invitation = await eventInvitationRepo.findOne(
            where,
            {
                include: query.include || []
            }
        );

        if (!invitation) {
            throw new Error("invitation not found");
        }

        return invitation;
    }

    // Update invitation
    async update(invitationCode: string, data: any, actor: any) {

        const invitation = await eventInvitationRepo.findOne({
            invitation_code: invitationCode
        });

        if (!invitation) throw new Error("invitation not found");

        return await eventInvitationRepo.update(
            { invitation_code: invitationCode },
            data
        );
    }

    // Delete invitation

    async delete(invitationCode: string, actor: any) {
        const invitation = await eventInvitationRepo.findOne({
            invitation_code: invitationCode
        });

        if (!invitation) {
            throw new Error("invitation not found");
        }

        return await eventInvitationRepo.delete({
            invitation_code: invitationCode
        });
    }

    async respondToInvitation(invitationCode: string, data: any) {

        const invitation = await eventInvitationRepo.findOne({
            invitation_code: invitationCode
        })

        if (!invitation) {
            throw new Error("invitation not found");
        }

        // console.log(invitation);
        if(data.status === "accepted") {
            await participantService.create({
                eventCode: invitation.event_code,
                influencerCode: invitation.influencer_code,
                source: "invitation",
                sourceCode: invitation.invitation_code,
                status: "approved",
            })

            // send Notification to business owner that influencer accepted or declined event invitation

            // const notification = await notficationService.sendToUser()
        }

        const allowed: any = {};
        if (data.status !== undefined)
            allowed.status = data.status;
        if (data.respondedAt === undefined) {
            allowed.responded_at = data.respondedAt;
        } else {
            allowed.responded_at = new Date();
        }

        return await eventInvitationRepo.update(
            {
                invitation_code: invitationCode
            },
            allowed
        )
    }



}

export default new EventInvitationService();