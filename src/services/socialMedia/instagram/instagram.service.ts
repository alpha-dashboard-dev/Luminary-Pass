import {instagramGraphApi, instagramOAuthApi} from "../../../api/instagram/instagram.api.js";
import { env } from "../../../config/env.js";
import SocialLoginRepo from "../../../repositories/socialLogin/socialLogin.repository.js";
import {generateCode} from "../../../utils/generateCode.js";
import {InstagramMedia} from "../../../types/instagram/media.types.js";
import socialLoginRepo from "../../../repositories/socialLogin/socialLogin.repository.js";
import influencerService from "../../influencer/influencer.service.js";

class InstagramService {

    private handleInstagramError(error:any){
        console.error(JSON.stringify(
            error.response?.data,
                null,
                2
            )

        );

        throw error;

    }

     // Generate Instagram Login URL
    getLoginUrl(signupToken: string){

        if (!env.INSTAGRAM_PERMISSION_SCOPES) {
            throw new Error("INSTAGRAM SCOPES is not configured");
        }

        const scopes = env.INSTAGRAM_PERMISSION_SCOPES
            .split(",")
            .map(scope => scope.trim())
            .filter(Boolean);


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
            "&response_type=code"
            +
            `&state=${encodeURIComponent(signupToken)}`;

        // console.log(env.INSTAGRAM_REDIRECT_URI);
        // console.log(url);

        return url;

    }


    // getLoginUrl(){
    //     // const scopes = [
    //     //     "instagram_business_basic",
    //     //     "instagram_business_content_publish",
    //     //     "instagram_business_manage_comments",
    //     //     "instagram_business_manage_messages",
    //     //     "instagram_business_manage_insights"
    //     // ];
    //
    //     if (!env.INSTAGRAM_PERMISSION_SCOPES) {
    //         throw new Error("INSTAGRAM SCOPES is not configured");
    //     }
    //
    //     const scopes = env.INSTAGRAM_PERMISSION_SCOPES
    //         .split(",")
    //         .map(scope => scope.trim())
    //         .filter(Boolean);
    //
    //
    //     const url =
    //         "https://www.instagram.com/oauth/authorize"
    //         +
    //         `?client_id=${env.INSTAGRAM_APP_ID}`
    //         +
    //         `&redirect_uri=${encodeURIComponent(
    //             env.INSTAGRAM_REDIRECT_URI
    //         )}`
    //         +
    //         `&scope=${scopes.join(",")}`
    //         +
    //         "&response_type=code";
    //
    //     // console.log(env.INSTAGRAM_REDIRECT_URI);
    //     // console.log(url);
    //
    //     return url;
    //
    // }
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

            // console.log(response.data);

