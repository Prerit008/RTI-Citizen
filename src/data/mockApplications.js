export const mockApplications = {
    "RTI/2026/123456": {
        registrationNumber: "RTI/2026/123456",
        authority: "Ministry of Railways",
        subject: "[DEMO TEST] Sample request for prototype evaluation: Station maintenance records demo",
        submittedOn: "28 August 2026",
        lastUpdated: "28 August 2026",
        status: "With Public Authority",
        statusDescription: "Sample demo application received in evaluation sandbox.",
        timeline: [
            {
                title: "Application submitted",
                description: "Sample RTI application submitted in evaluation sandbox.",
                date: "28 Aug 2026",
                time: "10:42 AM",
                completed: true,
            },
            {
                title: "Payment confirmed",
                description: "Simulated fee payment received.",
                date: "28 Aug 2026",
                time: "10:43 AM",
                completed: true,
            },
            {
                title: "Sent to public authority",
                description: "Forwarded to Demo CPIO in evaluation sandbox.",
                date: "28 Aug 2026",
                time: "11:15 AM",
                completed: true,
            },
            {
                title: "Under consideration",
                description: "Synthetic response compilation in progress.",
                date: null,
                time: null,
                completed: false,
                current: true,
            },
            {
                title: "Response issued",
                description: "The response will appear here once issued.",
                date: null,
                time: null,
                completed: false,
            },
        ],
    },
};