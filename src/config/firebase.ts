import { getApps, initializeApp, cert } from "firebase-admin/app";
import {env} from "./env.js";

const firebaseAdmin = getApps().length > 0 ? getApps()[0]
        : initializeApp({
            credential: cert({
                projectId: env.FIREBASE_PROJECT_ID!,
                clientEmail: env.FIREBASE_CLIENT_EMAIL!,
                privateKey: env.FIREBASE_PRIVATE_KEY!.replace(
                    /\\n/g,
                    "\n"
                ),
            }),
        });

export default firebaseAdmin;

// import { initializeApp, cert } from "firebase-admin/app";
// import serviceAccount from "../../credentials/firebase-service-account.json" with { type: "json" };
// const firebaseAdmin = initializeApp({
//     credential: cert(serviceAccount),
// });
//
// const envKey = env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n");
// const jsonKey = serviceAccount.private_key;
//
// for (let i = 0; i < Math.max(envKey.length, jsonKey.length); i++) {
//     if (envKey[i] !== jsonKey[i]) {
//         console.log("Difference at", i);
//         console.log("ENV :", JSON.stringify(envKey[i]));
//         console.log("JSON:", JSON.stringify(jsonKey[i]));
//         break;
//     }
// }
//
// console.log(envKey === serviceAccount.private_key);
//
// export default firebaseAdmin;