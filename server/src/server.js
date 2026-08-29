import app from "./app.js";
import { config } from "./config/index.js";

const server = app.listen(config.port, () => {
    console.log(`=============================================`);
    console.log(`  RTI Citizen Express Backend Server Ready `);
    console.log(`  Port: http://localhost:${config.port}         `);
    console.log(`  Health: http://localhost:${config.port}/api/health`);
    console.log(`=============================================`);
});

// Graceful shutdown handling
process.on("SIGTERM", () => {
    console.log("SIGTERM received. Shutting down gracefully...");
    server.close(() => {
        console.log("Server closed.");
    });
});

export default server;
