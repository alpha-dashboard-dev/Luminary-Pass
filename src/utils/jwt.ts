// // JWT utility — generates and verifies access and refresh tokens.
// // Secrets and expiry durations are loaded from environment variables.
// import jwt from "jsonwebtoken";
//
// const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN!;
// const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN!;
//
// /** Creates a short-lived access token (e.g. 15m) used to authenticate API calls. */
// export const generateAccessToken = (payload: any) => {
//     return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
//         expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES as any,
//     });
// };
//
// /** Creates a long-lived refresh token (e.g. 7d) used to obtain new access tokens. */
// export const generateRefreshToken = (payload: any) => {
//     return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
//         expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES as any,
//     });
// };
//
// /** Verifies an access token and returns the decoded payload. Throws if invalid/expired. */
// export const verifyAccessToken = (token: string) => {
//     return jwt.verify(token, ACCESS_TOKEN_SECRET);
// };
//
// /** Verifies a refresh token and returns the decoded payload. Throws if invalid/expired. */
// export const verifyRefreshToken = (token: string) => {
//     return jwt.verify(token, REFRESH_TOKEN_SECRET);
// };
