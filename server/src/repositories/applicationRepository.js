import { mockApplications } from "../data/mockData.js";
import {
    generateRegistrationNumber,
    calculateSlaDeadline,
    calculateSlaCountdown,
    formatCitizenDate,
    formatCitizenTime,
} from "../utils/helpers.js";

let applications = [...mockApplications];

export const applicationRepository = {
    async create(data) {
        const now = new Date();
        const filedDateStr = now.toISOString().split("T")[0];
        const submittedOnStr = formatCitizenDate(now);
        const registrationNumber = data.registrationNumber || generateRegistrationNumber();
        const slaDeadlineDate = calculateSlaDeadline(now, data.isLifeOrLiberty);

        const newApplication = {
            id: registrationNumber,
            registrationNumber,
            userId: data.userId || null,
            authorityId: data.authorityId || data.authority?.id || "general",
            authorityName: data.authorityName || data.authority?.name || "Concerned Public Authority",
            applicantName: data.applicantName || data.applicant?.name || "Citizen Applicant",
            applicantEmail: data.applicantEmail || data.applicant?.email || "",
            applicantMobile: data.applicantMobile || data.applicant?.mobile || "",
            applicantAddress: data.applicantAddress || [
                data.applicant?.address,
                data.applicant?.city,
                data.applicant?.state,
                data.applicant?.pincode,
            ].filter(Boolean).join(", "),
            subject: data.subject || (data.request?.text ? data.request.text.slice(0, 80) + "..." : "RTI Information Request"),
            requestText: data.requestText || data.request?.text || "",
            language: data.language || data.request?.language || "English",
            isBPL: Boolean(data.isBPL || data.request?.isBPL),
            isLifeOrLiberty: Boolean(data.isLifeOrLiberty),
            feeAmount: data.isBPL || data.request?.isBPL ? 0 : (data.feeAmount || 10),
            feeStatus: data.isBPL || data.request?.isBPL ? "Exempted (BPL)" : "Paid",
            paymentMethod: data.paymentMethod || (data.isBPL || data.request?.isBPL ? "BPL Exemption" : "Online UPI/Card"),
            paymentReference: data.paymentReference || `TXN${Date.now()}`,
            filedDate: filedDateStr,
            submittedOn: submittedOnStr,
            lastUpdated: submittedOnStr,
            slaDaysTotal: data.isLifeOrLiberty ? 2 : 30,
            slaDeadlineDate,
            status: "With Public Authority",
            statusType: "active",
            statusDescription: "Your application has been received and is being processed by the concerned Public Information Officer.",
            timeline: [
                {
                    title: "Application submitted",
                    description: "Your RTI application was successfully submitted online.",
                    date: submittedOnStr,
                    time: formatCitizenTime(now),
                    completed: true,
                },
                {
                    title: "Payment confirmed",
                    description: data.isBPL || data.request?.isBPL
                        ? "BPL exemption verified; fee waived."
                        : "Statutory application fee (₹10) successfully processed.",
                    date: submittedOnStr,
                    time: formatCitizenTime(now),
                    completed: true,
                },
                {
                    title: "Forwarded to Central PIO",
                    description: `Transferred to the Nodal PIO of ${data.authorityName || data.authority?.name || "Public Authority"}.`,
                    date: submittedOnStr,
                    time: formatCitizenTime(now),
                    completed: true,
                },
                {
                    title: "Under consideration",
                    description: "The public authority is compiling disclosure records.",
                    date: submittedOnStr,
                    time: formatCitizenTime(now),
                    completed: false,
                    current: true,
                },
                {
                    title: "Response issued",
                    description: "The response and documents will appear here once issued.",
                    date: null,
                    time: null,
                    completed: false,
                },
            ],
        };

        applications.unshift(newApplication);
        return newApplication;
    },

    async findByRegistrationNumber(regNumber) {
        if (!regNumber) return null;
        const normalized = regNumber.trim().toUpperCase();
        const app = applications.find(
            (a) => a.registrationNumber.toUpperCase() === normalized || a.id.toUpperCase() === normalized
        );
        if (!app) return null;

        const slaInfo = calculateSlaCountdown(app.slaDeadlineDate);
        return {
            ...app,
            slaCountdown: slaInfo,
        };
    },

    async findByUser(userId, userEmail) {
        if (!userId && !userEmail) return [];
        return applications
            .filter((a) => (userId && a.userId === userId) || (userEmail && a.applicantEmail?.toLowerCase() === userEmail?.toLowerCase()))
            .map((app) => ({
                ...app,
                slaCountdown: calculateSlaCountdown(app.slaDeadlineDate),
            }));
    },

    async findAll() {
        return applications.map((app) => ({
            ...app,
            slaCountdown: calculateSlaCountdown(app.slaDeadlineDate),
        }));
    },

    async getStats(userId = null, userEmail = null) {
        const list = (userId || userEmail)
            ? applications.filter((a) => (userId && a.userId === userId) || (userEmail && a.applicantEmail?.toLowerCase() === userEmail?.toLowerCase()))
            : applications;

        const total = list.length;
        const active = list.filter((a) => a.statusType === "active" || a.status === "With Public Authority").length;
        const responseReady = list.filter((a) => a.statusType === "response" || a.status === "Response Ready").length;
        const closed = list.filter((a) => a.statusType === "closed" || a.status === "Closed").length;

        return {
            total,
            active,
            responseReady,
            closed,
        };
    },
};