            return response.data;


        } catch(error:any){
            this.handleInstagramError(error);

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
        // console.log(response)
        return response.data;
    }

    // refresh Token
    async refreshAccessToken(accessToken: string) {

        const response = await instagramGraphApi.get(

            "/refresh_access_token",

            {
                params: {
                    grant_type: "ig_refresh_token",
                    access_token: accessToken
                }
            }

        );
        return response.data;
    }

    async getValidAccessToken(userCode: string) {

        // console.log(userCode);

        const social = await SocialLoginRepo.findOne({
                user_code: userCode,
                provider: "instagram"
        });

        if (!social) {
            throw new Error("Instagram account not connected.");
        }

        // console.log(social);

        // Refresh 7 days before expiry
        const remainingDays =
            (social.token_expires_at.getTime() - Date.now()) /
            (1000 * 60 * 60 * 24);

        if (remainingDays > 7) {
            return social.access_token;
        }

        const refreshed = await this.refreshAccessToken(
            social.access_token
        );

        const expiresAt = new Date(
            Date.now() + refreshed.expires_in * 1000
        );

        await SocialLoginRepo.update(
            {
                access_token: refreshed.access_token,
                token_expires_at: expiresAt
            },
            {
                where: {
                    social_login_code: social.social_login_code
                }
            }
        );

        return refreshed.access_token;
    }



    // Get Influencer Instagram Profile
    async getProfile(userCode: string, fields: string) {
        try {

            // console.log(userCode);
            const token = await this.getValidAccessToken(userCode);
            // console.log(token);
            // const user = await socialLoginRepo.findOne(
            //     {
            //         user_code: userCode
            //     }
            // )
            //
            // // console.log(user);
            // if (!user) {
            //     throw new Error("User not found");
            // }

            const fieldArray = fields ? fields.split(",").map(f => f.trim()) : undefined;

            // console.log(fields)
            const profileFields = fieldArray ?? ["id", "username", "account_type", "media_count", "followers_count"];

            // const params: any = {
            //     fields: profileFields.join(","),
            //     access_token: user.access_token
            // };


            const response = await instagramGraphApi.get(
                "/me",
                {
                    params: {
                        fields: profileFields.join(","),
                        access_token: token
                    }
                }
            );

            // console.log(response.data)
            await influencerService.update(
                userCode,
                response.data,
            )
            return response.data;

        } catch (error: any) {
            this.handleInstagramError(error);
        }
    }

    /**
     * Fetch user media
     */
    async getMedia(userCode: string, fields: string, limit: bigint) {
        // console.log(userCode);

        try {

            const token = await this.getValidAccessToken(userCode);

            // const user = await socialLoginRepo.findOne(
            //     {
            //         user_code: userCode
            //     }
            // )
            //
            // if (!user) {
            //     throw new Error("User not found");
            // }

            const fieldArray = fields ? fields.split(",").map(f => f.trim()) : undefined;

            // console.log(fields)
            const profileFields = fieldArray ?? [
                "id", "caption", "media_type", "media_url", "thumbnail_url", "permalink", "timestamp", "like_count", "comments_count"
            ];

            const response = await instagramGraphApi.get(

                    "/me/media",

                    {
                        params: {

                            fields: profileFields.join(","),
                            limit,
                            access_token: token

                        }

                    }

                );


            return response.data.data;


        } catch (error: any) {

            this.handleInstagramError(error);

        }

    }

    async getMediaById(userCode: string, mediaId: string) {
        // console.log(userCode);
        try {

            const token = await this.getValidAccessToken(userCode);

            const response = await instagramGraphApi.get(

                `/${mediaId}`,

                {

                    params: {

                        fields: [

                            "id",

                            "caption",

                            "media_type",

                            "media_url",

                            "thumbnail_url",

                            "permalink",

                            "timestamp",

                            "like_count",

                            "comments_count"

                        ].join(","),

                        access_token: token

                    }

                }

            );


            return response.data;

        } catch (error: any) {

            this.handleInstagramError(error);

        }

    }


    // async getMediaById(mediaId: string, accessToken: string) {
    //     // console.log(accessToken)
    //     try {
    //
    //         const response = await instagramGraphApi.get(
    //
    //                 `/${mediaId}`,
    //
    //                 {
    //
    //                     params: {
    //
    //                         fields: [
    //
    //                             "id",
    //
    //                             "caption",
    //
    //                             "media_type",
    //
    //                             "media_url",
    //
    //                             "thumbnail_url",
    //
    //                             "permalink",
    //
    //                             "timestamp",
    //
    //                             "like_count",
    //
    //                             "comments_count"
    //
    //                         ].join(","),
    //
    //                         access_token: accessToken
    //
    //                     }
    //
    //                 }
    //
    //             );
    //
    //
    //         return response.data;
    //
    //     } catch (error: any) {
    //
    //         this.handleInstagramError(error);
    //
    //     }
    //
    // }

    async getComments(mediaId: string, accessToken: string) {

        try {

            const response = await instagramGraphApi.get(

                    `/${mediaId}/comments`,

                    {
                        params: {
                            fields: "id,text,username,timestamp",
                            access_token: accessToken
                        }

                    }

                );


            return response.data;

        }

        catch (error: any) {

            this.handleInstagramError(error);

        }

    }

    calculateEngagement(media: InstagramMedia[]) {


        const totalPosts = media.length;

        const totalLikes = media.reduce(

                (sum, post) => sum + (post.like_count ?? 0),
                0

            );


        const totalComments = media.reduce(
                (sum, post) => sum + (post.comments_count ?? 0),
                0

            );


        const averageLikes = totalPosts ? totalLikes / totalPosts : 0;

        const averageComments = totalPosts ? totalComments / totalPosts : 0;

        const averageEngagement = totalPosts ? (totalLikes + totalComments) / totalPosts : 0;


        return {
            totalPosts,
            totalLikes,
            totalComments,
            averageLikes,
            averageComments,
            averageEngagement
        };

    }


    async getDashboard(userCode: string, fields: string, limit: bigint) {

        const profile = await this.getProfile(userCode, fields);

        const mediaResponse = await this.getMedia(userCode, fields, limit);

        const engagement = this.calculateEngagement(mediaResponse.data);


        return {
            profile,
            statistics: engagement,
            recentPosts: mediaResponse.data,
        };

    }

}


export default new InstagramService();