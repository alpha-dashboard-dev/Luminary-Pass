import venueRepo from "../../repositories/venue/venue.repository";
import { generateCode } from "../../utils/generateCode";
import {buildWhere} from "../../utils/buildWhere.js";
import businessRepo from "../../repositories/business/business.repository";
import venueLocationRepo from "../../repositories/venue/venueLocation.repository.js";
import initModels from "../../database/sequelize/models/index.cjs";
import categoryRepo from "../../repositories/category/category.repository.js";
import venueScheduleRepo from "../../repositories/venue/venueSchedule.repository.js";

import attachmentService from "../mediaAttachment/attachment.service.js";

import venueSocialMediaRepo from "../../repositories/venue/venueSocialMedia.repository.js";
import attachmentRepo from "../../repositories/mediaAttachment/attachment.repository.js";

const db = initModels();

class VenueService {

    // Create Venue

    async create(data: any) {

        const businessExists = await businessRepo.findOne({
            business_code: data.businessCode
        })

        if (!businessExists) {
            throw new Error("Business does not exist");
        }

        const emailExists = await venueRepo.findOne(
            {
                email: data.email
            }
        );

        if (emailExists) {
            throw new Error("Email already exists");
        }

        const phoneExists = await venueRepo.findOne({
            phone: data.phone
        })

        if (phoneExists) {
            throw new Error("Phone already exists");
        }

        const venueCode = generateCode();

        return await venueRepo.create({
            venue_code: venueCode,
            business_code: data.businessCode,
            name: data.name,
            email: data.email.trim().toLowerCase(),
            phone: data.phone,
            description: data.description,
            status: data.status
        });
    }

    // Get all venues

