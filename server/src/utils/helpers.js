import { config } from "../config/index.js";

/**
 * Generate a standard RTI Registration number
 * Format: RTI/YYYY/XXXXXX
 */
export const generateRegistrationNumber = () => {
    const year = new Date().getFullYear();
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    return `RTI/${year}/${randomDigits}`;
};

/**
 * Calculate statutory SLA deadline date based on RTI Act 2005.
 * Default: 30 days. If concerning life or liberty: 48 hours.
 */
export const calculateSlaDeadline = (filingDate = new Date(), isLifeOrLiberty = false) => {
    const baseDate = new Date(filingDate);
    if (isLifeOrLiberty) {
        baseDate.setHours(baseDate.getHours() + config.lifeOrLibertySlaHours);
    } else {
        baseDate.setDate(baseDate.getDate() + config.slaDefaultDays);
    }
    return baseDate.toISOString().split("T")[0];
};

/**
 * Calculate remaining days for SLA countdown
 */
export const calculateSlaCountdown = (deadlineDateStr) => {
    const now = new Date();
    const deadline = new Date(deadlineDateStr);
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return {
        daysRemaining: Math.max(0, diffDays),
        isOverdue: diffDays < 0,
        deadlineFormatted: deadline.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }),
    };
};

/**
 * Format date for citizen-friendly UI
 */
export const formatCitizenDate = (date = new Date()) => {
    return new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

/**
 * Format time for citizen-friendly UI
 */
export const formatCitizenTime = (date = new Date()) => {
    return new Date(date).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
};
