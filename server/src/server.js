import app from "./app.js";
import { config } from "./config/index.js";

const server = app.listen(config.port, () => {
    console.log(`RTI Citizen Express Backend Server Ready `);
});

// Keep the Render service warm by pinging the health endpoint
const keepAlive = setInterval(async () => {
    try {
        const baseUrl = process.env.RENDER_EXTERNAL_URL
            || `http://localhost:${config.port}`;

        const response = await fetch(`${baseUrl}/api/health`);

        if (response.ok) {
            console.log(
                `[Keep-Alive] Health check successful: ${new Date().toISOString()}`
            );
        } else {
            console.warn(
                `[Keep-Alive] Health check returned status ${response.status}`
            );
        }
    } catch (error) {
        console.error(
            `[Keep-Alive] Health check failed: ${error.message}`
        );
    }
}, 10 * 60 * 1000); // Every 10 minutes

// Graceful shutdown handling
process.on("SIGTERM", () => {
    console.log("SIGTERM received. Shutting down gracefully...");
    server.close(() => {
        console.log("Server closed.");
        clearInterval(keepAlive); // Stop the keep-alive timer
    });
});

export default server;
