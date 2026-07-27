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



    // Get Influencer Instagram Profile
    async getProfile(userCode: string, fields: string) {
        try {

            // console.log(fields)
            const user = await socialLoginRepo.findOne(
                {
                    user_code: userCode
                }
            )

            if (!user) {
                throw new Error("User not found");
            }

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
                        access_token: user.access_token
                    }
                }
            );
            console.log(response.data)
            await influencerService.update(
                { user_code: userCode },
                response.data,
            )
            return response.data;

        } catch (error: any) {
            this.handleInstagramError(error);
        }
    }

    async saveSocialLogin(userCode:string, tokenData:any, profile:any){


        const existing = await SocialLoginRepo.findOne({

                where:{
                    provider: "instagram",
                    provider_user_id: tokenData.user_id
                }
            });

        const expiresAt = tokenData.expires_in ? new Date(Date.now() + tokenData.expires_in * 1000) : null;

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

    /**
     * Fetch user media
     */
    async getMedia(userCode: string, fields: string, limit: bigint) {

        try {

            const user = await socialLoginRepo.findOne(
                {
                    user_code: userCode
                }
            )

            if (!user) {
                throw new Error("User not found");
            }

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
                            access_token: user.access_token

                        }

                    }

                );


            return response.data;


        } catch (error: any) {

            this.handleInstagramError(error);

        }

    }

    async getMediaById(mediaId: string, accessToken: string) {
        // console.log(accessToken)
        try {

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

                            access_token: accessToken

                        }

                    }

                );


            return response.data;

        } catch (error: any) {

            this.handleInstagramError(error);

        }

    }

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