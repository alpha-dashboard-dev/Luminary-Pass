import { getMessaging } from "firebase-admin/messaging";
import firebaseAdmin from "../../config/firebase";
import { Op } from "sequelize";
import userSessionRepo from "../../repositories/user/userSession.repository";


class NotificationService {


    private messaging;

    constructor() {
        this.messaging = getMessaging(firebaseAdmin);
    }

    // Send notification to single FCM token
    async sendToToken(token: string, title: string, body: string, data: Record<string, string> = {}) {

        return await this.messaging.send({

            token,

            notification: {
                title,
                body,
            },

            data,

        });

    }


    // Send notification to all active sessions of a user
    async sendToUser(userCode: string, title: string, body: string, data: Record<string, string> = {}) {
        // console.log(userCode, title, body, data);


        const sessions = await userSessionRepo.findAll({

            where: {
                user_code: userCode,

                status: "active",

                fcm_token: {
                    [Op.ne]: null,
                },
            },


        });

        // console.log(sessions);


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


        const response = await this.messaging.sendEach(messages);



        // Remove invalid tokens
        for (let i = 0; i < response.responses.length; i++) {


            const result = response.responses[i];


            if (!result.success) {


                const errorCode = result.error?.code;


                if (
                    errorCode === "messaging/registration-token-not-registered" ||
                    errorCode === "messaging/invalid-registration-token"
                ) {


                    await userSessionRepo.update(

                        {
                            fcm_token: null,
                        },

                        {
                            session_code:
                            sessions[i].session_code,
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