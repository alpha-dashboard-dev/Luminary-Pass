import admin from "../../config/firebase";
import { Op } from "sequelize";
import userSessionRepo from "../../repositories/user/userSession.repository";

class NotificationService {

    // send notification to single FCM token
    async sendToToken(token: string, title: string, body: string, data: Record<string, string> = {}) {

        return await admin.messaging().send({
            token,
            notification: {title, body},
            data,
        });

    }

    // Send notification to all active sessions of a user
    async sendToUser(userCode: string, title: string, body: string, data: Record<string, string> = {}) {

        const sessions = await userSessionRepo.findAll({

            user_code: userCode,

            status: "active",

            fcm_token: {
                [Op.ne]: null,
            },

        });

        if (!sessions.length) {
            return;
        }

        const messages = sessions.map((session: any) => ({

            token: session.fcm_token,

            notification: {
                title,
                body,
            },

            data,

        }));

        const response = await admin.messaging().sendEach(messages);

        // Remove invalid tokens
        for (let i = 0; i < response.responses.length; i++) {

            const result = response.responses[i];

            if (!result.success) {

                const code = result.error?.code;

                if (
                    code === "messaging/registration-token-not-registered" ||
                    code === "messaging/invalid-registration-token"
                ) {

                    await userSessionRepo.update(
                        {
                            fcm_token: null,
                        },
                        {
                            session_code: sessions[i].session_code,
                        }
                    );

                }

                console.error(result.error);
            }

        }

        return response;
    }

}

export default new NotificationService();