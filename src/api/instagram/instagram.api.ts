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


export const instagramBusinessApi = axios.create({

        baseURL: "https://graph.facebook.com/v23.0",

        headers:{
            "Content-Type": "application/json"
        }

});