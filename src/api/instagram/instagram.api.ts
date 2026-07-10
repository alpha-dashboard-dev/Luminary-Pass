import axios from "axios";


export const instagramOAuthApi = axios.create({

    baseURL: "https://api.instagram.com",

    headers:{
        "Content-Type": "application/x-www-form-urlencoded"
    }

});

export const instagramGraphApi = axios.create({

    baseURL: "https://graph.instagram.com",

    headers:{
        "Content-Type": "application/json"
    }

});
