
const VALID_MEDIA_FIELDS = ["id", "media_type", "media_product_type", "timestamp", "permalink"]

export const validateMediaFields = (fields:any) => {

    if (!fields) {
        return;
    }


    if (!Array.isArray(fields)) {
        throw new Error("fields must be an array");
    }


    const invalidFields =
        fields.filter(
            (field:string) =>
                !VALID_MEDIA_FIELDS.includes(field)
        );


    if(invalidFields.length){

        throw new Error(
            `Invalid media fields: ${invalidFields.join(", ")}. Allowed fields: ${VALID_MEDIA_FIELDS.join(", ")}`
        );

    }


};

export const validateGetMedia = (data: any) => {
    const { instagramId, pageAccessToken, fields} = data;

    console.log(fields)

    if(!instagramId){
        throw new Error("instagramId is required");
    }


    if(!pageAccessToken){
        throw new Error("pageAccessToken is required");
    }

    validateMediaFields(fields);

}


export const validateAllMediaInsights = (data: any) => {
    const { instagramId, pageAccessToken, metrics } = data;

    if(!instagramId){
        throw new Error("instagramId is required");
    }

    if(!pageAccessToken){
        throw new Error("pageAccessToken is required");
    }

    if(!metrics || !metrics.length){
        throw new Error("metrics are required");
    }
}
