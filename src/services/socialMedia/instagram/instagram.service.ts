import {instagramGraphApi, instagramOAuthApi} from "../../../api/instagram/instagram.api.js";
import { env } from "../../../config/env.js";

class InstagramService {

     // Generate Instagram Login URL
    getLoginUrl(){

        const scopes = [
            "instagram_business_basic",
            "instagram_business_content_publish",
            "instagram_business_manage_comments",
            "instagram_business_manage_messages"
        ];


        const url =
            "https://www.instagram.com/oauth/authorize"
            +
            `?client_id=${env.INSTAGRAM_APP_ID}`
            +
            `&redirect_uri=${encodeURIComponent(
                env.INSTAGRAM_REDIRECT_URI
            )}`
            +
            `&scope=${scopes.join(",")}`
            +
            "&response_type=code";

        // console.log(env.INSTAGRAM_REDIRECT_URI);
        // console.log(url);

        return url;

    }

    /**
     * Exchange code for token
     */
    async exchangeCode(code:string){

        try {

            const response = await instagramOAuthApi.post(

                    "/oauth/access_token",

                    new URLSearchParams({

                        client_id: env.INSTAGRAM_APP_ID,
                        client_secret: env.INSTAGRAM_APP_SECRET,
                        grant_type: "authorization_code",
                        redirect_uri: env.INSTAGRAM_REDIRECT_URI,
                        code

                    })

                );


            return response.data;


        } catch(error:any){

            console.log("INSTAGRAM TOKEN ERROR:", error.response?.data);
            throw error;

        }

    }



     // Get long lived token
    async getLongLivedToken(accessToken:string){
        const response = await instagramGraphApi.get(
                "/access_token",
                {
                    params:{
                        grant_type: "ig_exchange_token",
                        client_secret: env.INSTAGRAM_APP_SECRET,
                        access_token: accessToken
                    }
                }
            );
        return response.data;
    }

    // when instagram accessToken expires, the token refresh (two possible ways)
        /*
                the business wants to fetch latest data from influencer account
                the influencer wants show their updated profile
         */


    /**
     * Get Instagram Account
     */
    async getProfile(token: string) {

        try {
            const response = await instagramGraphApi.get(
                "/me",
                {
                    params: {
                        fields: "id,username,account_type,media_count,followers_count",
                        access_token: token
                    }
                }
            );
            return response.data;

        } catch (error: any) {

            console.log(JSON.stringify(error.response?.data, null, 2)
            );

            throw error;
        }
    }

    async getProfileEngagement()



    /**
     * Create Post Container
     */
    // async createMedia(
    //     userId:string,
    //     imageUrl:string,
    //     caption:string,
    //     token:string
    // ){
    //
    //
    //     const response =
    //         await instagramApi.post(
    //
    //             `/${userId}/media`,
    //
    //             null,
    //
    //             {
    //                 params:{
    //
    //                     image_url:
    //                     imageUrl,
    //
    //                     caption,
    //
    //                     access_token:
    //                     token
    //
    //                 }
    //             }
    //
    //         );
    //
    //
    //     return response.data.id;
    //
    // }
    //
    //
    //
    //
    //
    // /**
    //  * Publish Post
    //  */
    // async publishMedia(
    //     userId:string,
    //     creationId:string,
    //     token:string
    // ){
    //
    //
    //     const response =
    //         await instagramApi.post(
    //
    //             `/${userId}/media_publish`,
    //
    //             null,
    //
    //             {
    //                 params:{
    //
    //                     creation_id:
    //                     creationId,
    //
    //                     access_token:
    //                     token
    //
    //                 }
    //             }
    //
    //         );
    //
    //
    //     return response.data;
    //
    // }
    //
    //
    //
    //
    //
    //
    // /**
    //  * Complete publish flow
    //  */
    // async publishPost(
    //     userId:string,
    //     imageUrl:string,
    //     caption:string,
    //     token:string
    // ){
    //
    //
    //     const containerId =
    //         await this.createMedia(
    //             userId,
    //             imageUrl,
    //             caption,
    //             token
    //         );
    //
    //
    //     return await this.publishMedia(
    //         userId,
    //         containerId,
    //         token
    //     );
    //
    // }
    //
    //
    //
    //
    //
    // /**
    //  * Webhook Verify
    //  */
    // verifyWebhook(
    //     mode:string,
    //     token:string,
    //     challenge:string
    // ){
    //
    //
    //     if(
    //         mode==="subscribe"
    //         &&
    //         token===env.INSTAGRAM_VERIFY_TOKEN
    //     ){
    //
    //         return challenge;
    //
    //     }
    //
    //
    //     throw new Error(
    //         "Invalid verify token"
    //     );
    //
    // }
    //
    //
    //
    //
    //
    //
    // /**
    //  * Receive Webhook Events
    //  */
    // async handleWebhook(
    //     payload:any
    // ){
    //
    //     console.log(
    //         "INSTAGRAM EVENT",
    //         JSON.stringify(
    //             payload,
    //             null,
    //             2
    //         )
    //     );
    //
    //
    //     return true;
    //
    // }



}


export default new InstagramService();