import dotenv from "dotenv";
dotenv.config();

export const config = {
    port: process.env.PORT || 5001,
    jwtSecret: process.env.JWT_SECRET || "rti_secure_jwt_secret_dev_key_2026",
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
    corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",
    slaDefaultDays: 30,
    lifeOrLibertySlaHours: 48,
};
