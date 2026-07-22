import Fastify from "fastify";
import multipart from "@fastify/multipart";

import routes from "./routes/index.js";


const app = Fastify({
    logger: false,
});


await app.register(multipart, {
    attachFieldsToBody: false,
    // saveRequestFiles: false,
    limits: {
        fileSize: 50 * 1024 * 1024, // 50 MB
    }
});

app.register(routes, { prefix: "/api" });

// app.ready(() => {
//     console.log(app.printRoutes());
// });

export default app;