import jwt from "jsonwebtoken";
import {env} from "../config/env.js";

const SIGNUP_TOKEN_EXPIRES = "1d";

export function generateSignupToken(userCode: string) {
    return jwt.sign(
        {
            userCode,
            type: "signup"
        },
        env.JWT_ACCESS_SECRET_TOKEN,
        {
            expiresIn: SIGNUP_TOKEN_EXPIRES
        }
    );
}

export function verifySignupToken(token: string) {
    const payload = jwt.verify(token, env.JWT_ACCESS_SECRET_TOKEN) as any;

    if (payload.type !== "signup") {
        throw new Error("Invalid signup token");
    }

    return payload;
}