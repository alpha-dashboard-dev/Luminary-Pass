import Fastify from "fastify";

import authPlugin from "./plugins/auth";
import routes from "./routes/index.js";

const app = Fastify({
    logger: false,
});

await app.register(authPlugin);

app.register(routes, { prefix: "/api" });

export default app;