    async getAll(query: any = {}, actor: any) {

        // filters
        const where = buildWhere(query);

        // Admin can see all venues
        // Non-admin can only see their business's venues
        if(actor.roleCode !== "ROL00001") {
            where.business_code = actor.businessCode;
        }

        return venueRepo.findAll(
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

    // Get Venue By venue code
    async getByVenueCode(venueCode: string, query: any = {}, actor: any) {

        const venue = await venueRepo.findOne(
            {
                venue_code: venueCode
            },
            {
                include: Array.isArray(query.include) ? query.include : [],
            }
        );

        if (!venue) {
            throw new Error("Venue not found");
        }

        if(actor.roleCode !== "ROL00001") {
            if(venue.business_code !== actor.businessCode) {
                throw new Error("Venue does not belong to your business");
            }
        }

        return venue;
    }

    // Get Venue By Any Field
    async getByField(where: any, query: any = {}) {
        // console.log(where);
        const venue = await venueRepo.findOne(
            where,
            {
                include: query.include || []
            }
        );

        if (!venue) {
            throw new Error("venue not found");
        }

        return venue;
    }

    // Update venue
    async update(venueCode: string, data: any, actor: any) {

        const venue = await venueRepo.findOne({
            venue_code: venueCode
        });

        if (!venue) throw new Error("venue not found");

        if(actor.roleCode !== "ROL00001") {
            if(venue.business_code !== actor.businessCode) {
                throw new Error("Venue does not belong to your business");
            }
        }
        // console.log(data)

        const allowed: any = {};
        if (data.name !== undefined)
            allowed.name = data.name;
        if (data.email !== undefined)
            allowed.email = data.email;
        if (data.phone !== undefined)
            allowed.phone = data.phone;
        if (data.description !== undefined)
            allowed.description = data.description;
        if (data.status !== undefined)
            allowed.status = data.status;

        return await venueRepo.update(
            { venue_code: venueCode },
           allowed
        );
    }

    // update venue Profile
    async updateVenueProfile(venueCode: string, payload: any, uploadedFiles: any[], actor: any){

        // console.log(payload)
        const transaction = await db.sequelize.transaction()

        try{

            const { basicInfo, locationContact, socialMedia, schedule, deletedImages } = payload;

            const venueExists = await venueRepo.findOne({
                venue_code: venueCode
            })

            if(!venueExists) {
                throw new Error("Venue does not exist");
            }

            if(venueExists.business_code !== actor.businessCode) {
                throw new Error("Venue does not belong to your business");
            }

            // Basic Info

            if(basicInfo){
                // console.log(basicInfo);
                const venue = await venueRepo.update(
                    {
                        venue_code: venueCode
                    },
                    {
                        name: basicInfo.venueName,
                        description: basicInfo.venueDescription,
                    },
                    {   transaction }
                )

                const venueCategory = await categoryRepo.update(
                    {
                        entity_code: venueCode
                    },
                    {
                        name: basicInfo.venueCategory,
                        description: basicInfo.categoryDescription,
                    },
                    {   transaction }
                )
            }

            // Location & Contact
            if(locationContact){
                // console.log("location contact", locationContact)

                const venueLocation = await venueLocationRepo.findOne({
                    venue_code: venueCode
                })

                if(!venueLocation) {
                    throw new Error("Venue Location does not exist");
                }

                await venueLocationRepo.update(
                    {
                        venue_code: venueCode
                    },
                    {
                        area: locationContact.area,
                        city: locationContact.city,
                        address: locationContact.fullAddress,
                        map_link: locationContact.mapLink
                    },
                    {   transaction }
                )

                await venueRepo.update(
                    {
                        venue_code: venueCode
                    },
                    {
                        phone: locationContact.phone,
                        email: locationContact.email,
                        web_url: locationContact.webURL
                    },
                    {   transaction }
                )
            }

            // socialMedia

            if(socialMedia){
                const socialPlatformMap = {
                    instaUsername: "instagram",
                    tiktokUsername: "tiktok",
                    facebookPage: "facebook",
                    twitterUsername: "twitter",
                };

                for (const [key, value] of Object.entries(socialMedia)) {

                    if (!value) continue;

                    const socialPlatform = socialPlatformMap[key];

                    const existing = await venueSocialMediaRepo.findOne({
                        venue_code: venueCode,
                        social_platform: socialPlatform
                    });

                    // console.log(existing);
                    if (existing) {

                        await venueSocialMediaRepo.update(
                            {
                                venue_code: venueCode,
                                social_platform: socialPlatform
                            },
                            {
                                user_name: value
                            },
                            { transaction }
                        );

                    } else {

                        await venueSocialMediaRepo.create(
                            {
                                social_media_code: generateCode(),
                                venue_code: venueCode,
                                social_platform: socialPlatform,
                                user_name: value
                            },
                            { transaction }
                        );
                    }
                }
            }

            // venue Schedule
            if(schedule){
                // console.log(schedule);
                const venueSchedules = schedule;

                for (const schedule of venueSchedules) {

                    const { day, startTime, endTime, isClosed } = schedule;

                    if (!day) continue;

                    const normalizedDay = day.toLowerCase();

                    const existing = await venueScheduleRepo.findOne({
                        venue_code: venueCode,
                        working_day: normalizedDay
                    });

                    // console.log(normalizedDay, existing);

                    if (existing) {

                        await venueScheduleRepo.update(
                            {
                                venue_code: venueCode,
                                working_day: normalizedDay
                            },
                            {
                                start_time: startTime,
                                end_time: endTime,
                                status: !isClosed
                            },
                            { transaction }
                        );

                    } else {

                        await venueScheduleRepo.create(
                            {
                                venue_schedule_code: generateCode(),
                                venue_code: venueCode,
                                working_day: normalizedDay,
                                start_time: startTime,
                                end_time: endTime,
                                status: !isClosed
                            },
                            { transaction }
                        );

                    }
                }
            }

            // deletedImages
            if(deletedImages){
                    // console.log(deletedImages);

                    for(const image of deletedImages){

                        const exitingImage = await attachmentRepo.findOne({
                                attachment_code: image
                        })

                        if(exitingImage){
                            await attachmentService.delete(image, actor)
                        }
                    }

            }

            // venue Images, venue attachment also store in attachment table

            if(uploadedFiles){
                // console.log(uploadedFiles);
                const options = {
                    entityType: "venue",
                    entityCode: venueCode,
                    attachmentCategory: "gallery",
                    uploadedBy: actor.userCode,
                    visibility: "public",
                    transaction
                }
                await attachmentService.uploadMultiple(uploadedFiles, options)
            }


            await transaction.commit();

            return true

        } catch(err){
            if(!transaction.finished)
                await transaction.rollback();
            throw err;
        }
    }

    // Delete venue

    async delete(venueCode: string, actor: any) {
        const venue = await venueRepo.findOne({
            venue_code: venueCode
        });

        if (!venue) {
            throw new Error("Venue not found");
        }

        return await venueRepo.delete({
            venue_code: venueCode
        });
    }

    // Deactivate venue

    async deactivate(venueCode: string, data: any, actor: any) {

        const venue = await venueRepo.findOne({
            venue_code: venueCode
        });

        if (!venue) {
            throw new Error("Venue not found");
        }

        return await venueRepo.deactivate({
                venue_code: venueCode
            },
            data
        );
    }
}

export default new VenueService();