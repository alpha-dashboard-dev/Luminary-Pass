import eventRepo from "../../repositories/event/event.repository";
import eventParticipantRepo from "../../repositories/event/participant.repository"
import influencerRatingRepo from "../../repositories/influencer/influencerRating.repository";
import eventParticipantChecklistRepo from "../../repositories/event/participantChecklist.repository"
import {fn, col, literal} from "sequelize";
import analytics from "./analyticHelper.js";
import participantChecklistRepo from "../../repositories/event/participantChecklist.repository";
import {buildIncludes} from "../../utils/buildInclude.js";


class analyticService {

    // get total events of per business
    async getTotalEventCount(actor: any) {
        // console.log(actor)
        let totalEvents;
        totalEvents = await eventRepo.count({
            business_code: actor.businessCode
        })

        return totalEvents;
    }

    // get Total Influencers that participate in event
    async getTotalInfluencers(query: any = {}, actor:any){

        const event = await eventRepo.findAll(
            {
                where: {
                    business_code: actor.businessCode
                }
            }
        )
        const eventCodes = event.map(row => row.event_code);
        // console.log("event", eventCodes)

        let eventParticipant = 0;
        for(const event of eventCodes){
            eventParticipant = await eventParticipantRepo.count(
                {
                    event_code: event
                },
                {
                    distinct: true,
                    col: "influencer_code"
                }
            )
        }
        // console.log("event", eventParticipant);

        return eventParticipant;

    }

    async getEventCompletionRate(actor: any) {

        // console.log(actor);
        const total = await eventRepo.count({
            business_code: actor.businessCode
        });

        if (total === 0)
            return 0;

        const completed = await eventRepo.count({
            business_code: actor.businessCode,
            status: "completed"
        });

        return Number(
            (completed * 100 / total).toFixed(2)
        );
    }


    // Average rating across all influencer rating records for events owned by the business.
    async getAverageRating(query: any = {}, actor: any) {

        const rows = await influencerRatingRepo.findAll({

            include: [
                {
                    association: "event",
                    where: {
                        business_code: actor.businessCode,
                    },
                    attributes: [],
                },
            ],

            attributes: [
                "influencer_code",
                [
                    analytics.avg("rating"),
                    "average_rating",
                ],
            ],

            group: ["influencer_code"],

            raw: true,
        });

        if (!rows.length) {
            return 0;
        }

        const total = rows.reduce(
            (sum: number, row: any) =>
                sum + Number(row.average_rating),
            0
        );

        return total / rows.length;
    }

    // Get Average Rating per influencer
    async averageRatingOfEachInfluencer(query: any = {}, actor:any){
        const influencerAverages = await influencerRatingRepo.findAll({
                include: [
                    {
                        association: "event",
                        where: {
                            business_code: actor.businessCode,
                        },
                        attributes: [],
                    },
                ],

                attributes: [
                    "influencer_code",
                    [
                        analytics.avg("rating"),
                        "average_rating",
                    ],
                ],
                group: ["influencer_code"],

                raw: true,
            });

        return influencerAverages;
    }

    async getEventsOverTime(query: any = {}, actor: any) {
        // console.log(query.period)
        return await eventRepo.findAll({
            where: {
                business_code: actor.businessCode
            },

            attributes: [
                [
                    analytics.dateTrunc(query.period, "start_date"),
                    "period"
                ],
                [
                    analytics.count("id"),
                    "events"
                ]
            ],
            group: [
                analytics.literal(`DATE_TRUNC('${query.period}', start_date)`)
            ],
            order: [
                [
                    analytics.literal(`DATE_TRUNC('${query.period}', start_date)`),
                    "ASC"
                ]
            ],
            raw: true
        });

    }


    async taskCompletionRating(query: any = {},actor:any){

        const include = [
            {
                association:"checklist",
                attributes:[],
                include:[
                    {
                        association:"event",
                        where:{
                            // business_code: actor.businessCode
                            business_code: "1D9C271F"
                        },
                        attributes:[]
                    }
                ]
            }
        ];


        const total = await participantChecklistRepo.count(
            {},
            {
                include
            }
        );


        if(total === 0){
            return {
                completed:0,
                pending:0,
                percentage:0
            };
        }


        const completed = await participantChecklistRepo.count(
            {
                completion_status:"completed"
            },
            {
                include
            }
        );


        return {
            completed,
            pending: total - completed,
            percentage: Number(
                ((completed * 100) / total).toFixed(2)
            )
        };
    }

    // Analytics Summary
    // async getSummary(actor:any) {
    //
    //     const [totalEvents, eventCompletionRate, influencers, averageRating] = await Promise.all([
    //
    //         this.getTotalEventCount(actor),
    //         this.getEventCompletionRate(actor),
    //         // this.getTotalInfluencers(actor),
    //         // this.getAverageRating(actor)
    //
    //     ]);
    //
    //     return {
    //         totalEvents,
    //         eventCompletionRate,
    //         influencers,
    //         averageRating
    //     };
    // }

    // async getTopInfluencers(query: any = {}, actor:any){
    //
    //     return await influencerRatingRepo.query({
    //
    //         include:[
    //             {
    //                 association:"event",
    //                 where:{
    //                     business_code: actor.businessCode
    //                 },
    //                 attributes:[]
    //             },
    //             {
    //                 association:"influencer",
    //                 attributes:[
    //                     "influencer_code"
    //                 ],
    //                 include:[
    //                     {
    //                         association:"user",
    //                         attributes:[
    //                             "username"
    //                         ]
    //                     }
    //                 ]
    //             }
    //         ],
    //
    //         attributes:[
    //
    //             "influencer_code",
    //
    //             [
    //                 fn(
    //                     "AVG",
    //                     col("rating")
    //                 ),
    //                 "rating"
    //             ],
    //
    //             [
    //                 fn(
    //                     "COUNT",
    //                     col("id")),
    //                 "ratings"
    //             ]
    //
    //         ],
    //
    //         group:[
    //             "influencer_code",
    //             "influencer.influencer_code",
    //             "influencer->user.id"
    //         ],
    //
    //         order:[
    //             [
    //                 fn(
    //                     "AVG",
    //                     col("rating")
    //                 ),
    //                 "DESC"
    //             ]
    //         ],
    //
    //         limit:10,
    //
    //         raw:false
    //
    //     });
    // }

    // async getDashboard(actor:any){
    //
    //     const [summary, eventsOverTime, taskCompletion, reachImpressions, badgeBreakdown, topInfluencers] = await Promise.all([
    //         this.getSummary(actor),
    //         // this.getEventsOverTime(actor),
    //         //
    //         // this.getTaskCompletion(actor),
    //         //
    //         // this.getReachImpressions(actor),
    //         //
    //         // this.getBadgeBreakdown(actor),
    //         //
    //         // this.getTopInfluencers(actor)
    //
    //     ]);
    //
    //     return {
    //
    //         summary,
    //         eventsOverTime,
    //         // taskCompletion,
    //         // reachImpressions,
    //         // badgeBreakdown,
    //         // topInfluencers
    //     };
    //
    // }
}


export default new analyticService;