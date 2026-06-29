import Fastify from "fastify";
import cors from "@fastify/cors";
import routes from "./routes/index";

const app = Fastify({
    logger: true,
});

await app.register(cors, {
    // origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
});

// Health check route
app.get("/", async () => {
    return {
        success: true,
        message: "Server is running",
    };
});

// Register all routes under /api
app.register(routes, { prefix: "/api" });

export default app;