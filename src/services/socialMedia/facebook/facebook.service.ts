import {instagramBusinessApi} from "../../../api/instagram/instagram.api.js";
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

    async getMediaInsights(mediaId:string, accessToken:string){


        const metrics =
            [
                "impressions",
                "reach",
                "likes",
                "comments",
                "saved",
                "shares"
            ].join(",");



        const response = await instagramBusinessApi.get(
                `/${mediaId}/insights`,
                {
                    params:{
                        metric:metrics,
                        access_token:accessToken
                    }
                }
            );


        return response.data.data;

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