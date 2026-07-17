import Fastify from "fastify";

import routes from "./routes/index.js";


const app = Fastify({
    logger: false,
});

app.register(routes, { prefix: "/api" });

// app.ready(() => {
//     console.log(app.printRoutes());
// });

export default app;