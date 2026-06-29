import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET_TOKEN!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET_TOKEN!;

export interface JwtPayload {

    userCode: string;

    roleCode: string;

    businessCode?: string | null;
}

export function generateAccessToken(payload: JwtPayload) {

    return jwt.sign(payload, ACCESS_SECRET, {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || "15m",
    });
}

export function generateRefreshToken(payload: JwtPayload) {

    return jwt.sign(payload, REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || "15d",
    });
}

export function verifyAccessToken(token: string) {

    return jwt.verify(token, ACCESS_SECRET);
}

export function verifyRefreshToken(token: string) {

    return jwt.verify(token, REFRESH_SECRET);
}