import Fastify from "fastify";

import routes from "./routes/index.js";

const app = Fastify({
    logger: false,
});

app.register(routes, { prefix: "/api" });

export default app;