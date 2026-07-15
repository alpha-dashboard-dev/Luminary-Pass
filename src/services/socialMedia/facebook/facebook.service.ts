import {instagramBusinessApi, instagramGraphApi} from "../../../api/instagram/instagram.api.js";
import { env } from "../../../config/env.js";

class facebookService {

    getFacebookLoginUrl() {

        const scopes = [
            "public_profile",

            "email",

            "instagram_basic",

            "instagram_manage_insights",

            "pages_show_list",

            "pages_read_engagement",

            "pages_read_user_content",

            "pages_manage_metadata",

            "business_management"
        ];

        // console.log(env.FACEBOOK_APP_ID);
        // console.log(typeof env.FACEBOOK_APP_ID);

        return (
            "https://www.facebook.com/v23.0/dialog/oauth"
            + `?client_id=${env.FACEBOOK_APP_ID}`
            + `&redirect_uri=${encodeURIComponent(env.FACEBOOK_REDIRECT_URI)}`
            + `&scope=${scopes.join(",")}`
            + "&response_type=code"
        );

    }

    async exchangeFacebookCode(code:string){

        const response = await instagramBusinessApi.get(

                "/oauth/access_token",

                {

                    params:{
                        client_id: env.FACEBOOK_APP_ID,
                        client_secret: env.FACEBOOK_APP_SECRET,
                        redirect_uri: env.FACEBOOK_REDIRECT_URI,
                        code
                    }

                }

            );

        return response.data;

    }

    async getPages(accessToken:string){

        const response = await instagramBusinessApi.get(
            "/me/accounts",
            {
                params:{
                    fields:"id,name,access_token,instagram_business_account",
                    access_token:accessToken
                }
            }
        );


        return response.data.data || [];
    }


    async getInstagramBusinessAccount(accessToken:string){


        const pages = await this.getPages(accessToken);

        const page = pages.find(
            (item:any)=> item.instagram_business_account
        );

        if(!page){
            throw new Error(
                "No Instagram Business account connected"
            );
        }


        return {
            pageId: page.id,
            pageName: page.name,
            pageAccessToken: page.access_token,
            instagramAccountId: page.instagram_business_account.id
        };

    }

    async getMediaByContent(instagramId: string, accessToken: string){
        try{

            const respone = await instagramBusinessApi.get(
                `/${instagramId}/media`,
                {
                    params:{
                        fields:"id,name,access_token,instagram_business_account",
                        access_token:accessToken
                    }
                }
            )

            return respone.data.data

        }catch(error){

        }
    }

    async getMedia(instagramId: string, accessToken: string) {

        const response = await instagramBusinessApi.get(
            `/${instagramId}/media`,
            {
                params: {
                    fields: [
                        "id",
                        "caption",
                        "media_type",
                        "media_product_type",
                        "timestamp",
                        "permalink"
                    ].join(","),

                    access_token: accessToken
                }
            }
        );

        return response.data.data;
    }

    async getMediaInsights(mediaId: string, mediaType: string, metrics: string[], accessToken: string, metricType?: "total_value" | "time_series") {

        const allowedMetrics: Record<string, string[]> = {

            REELS: [
                "views",
                "reach",
                "likes",
                "comments",
                "shares",
                "saved",
                "total_interactions"
            ],

            STORY: [
                "views",
                "reach",
                "replies"
            ],

            FEED: [
                "reach",
                "likes",
                "comments",
                "shares",
                "saved",
                "total_interactions"
            ]

        };

        const supported =
            allowedMetrics[mediaType.toUpperCase()] ??
            allowedMetrics.FEED;

        const invalidMetrics = metrics.filter(
            metric => !supported.includes(metric)
        );

        if (invalidMetrics.length) {
            throw new Error(
                `Metrics [${invalidMetrics.join(", ")}] are not supported for ${mediaType}`
            );
        }

        const params: any = {
            metric: metrics.join(","),
            access_token: accessToken
        };

        if (metricType) {
            params.metric_type = metricType;
        }

        const response = await instagramBusinessApi.get(
            `/${mediaId}/insights`,
            {
                params
            }
        );

        return response.data.data;
    }

