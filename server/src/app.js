import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import authorityRoutes from "./routes/authorityRoutes.js";
import appealRoutes from "./routes/appealRoutes.js";
import { notFoundHandler, globalErrorHandler } from "./middleware/errorHandler.js";

const app = express();

// Middlewares
app.use(cors({
    origin: "*", // allow all origins during development / cross-origin requests
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Root welcome & API sitemap
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        service: "RTI Citizen Online Platform Backend API",
        status: "online",
        endpoints: {
            health: "GET /api/health",
            auth: {
                login: "POST /api/auth/login",
                register: "POST /api/auth/register",
                me: "GET /api/auth/me (Bearer Token required)",
            },
            applications: {
                create: "POST /api/applications",
                list: "GET /api/applications",
                track: "GET /api/applications/:regNumber",
                stats: "GET /api/applications/stats/summary",
            },
            appeals: {
                create: "POST /api/appeals",
                list: "GET /api/appeals",
                track: "GET /api/appeals/:appealNumber",
                parent: "GET /api/appeals/parent/:regNumber",
            },
            authorities: {
                list: "GET /api/authorities",
                getById: "GET /api/authorities/:id",
            },
        },
    });
});

// Health check endpoint
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        status: "healthy",
        service: "RTI Online Citizen API Platform",
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

// Mount modular API routes
app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/appeals", appealRoutes);
app.use("/api/authorities", authorityRoutes);

// Error Handling
app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
