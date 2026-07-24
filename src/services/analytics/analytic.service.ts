import eventRepo from "../../repositories/event/event.repository";
import eventParticipantRepo from "../../repositories/event/participant.repository"
import influencerRatingRepo from "../../repositories/influencer/influencerRating.repository";
import eventParticipantChecklistRepo from "../../repositories/event/participantChecklist.repository"
import {fn, col, literal} from "sequelize";
import analytics from "./analyticHelper.js";


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

    async getEventCompletionRate(actor: any) {

        // console.log(actor);
        const total = await eventRepo.count({
            business_code: actor.businessCode
        });

        if(total===0)
            return 0;

        const completed = await eventRepo.count({
            business_code: actor.businessCode,
            status: "completed"
        });

        return Number(
            (completed*100/total).toFixed(2)
        );
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

    //     const rows = await eventParticipantRepo.query({
    //
    //     include:[
    //         {
    //             association: "eventParticipant",
    //             where:{
    //                 business_code: actor.businessCode
    //             },
    //             attributes:[]
    //         }
    //     ],
    //
    //     attributes:[
    //         [
    //             fn(
    //                 "COUNT",
    //                 fn(
    //                     "DISTINCT",
    //                     col("influencer_code")
    //                 )
    //             ),
    //             "total"
    //         ]
    //     ],
    //
    //     raw:true
    // });
    //
    // console.log(rows);
    //
    // return Number(rows[0].total);
}
    // Average rating across all influencer rating records for events owned by the business.


    async getAverageRating(query: any = {}, actor: any) {
        const rows = await influencerRatingRepo.aggregate({
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
                    fn("AVG", col("rating")),
                    "average_rating",
                ],
            ],
            group: ["influencer_code"],
            raw: true,
        });
        if (!rows.length) return 0;

        const total = rows.reduce(
            (sum: number, row: any) =>
                sum + Number(row.average_rating),
            0
        );
        return total / rows.length;
    }

    // Get Average Rating per influencer


    async averageRatingOfEachInfluencer(query: any = {}, actor:any){
        const influencerAverages = await influencerRatingRepo.aggregate({
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
                        fn("AVG", col("rating")),
                        "average_rating",
                    ],
                ],
                group: ["influencer_code"],

                raw: true,
            });

        return influencerAverages;
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

    // async taskCompletionRating(query: any = {} ,actor:any){
    //
    //     // // console.log(query)
    //     //
    //     // const event = await eventRepo.findAll(
    //     //     {
    //     //         where: {
    //     //             business_code: actor.businessCode
    //     //         },
    //     //         include: Array.isArray(query.include) ? query.include : [],
    //     //     }
    //     // )
    //     //
    //     // if(!event){
    //     //     throw new Error("Event does not belong to your business")
    //     // }
    //     //
    //     // // console.log(event)
    //     //
    //     // const eventCodes = event.map(row => row.event_code);
    //     //
    //     // // console.log(eventCodes)
    //     //
    //     // let total = 0;
    //     //
    //     // for(const event of eventCodes){
    //     //     total = await eventParticipantRepo.count({
    //     //         event_code: event
    //     //     })
    //     // }
    //     //
    //     // // console.log(total);
    //     //
    //     // // for(const event of eventCodes){
    //     // //     total = await eventParticipantChecklistRepo.count({
    //     // //         event_code: event,
    //     // //     });
    //     // //
    //     // // }
    //
    //
    //     const eventParticipant = await eventParticipantChecklistRepo.findAll({
    //         include: Array.isArray(query.include) ? query.include : [],
    //         // where: {
    //         //     business_code: actor.businessCode
    //         // }
    //     })
    //
    //     return eventParticipant
    //
    //     // return {
    //     //     completed:0,
    //     //     pending:total,
    //     //     percentage:0
    //     // };
    //
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