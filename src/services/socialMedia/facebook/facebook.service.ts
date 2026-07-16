import {instagramBusinessApi} from "../../../api/instagram/instagram.api.js";
import { env } from "../../../config/env.js";
import {MEDIA_METRICS} from "../../../utils/socialAccount/instagramMediaMetrics.js";

class facebookService {

    private filterMediaMetrics(mediaType:string, requestedMetrics:string[]){

        const supported = MEDIA_METRICS[
                mediaType as keyof typeof MEDIA_METRICS
                ] || MEDIA_METRICS.FEED;


        return requestedMetrics.filter(
            metric => supported.includes(metric)
        );

    }

    getFacebookLoginUrl() {

        // const scopes = [
        //     "public_profile",
        //
        //     "email",
        //
        //     "instagram_basic",
        //
        //     "instagram_manage_insights",
        //
        //     "pages_show_list",
        //
        //     "pages_read_engagement",
        //
        //     "pages_read_user_content",
        //
        //     "pages_manage_metadata",
        //
        //     "business_management"
        // ];

        if (!env.FACEBOOK_PERMISSION_SCOPES) {
            throw new Error("FACEBOOK_SCOPES is not configured");
        }

        const scopes = env.FACEBOOK_PERMISSION_SCOPES
            .split(",")
            .map(scope => scope.trim())
            .filter(Boolean);

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

    // Fetch Media
    async getMedia(data:any) {

        const fields = data.fields ?? ["id", "media_type", "media_product_type", "timestamp", "permalink"];

        const params: any = {
            fields: fields.join(","),
            access_token: data.pageAccessToken
        };

        if (data.limit) {
            params.limit = data.limit;
        }

        const response = await instagramBusinessApi.get(
                `/${data.instagramId}/media`,
                {
                    params
                }
            );

        return response.data;

    }


    // Fetch One Media Insights
    async getMediaInsights(mediaId:string, metrics:string[], accessToken:string){

        if(!mediaId){
            throw new Error("mediaId is required");
        }

        if(!metrics || !metrics.length){
            throw new Error("metrics are required");
        }

        const params:any = {

            metric: metrics.join(","),

            access_token: accessToken

        };


        if(metrics.includes("total_interactions")){
            params.metric_type = "total_value";
        }


        const response =
            await instagramBusinessApi.get(
                `/${mediaId}/insights`,
                {
                    params
                }
            );


        return response.data.data;

    }

    // Fetch All Media Insights
    async getAllMediaInsights(data:any){

        const {instagramId, pageAccessToken, metrics} = data;


        const mediaResponse = await this.getMedia(data);


        const media = mediaResponse.data;


        const result = await Promise.all(

                media.map(async(item:any)=>{


                    const allowedMetrics = this.filterMediaMetrics(
                            item.media_product_type,
                            metrics
                        );


                    let insights:any[] = [];


                    if(allowedMetrics.length){

                        insights = await this.getMediaInsights(
                                item.id,
                                allowedMetrics,
                                pageAccessToken
                            );

                    }


                    return {
                        ...item,
                        insights
                    };

                })

            );


        return {
            data: result,
            paging: mediaResponse.paging

        };

    }


    async getReachInsights(data: any){

        const params: any = {
            metric: data.metrics.join(","),
            access_token: data.pageAccessToken
        };

        if (data.period) {
            params.period = data.period;
        }

        if (data.metricType) {
            params.metric_type = data.metricType;
        }

        if (data.since) {
            params.since = data.since;
        }

        if (data.until) {
            params.until = data.until;
        }

        const response = await instagramBusinessApi.get(
            `/${data.instagramId}/insights`,
            {
                params
            }
        );


        return response.data;
    }


    async getEngagementInsights(data: any){

        const params: any = {
            metric: data.metrics.join(","),
            access_token: data.pageAccessToken
        };

        if (data.period) {
            params.period = data.period;
        }

        if (data.metricType) {
            params.metric_type = data.metricType;
        }

        if (data.since) {
            params.since = data.since;
        }

        if (data.until) {
            params.until = data.until;
        }



        const response = await instagramBusinessApi.get(
            `/${data.instagramId}/insights`,
            {
                params
            }
        );


        return response.data.data;
    }

    // Get Engagement By Content Type

    async getEngagementInsightsByContentType(data:any) {


        const {instagramId, pageAccessToken, contentTypes, metrics} = data;


        if(!instagramId){
            throw new Error("instagramId is required");
        }


        if(!pageAccessToken){
            throw new Error("pageAccessToken is required");
        }


        if(!Array.isArray(contentTypes) || !contentTypes.length){
            throw new Error(
                "contentTypes array is required"
            );
        }


        if(!Array.isArray(metrics) || !metrics.length){
            throw new Error(
                "metrics array is required"
            );
        }


        /**
         * Get media with requested insights
         */
        const mediaResponse = await this.getAllMediaInsights(data);


        const media = mediaResponse.data;


        /**
         * Create dynamic dashboard
         */
        const dashboard:any = {};


        for(const type of contentTypes){


            dashboard[type] = {};


            if(metrics.includes("posts")){
                dashboard[type].posts = 0;
            }


            const allowedMetrics =
                this.filterMediaMetrics(
                    type,
                    metrics
                );


            for(const metric of allowedMetrics){

                dashboard[type][metric] = 0;

            }

        }

        // Aggregate
        for(const item of media){


            const type = item.media_product_type;

            if(!dashboard[type]){
                continue;
            }

            // count posts
            if(metrics.includes("posts")){
                dashboard[type].posts++;
            }

            for(const insight of item.insights){

                if(!metrics.includes(insight.name)){
                    continue;
                }
                const value = insight.total_value?.value ??
                    insight.values?.reduce(
                        (sum:number, v:any) => sum + v.value, 0) ?? 0;

                dashboard[type][insight.name] += value;

            }

        }

        return dashboard;

    }


    async getAccountInsights(data: any) {

        const params: any = {
            metric: data.metrics.join(","),
            access_token: data.pageAccessToken
        };

        if (data.period) {
            params.period = data.period;
        }

        if (data.metricType) {
            params.metric_type = data.metricType;
        }

        if (data.since) {
            params.since = data.since;
        }

        if (data.until) {
            params.until = data.until;
        }

        const response = await instagramBusinessApi.get(
            `/${data.instagramId}/insights`,
            {
                params
            }
        );

        return response.data.data;
    }
}


export default new facebookService();