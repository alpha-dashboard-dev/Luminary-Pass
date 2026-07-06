import eventInvitationRepo from "../../repositories/event/invitation.repository";

import { generateCode } from "../../utils/generateCode";
import {buildWhere} from "../../utils/buildWhere.js";

class EventInvitationService {

    // CREATE invitation
    async create(data: any, actor: any) {


        const invitationCode = generateCode();

        // add separate column for start & end date and time

        return await eventInvitationRepo.create({
            invitation_code: invitationCode,
            event_code: data.eventCode,
            entity_type: data.entityType,
            entity_code: data.entityCode,
            influencer_code: data.influencerCode,
            invited_by: data.invitedBy,
            invitation_message: data.invitationMessage,
            status: data.status,
            responded_at: data.respondedAt || null,
        });
    }

    // Get all invitations

    async getAll(query: any = {}, actor: any) {
        // console.log(query.include)
        const where = buildWhere(query);

        if(!actor){
            throw new Error("Unauthorized Access");
        }

        return eventInvitationRepo.findAll({
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
        console.log(where);
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
}

export default new EventInvitationService();