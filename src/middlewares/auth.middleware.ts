// import { FastifyReply, FastifyRequest } from "fastify";
// import { verifyAccessToken } from "../utils/jwt";
//
// export async function authenticate(
//     request: FastifyRequest,
//     reply: FastifyReply
// ) {
//     try {
//         const authHeader = request.headers.authorization;
//
//         if (!authHeader || !authHeader.startsWith("Bearer ")) {
//             return reply.status(401).send({
//                 success: false,
//                 message: "Access token required",
//             });
//         }
//
//         const token = authHeader.split(" ")[1];
//         const decoded: any = verifyAccessToken(token);
//
//         // attach user to request
//         (request as any).user = {
//             userCode: decoded.userCode,
//             userType: decoded.userType,
//             businessCode: decoded.businessCode,
//         };
//     } catch (err) {
//         return reply.status(401).send({
//             success: false,
//             message: "Invalid or expired token",
//         });
//     }
// }