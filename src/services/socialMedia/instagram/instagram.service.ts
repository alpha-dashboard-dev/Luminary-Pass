import {instagramGraphApi, instagramOAuthApi} from "../../../api/instagram/instagram.api.js";
import { env } from "../../../config/env.js";
import SocialLoginRepo from "../../../repositories/socialLogin/socialLogin.repository.js";
import {generateCode} from "../../../utils/generateCode.js";

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

    async saveSocialLogin(userCode:string, tokenData:any, profile:any){


        const existing = await SocialLoginRepo.findOne({

                where:{
                    provider: "instagram",
                    provider_user_id: tokenData.user_id
                }
            });



        const expiresAt = tokenData.expires_in ?
                new Date(Date.now() + tokenData.expires_in * 1000) : null;



        if(existing){
            await existing.update({
                access_token: tokenData.access_token,
                token_expires_at: expiresAt,
                last_login_at: new Date()
            });
            return existing;
        }



        return await SocialLoginRepo.create({

            social_login_code: generateCode(),

            user_code: userCode,


            provider: "instagram",


            provider_user_id: profile.id,


            access_token: tokenData.access_token,

            token_expires_at: expiresAt,
            last_login_at: new Date()

        });
    }




}


export default new InstagramService();




// import axios from "axios";
// import { env } from "../../config/env.js";
//
// import SocialLogin from "../socialLogin/socialLogin.model.js";
//
// import { generateCode } from "../../utils/codeGenerator.js";
//
//
// class InstagramService {
//
//
//     /**
//      * Generate Instagram Login URL
//      */
//     getLoginUrl() {
//
//         const scopes = [
//             "instagram_business_basic",
//             "instagram_business_content_publish"
//         ];
//
//
//         const params = new URLSearchParams({
//
//             client_id:
//             env.INSTAGRAM_APP_ID,
//
//
//             redirect_uri:
//             env.INSTAGRAM_REDIRECT_URI,
//
//
//             response_type:
//                 "code",
//
//
//             scope:
//                 scopes.join(",")
//
//         });
//
//
//         return (
//             "https://www.instagram.com/oauth/authorize?"
//             +
//             params.toString()
//         );
//
//     }
//
//
//
//     /**
//      * Exchange authorization code
//      */
//     async exchangeCode(
//         code:string
//     ){
//
//         try {
//
//
//             const response =
//                 await axios.post(
//
//                     "https://api.instagram.com/oauth/access_token",
//
//                     new URLSearchParams({
//
//                         client_id:
//                         env.INSTAGRAM_APP_ID,
//
//
//                         client_secret:
//                         env.INSTAGRAM_APP_SECRET,
//
//
//                         grant_type:
//                             "authorization_code",
//
//
//                         redirect_uri:
//                         env.INSTAGRAM_REDIRECT_URI,
//
//
//                         code
//
//                     }),
//
//                     {
//                         headers:{
//                             "Content-Type":
//                                 "application/x-www-form-urlencoded"
//                         }
//                     }
//
//                 );
//
//
//             return response.data;
//
//
//         } catch(error:any){
//
//             console.log(
//                 "Instagram exchange error:",
//                 error.response?.data
//             );
//
//
//             throw error;
//
//         }
//
//     }
//
//
//
//     /**
//      * Get Instagram account information
//      */
//     async getProfile(
//         token:string
//     ){
//
//         try {
//
//
//             const response =
//                 await axios.get(
//
//                     "https://graph.instagram.com/me",
//
//                     {
//                         params:{
//
//                             fields:
//                                 "id,username,account_type,media_count",
//
//                             access_token:
//                             token
//
//                         }
//
//                     }
//
//                 );
//
//
//             return response.data;
//
//
//         }catch(error:any){
//
//             console.log(
//                 "Instagram profile error:",
//                 error.response?.data
//             );
//
//
//             throw error;
//
//         }
//
//     }
//
//
//
//     /**
//      * Save Instagram login
//      */
//     async saveSocialLogin(
//         userCode:string,
//         tokenData:any,
//         profile:any
//     ){
//
//
//         const existing =
//             await SocialLogin.findOne({
//
//                 where:{
//
//                     provider:
//                         "instagram",
//
//
//                     provider_user_id:
//                     tokenData.user_id
//
//                 }
//
//             });
//
//
//
//         const expiresAt =
//             tokenData.expires_in
//
//                 ?
//                 new Date(
//                     Date.now()
//                     +
//                     tokenData.expires_in * 1000
//                 )
//
//                 :
//                 null;
//
//
//
//         if(existing){
//
//
//             await existing.update({
//
//                 access_token:
//                 tokenData.access_token,
//
//
//                 token_expires_at:
//                 expiresAt,
//
//
//                 last_login_at:
//                     new Date()
//
//             });
//
//
//             return existing;
//
//         }
//
//
//
//         return await SocialLogin.create({
//
//             social_login_code:
//                 generateCode(),
//
//
//             user_code:
//             userCode,
//
//
//             provider:
//                 "instagram",
//
//
//             provider_user_id:
//             profile.id,
//
//
//             access_token:
//             tokenData.access_token,
//
//
//             token_expires_at:
//             expiresAt,
//
//
//             last_login_at:
//                 new Date()
//
//         });
//
//
//     }
//
//
//
//     /**
//      * Refresh long-lived token
//      */
//     async refreshToken(
//         token:string
//     ){
//
//         try {
//
//
//             const response =
//                 await axios.get(
//
//                     "https://graph.instagram.com/refresh_access_token",
//
//                     {
//
//                         params:{
//
//                             grant_type:
//                                 "ig_refresh_token",
//
//
//                             access_token:
//                             token
//
//                         }
//
//                     }
//
//                 );
//
//
//             return response.data;
//
//
//         }catch(error:any){
//
//             console.log(
//                 "Refresh token error:",
//                 error.response?.data
//             );
//
//
//             throw error;
//
//         }
//
//     }
//
//
//
//     /**
//      * Get connected Instagram account
//      */
//     async getAccount(
//         userCode:string
//     ){
//
//         return await SocialLogin.findOne({
//
//             where:{
//
//                 user_code:
//                 userCode,
//
//                 provider:
//                     "instagram"
//
//             }
//
//         });
//
//     }
//
//
//
//     /**
//      * Disconnect Instagram
//      */
//     async disconnect(
//         userCode:string
//     ){
//
//         return await SocialLogin.destroy({
//
//             where:{
//
//                 user_code:
//                 userCode,
//
//                 provider:
//                     "instagram"
//
//             }
//
//         });
//
//     }
//
// }
//
//
// export default new InstagramService();