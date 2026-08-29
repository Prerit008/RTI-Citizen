import { mockAppeals } from "../data/mockData.js";
import { applicationRepository } from "./applicationRepository.js";
import {
    calculateSlaDeadline,
    calculateSlaCountdown,
    formatCitizenDate,
    formatCitizenTime,
} from "../utils/helpers.js";

let appeals = [...mockAppeals];

export const appealRepository = {
    /**
     * Create a new First Appeal linked to a Parent RTI Application
     */
    async create(data) {
        const parentRegNo = data.parentRegistrationNumber?.trim().toUpperCase();
        if (!parentRegNo) {
            throw new Error("Parent RTI registration number is required to file a First Appeal.");
        }

        // Verify parent RTI exists
        const parentApp = await applicationRepository.findByRegistrationNumber(parentRegNo);
        if (!parentApp) {
            throw new Error(`Parent RTI Application "${parentRegNo}" was not found.`);
        }

        const now = new Date();
        const filedDateStr = now.toISOString().split("T")[0];
        const submittedOnStr = formatCitizenDate(now);
        const randomDigits = Math.floor(100000 + Math.random() * 900000);
        const appealNumber = `APPEAL/${now.getFullYear()}/${randomDigits}`;
        const slaDeadlineDate = calculateSlaDeadline(now, false); // 30 days statutory FAA deadline

        const newAppeal = {
            id: appealNumber,
            appealNumber,
            parentRegistrationNumber: parentApp.registrationNumber,
            parentSubject: parentApp.subject,
            parentFiledDate: parentApp.submittedOn || parentApp.filedDate,
            userId: data.userId || parentApp.userId || null,
            authorityId: parentApp.authorityId || "general",
            authorityName: parentApp.authorityName || "Concerned Public Authority",
            firstAppellateAuthority: `First Appellate Authority (FAA), ${parentApp.authorityName}`,
            appellantName: data.appellantName || parentApp.applicantName || "Citizen Appellant",
            appellantEmail: data.appellantEmail || parentApp.applicantEmail || "",
            appellantMobile: data.appellantMobile || parentApp.applicantMobile || "",
            groundOfAppeal: data.groundOfAppeal || "No Response Received within 30-Day Statutory Limit",
            groundCategory: data.groundCategory || "no_response",
            prayerAndReliefSought: data.prayerAndReliefSought || data.appealText || "Direct the CPIO to furnish the requested information immediately without additional charge.",
            feeAmount: 0,
            feeStatus: "Free / No Fee Required",
            filedDate: filedDateStr,
            submittedOn: submittedOnStr,
            lastUpdated: submittedOnStr,
            slaDaysTotal: 30,
            slaDeadlineDate,
            status: "Admitted with First Appellate Authority",
            statusType: "appeal",
            statusDescription: "Your First Appeal has been registered under Section 19(1) of RTI Act, 2005 and is under consideration by the First Appellate Authority.",
            timeline: [
                {
                    title: "First Appeal Filed",
                    description: `Appeal submitted under Section 19(1) against RTI ${parentApp.registrationNumber}. Ground: ${data.groundOfAppeal || "Statutory Deadline Exceeded"}.`,
                    date: submittedOnStr,
                    time: formatCitizenTime(now),
                    completed: true,
                },
                {
                    title: "Assigned to First Appellate Authority",
                    description: `Transferred to senior FAA of ${parentApp.authorityName} for hearing/disposal.`,
                    date: submittedOnStr,
                    time: formatCitizenTime(now),
                    completed: true,
                    current: true,
                },
                {
                    title: "FAA Hearing & Notice to CPIO",
                    description: "FAA reviews CPIO records and assesses non-disclosure / delay justification.",
                    date: null,
                    time: null,
                    completed: false,
                },
                {
                    title: "First Appeal Order Issued",
                    description: "Final appellate decision and directions to CPIO will appear here.",
                    date: null,
                    time: null,
                    completed: false,
                },
            ],
        };

        appeals.unshift(newAppeal);

        // Also update the parent RTI timeline with the appeal event!
        if (parentApp.timeline) {
            parentApp.timeline.push({
                title: "First Appeal Registered",
                description: `Citizen preferred First Appeal ${appealNumber} under Section 19(1).`,
                date: submittedOnStr,
                time: formatCitizenTime(now),
                completed: true,
            });
            parentApp.status = "Under First Appeal";
            parentApp.hasAppeal = true;
            parentApp.latestAppealNumber = appealNumber;
        }

        return newAppeal;
    },

    async findByAppealNumber(appealNumber) {
        if (!appealNumber) return null;
        const normalized = appealNumber.trim().toUpperCase();
        const appeal = appeals.find(
            (a) => a.appealNumber.toUpperCase() === normalized || a.id.toUpperCase() === normalized
        );
        if (!appeal) return null;

        return {
            ...appeal,
            slaCountdown: calculateSlaCountdown(appeal.slaDeadlineDate),
        };
    },

    async findByParentRegistrationNumber(parentRegNo) {
        if (!parentRegNo) return [];
        const normalized = parentRegNo.trim().toUpperCase();
        return appeals
            .filter((a) => a.parentRegistrationNumber.toUpperCase() === normalized)
            .map((app) => ({
                ...app,
                slaCountdown: calculateSlaCountdown(app.slaDeadlineDate),
            }));
    },

    async list(userId = null) {
        const filtered = userId ? appeals.filter((a) => a.userId === userId) : appeals;
        return filtered.map((app) => ({
            ...app,
            slaCountdown: calculateSlaCountdown(app.slaDeadlineDate),
        }));
    },
};