    // async getMediaInsights(mediaId: string, mediaType: string, accessToken: string) {
    //
    //     let metrics: string[];
    //
    //     // console.log(mediaType)
    //
    //     switch (mediaType) {
    //
    //         case "REELS":
    //             metrics = [
    //                 "views",
    //                 "reach",
    //                 "likes",
    //                 "comments",
    //                 "shares",
    //                 "saved",
    //                 "total_interactions"
    //             ];
    //             break;
    //
    //         case "STORY":
    //             metrics = [
    //                 "views",
    //                 "reach",
    //                 "replies"
    //             ];
    //             break;
    //
    //         default: // FEED
    //             metrics = [
    //                 "reach",
    //                 "likes",
    //                 "comments",
    //                 "shares",
    //                 "saved",
    //                 "total_interactions"
    //             ];
    //     }
    //
    //     const response = await instagramBusinessApi.get(
    //         `/${mediaId}/insights`,
    //         {
    //             params: {
    //                 metric: metrics.join(","),
    //                 metric_type: "total_value",
    //                 access_token: accessToken
    //             }
    //         }
    //     );
    //
    //     return response.data.data;
    // }

    // Fetch Insights for All Media
    async getAllMediaInsights(instagramId: string, accessToken: string) {

        const media = await this.getMedia(instagramId, accessToken);

        const result = await Promise.all(
            media.map(async (item: any) => {

                const insights = await this.getMediaInsights(
                        item.id,
                        item.media_product_type,
                        accessToken
                    );

                return {
                    ...item,
                    insights
                };

            })

        );

        return result;

    }
    // Get Engagement By Content Type
    async getEngagementByType(instagramId: string, accessToken: string) {

        const media = await this.getAllMediaInsights(instagramId, accessToken);

        const dashboard = {

            FEED: {
                posts: 0,
                reach: 0,
                views: 0,
                likes: 0,
                comments: 0,
                shares: 0,
                saved: 0,
                interactions: 0
            },

            REELS: {
                posts: 0,
                reach: 0,
                views: 0,
                likes: 0,
                comments: 0,
                shares: 0,
                saved: 0,
                interactions: 0
            },

            STORY: {
                posts: 0,
                reach: 0,
                views: 0,
                replies: 0
            },

        };


        for (const item of media) {

            const group = dashboard[item.media_product_type as keyof typeof dashboard];

            if (!group)
                continue;

            group.posts++;

            for (const metric of item.insights) {

                const value =
                    metric.total_value?.value ??
                    metric.values?.[0]?.value ??
                    0;

                switch (metric.name) {

                    case "reach":
                        group.reach += value;
                        break;

                    case "views":
                        group.views += value;
                        break;

                    case "likes":
                        (group as any).likes += value;
                        break;

                    case "comments":
                        (group as any).comments += value;
                        break;

                    case "shares":
                        (group as any).shares += value;
                        break;

                    case "saved":
                        (group as any).saved += value;
                        break;

                    case "replies":
                        (group as any).replies += value;
                        break;

                    case "total_interactions":
                        (group as any).interactions += value;
                        break;

                }

            }

        }

        return dashboard;

    }

    async getReachInsights(instagramId:string, accessToken:string){

        const response = await instagramBusinessApi.get(
            `/${instagramId}/insights`,
            {
                params:{
                    metric:
                        "reach",

                    period:"day",

                    access_token:accessToken
                }
            }
        );


        return response.data.data;
    }


    async getEngagementInsights(instagramId:string, accessToken:string){

        const response = await instagramBusinessApi.get(
            `/${instagramId}/insights`,
            {
                params:{
                    metric:
                        "profile_views,accounts_engaged,total_interactions,likes,comments,shares,saves,replies",

                    metric_type: "total_value",

                    period:"day",

                    access_token:accessToken
                }
            }
        );


        return response.data.data;
    }


    // async getAccountInsights(
    //     instagramId:string,
    //     accessToken:string
    // ){
    //
    //     try {
    //
    //         const response = await instagramBusinessApi.get(
    //             `/${instagramId}/insights`,
    //             {
    //                 params:{
    //                     metric:[
    //                         "reach",
    //                         "follower_count",
    //                         "profile_views",
    //                         "accounts_engaged",
    //                         "total_interactions"
    //                     ].join(","),
    //
    //                     period:"day",
    //
    //                     access_token:accessToken
    //                 }
    //             }
    //         );
    //
    //
    //         return response.data.data;
    //
    //
    //     } catch(error:any){
    //
    //         console.log(
    //             "INSTAGRAM INSIGHTS ERROR:",
    //             JSON.stringify(
    //                 error.response?.data,
    //                 null,
    //                 2
    //             )
    //         );
    //
    //
    //         throw error;
    //
    //     }
    //
    // }




}


export default new facebookService();