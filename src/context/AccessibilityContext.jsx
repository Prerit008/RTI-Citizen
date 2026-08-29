import { createContext, useContext, useState, useEffect } from "react";

const AccessibilityContext = createContext(null);

const DEFAULT_SETTINGS = {
    fontSize: "normal", // 'small' | 'normal' | 'large' | 'xlarge'
    highContrast: false,
    grayscale: false,
    readableFont: false,
    underlineLinks: false,
};

export function AccessibilityProvider({ children }) {
    const [settings, setSettings] = useState(() => {
        try {
            const saved = localStorage.getItem("rti_accessibility");
            return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
        } catch {
            return DEFAULT_SETTINGS;
        }
    });

    const [isPanelOpen, setIsPanelOpen] = useState(false);

    useEffect(() => {
        const root = document.documentElement;

        // Font size
        switch (settings.fontSize) {
            case "small":
                root.style.fontSize = "90%";
                break;
            case "large":
                root.style.fontSize = "112.5%";
                break;
            case "xlarge":
                root.style.fontSize = "125%";
                break;
            default:
                root.style.fontSize = "100%";
                break;
        }

        // High Contrast
        if (settings.highContrast) {
            root.classList.add("high-contrast");
        } else {
            root.classList.remove("high-contrast");
        }

        // Grayscale
        if (settings.grayscale) {
            root.classList.add("grayscale-mode");
        } else {
            root.classList.remove("grayscale-mode");
        }

        // Readable font
        if (settings.readableFont) {
            root.classList.add("readable-font");
        } else {
            root.classList.remove("readable-font");
        }

        // Underline links
        if (settings.underlineLinks) {
            root.classList.add("underline-links");
        } else {
            root.classList.remove("underline-links");
        }

        try {
            localStorage.setItem("rti_accessibility", JSON.stringify(settings));
        } catch (e) {
            console.error(e);
        }
    }, [settings]);

    const setFontSize = (size) => {
        setSettings((prev) => ({ ...prev, fontSize: size }));
    };

    const increaseFontSize = () => {
        setSettings((prev) => {
            const map = { small: "normal", normal: "large", large: "xlarge", xlarge: "xlarge" };
            return { ...prev, fontSize: map[prev.fontSize] || "large" };
        });
    };

    const decreaseFontSize = () => {
        setSettings((prev) => {
            const map = { xlarge: "large", large: "normal", normal: "small", small: "small" };
            return { ...prev, fontSize: map[prev.fontSize] || "small" };
        });
    };

    const resetFontSize = () => {
        setSettings((prev) => ({ ...prev, fontSize: "normal" }));
    };

    const toggleHighContrast = () => {
        setSettings((prev) => ({ ...prev, highContrast: !prev.highContrast }));
    };

    const toggleGrayscale = () => {
        setSettings((prev) => ({ ...prev, grayscale: !prev.grayscale }));
    };

    const toggleReadableFont = () => {
        setSettings((prev) => ({ ...prev, readableFont: !prev.readableFont }));
    };

    const toggleUnderlineLinks = () => {
        setSettings((prev) => ({ ...prev, underlineLinks: !prev.underlineLinks }));
    };

    const resetAll = () => {
        setSettings(DEFAULT_SETTINGS);
    };

    return (
        <AccessibilityContext.Provider
            value={{
                settings,
                setFontSize,
                increaseFontSize,
                decreaseFontSize,
                resetFontSize,
                toggleHighContrast,
                toggleGrayscale,
                toggleReadableFont,
                toggleUnderlineLinks,
                resetAll,
                isPanelOpen,
                setIsPanelOpen,
            }}
        >
            {children}
        </AccessibilityContext.Provider>
    );
}

export function useAccessibility() {
    const context = useContext(AccessibilityContext);
    if (!context) {
        throw new Error("useAccessibility must be used within AccessibilityProvider");
    }
    return context;
}
