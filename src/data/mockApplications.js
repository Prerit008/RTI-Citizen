export const mockApplications = {
    "RTI/2026/123456": {
        registrationNumber: "RTI/2026/123456",

        authority: "Ministry of Railways",

        subject:
            "Information regarding development and maintenance of railway stations",

        submittedOn: "28 August 2026",

        lastUpdated: "28 August 2026",

        status: "With Public Authority",

        statusDescription:
            "Your application has been received by the concerned public authority and is currently being processed.",

        timeline: [
            {
                title: "Application submitted",
                description:
                    "Your RTI application was successfully submitted.",
                date: "28 Aug 2026",
                time: "10:42 AM",
                completed: true,
            },

            {
                title: "Payment confirmed",
                description:
                    "The application fee payment was successfully received.",
                date: "28 Aug 2026",
                time: "10:43 AM",
                completed: true,
            },

            {
                title: "Sent to public authority",
                description:
                    "The application was forwarded to the concerned public authority.",
                date: "28 Aug 2026",
                time: "11:15 AM",
                completed: true,
            },

            {
                title: "Under consideration",
                description:
                    "The public authority is processing your request.",
                date: null,
                time: null,
                completed: false,
                current: true,
            },

            {
                title: "Response issued",
                description:
                    "The response will appear here once issued.",
                date: null,
                time: null,
                completed: false,
            },
        ],
    },
};