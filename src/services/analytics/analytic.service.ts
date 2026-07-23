import eventRepo from "../../repositories/event/event.repository.js";
import eventParticipantRepo from "../../repositories/event/participant.repository"
import influencerRatingRepo from "../../repositories/influencer/influencerRating.repository.js";
import { fn, col, literal } from "sequelize";


class analyticService {

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

        return Number((completed*100/total).toFixed(2)
        );
    }


    async getTotalInfluencers(actor:any){

    const rows = await eventParticipantRepo.query({

        include:[
            {
                association: "eventParticipant",
                where:{
                    business_code: actor.businessCode
                },
                attributes:[]
            }
        ],

        attributes:[
            [
                fn(
                    "COUNT",
                    fn(
                        "DISTINCT",
                        col("influencer_code")
                    )
                ),
                "total"
            ]
        ],

        raw:true
    });

    // console.log(rows);

    return Number(rows[0].total);
}


    async getAverageRating(actor:any){

        const rows = await influencerRatingRepo.query({

            include:[
                {
                    association:"event",
                    where:{
                        business_code: actor.businessCode
                    },
                    attributes:[]
                }
            ],

            attributes:[
                [
                    fn(
                        "AVG",
                        col("rating")
                    ),
                    "average"
                ]
            ],

            raw:true

        });

        return Number(rows[0].average || 0);
    }


    async getSummary(actor:any){

        const [totalEvents, eventCompletionRate, influencers, averageRating] = await Promise.all([

            this.getTotalEventCount(actor),
            this.getEventCompletionRate(actor),
            this.getTotalInfluencers(actor),
            this.getAverageRating(actor)

        ]);

        return {
            totalEvents,
            eventCompletionRate,
            influencers,
            averageRating
        };

    }

    async getDashboard(actor:any){

        const [summary, eventsOverTime, taskCompletion, reachImpressions, badgeBreakdown, topInfluencers] = await Promise.all([
            this.getSummary(actor),
            // this.getEventsOverTime(actor),
            //
            // this.getTaskCompletion(actor),
            //
            // this.getReachImpressions(actor),
            //
            // this.getBadgeBreakdown(actor),
            //
            // this.getTopInfluencers(actor)

        ]);

        return {

            summary,
            // eventsOverTime,
            // taskCompletion,
            // reachImpressions,
            // badgeBreakdown,
            // topInfluencers
        };

    }




// async getEventsOverTime(actor:any){
//
//     return await eventRepo.query({
//
//         where:{
//             business_code: actor.businessCode
//         },
//
//         attributes:[
//
//             [
//                 fn(
//                     "DATE_TRUNC",
//                     "month",
//                     col("start_date")
//                 ),
//                 "month"
//             ],
//
//             [
//                 fn(
//                     "COUNT",
//                     col("id")
//                 ),
//                 "events"
//             ]
//
//         ],
//
//         group:[
//             literal(
//                 "DATE_TRUNC('month', start_date)"
//             )
//         ],
//
//         order:[
//             [
//                 literal(
//                     "DATE_TRUNC('month', start_date)"
//                 ),
//                 "ASC"
//             ]
//         ],
//
//         raw:true
//
//     });
//
// }
//     async getTaskCompletion(actor:any){
//
//         const total = await eventChecklistRepo.count({});
//
//         return {
//
//             completed:0,
//
//             pending:total,
//
//             percentage:0
//
//         };
//
//     }



}


export default new analyticService;