import { createContext, useContext, useState } from "react";

const RTIApplicationContext = createContext(null);

const initialApplication = {
    authority: {
        id: "",
        name: "",
        ministry: "",
    },

    applicant: {
        name: "",
        email: "",
        mobile: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
    },

    request: {
        text: "",
        language: "English",
        isBPL: false,
        attachment: null,
    },
};

export function RTIApplicationProvider({ children }) {
    const [application, setApplication] =
        useState(initialApplication);

    const updateSection = (section, values) => {
        setApplication((current) => ({
            ...current,
            [section]: {
                ...current[section],
                ...values,
            },
        }));
    };

    const resetApplication = () => {
        setApplication(initialApplication);
    };

    return (
        <RTIApplicationContext.Provider
            value={{
                application,
                updateSection,
                resetApplication,
            }}
        >
            {children}
        </RTIApplicationContext.Provider>
    );
}

export function useRTIApplication() {
    const context = useContext(RTIApplicationContext);

    if (!context) {
        throw new Error(
            "useRTIApplication must be used inside RTIApplicationProvider"
        );
    }

    return context;
}