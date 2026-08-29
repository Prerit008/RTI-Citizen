import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { INDIAN_LANGUAGES, DEFAULT_LANGUAGE } from "../data/languages";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
    const [currentLanguage, setCurrentLanguage] = useState(() => {
        return localStorage.getItem("rti_citizen_language") || DEFAULT_LANGUAGE;
    });
    const [isLangModalOpen, setIsLangModalOpen] = useState(false);
    const [isTranslating, setIsTranslating] = useState(false);

    // Apply Google Translate Cookie and trigger auto-translation
    const applyTranslation = useCallback((langCode) => {
        setIsTranslating(true);
        const targetLang = langCode === "en" ? "/en/en" : `/en/${langCode}`;

        // Set Google Translate Cookie across root domain
        document.cookie = `googtrans=${targetLang}; path=/; domain=${window.location.hostname}`;
        document.cookie = `googtrans=${targetLang}; path=/`;

        // Update HTML lang attribute
        document.documentElement.lang = langCode;

        // Try triggering Google Translate DOM combo if ready
        const select = document.querySelector(".goog-te-combo");
        if (select) {
            select.value = langCode;
            select.dispatchEvent(new Event("change"));
        } else {
            // If combo not in DOM yet, reload or let Google Translate load with cookie
            if (langCode !== "en" && !window.google?.translate) {
                // Initial load
            }
        }

        setTimeout(() => {
            setIsTranslating(false);
        }, 600);
    }, []);

    // Set and persist language
    const setLanguage = useCallback((code) => {
        setCurrentLanguage(code);
        localStorage.setItem("rti_citizen_language", code);
        applyTranslation(code);
        setIsLangModalOpen(false);

        // If switching from or to another language, trigger translate change
        const combo = document.querySelector(".goog-te-combo");
        if (combo) {
            combo.value = code;
            combo.dispatchEvent(new Event("change"));
        } else {
            // Force reload translation state
            window.location.reload();
        }
    }, [applyTranslation]);

    // Initialize Google Translate Script once on mount
    useEffect(() => {
        // Define global callback
        window.googleTranslateElementInit = () => {
            if (window.google?.translate?.TranslateElement) {
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: "en",
                        includedLanguages: "en,hi,bn,mr,te,ta,gu,kn,ml,pa,or,as,ur",
                        autoDisplay: false,
                        layout: window.google.translate.TranslateElement.InlineLayout?.SIMPLE || 0,
                    },
                    "google_translate_element"
                );

                // Re-apply stored preference
                const saved = localStorage.getItem("rti_citizen_language");
                if (saved && saved !== "en") {
                    setTimeout(() => {
                        const combo = document.querySelector(".goog-te-combo");
                        if (combo) {
                            combo.value = saved;
                            combo.dispatchEvent(new Event("change"));
                        }
                    }, 400);
                }
            }
        };

        // Inject script if not present
        if (!document.getElementById("google-translate-script")) {
            const script = document.createElement("script");
            script.id = "google-translate-script";
            script.type = "text/javascript";
            script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            script.async = true;
            document.body.appendChild(script);
        }

        // Hidden container for Google Translate
        if (!document.getElementById("google_translate_element")) {
            const container = document.createElement("div");
            container.id = "google_translate_element";
            container.style.display = "none";
            document.body.appendChild(container);
        }

        // Active MutationObserver to prevent Google Translate from displacing the header or setting body.top
        const cleanupObserver = new MutationObserver(() => {
            if (document.body && document.body.style.top && document.body.style.top !== "0px") {
                document.body.style.top = "0px";
            }
            if (document.documentElement && document.documentElement.style.top && document.documentElement.style.top !== "0px") {
                document.documentElement.style.top = "0px";
            }
            const banner = document.querySelector(".goog-te-banner-frame");
            if (banner) {
                banner.style.display = "none";
                banner.style.height = "0px";
                banner.style.visibility = "hidden";
            }
        });

        cleanupObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["style", "class"],
            subtree: true,
            childList: true,
        });

        return () => cleanupObserver.disconnect();
    }, []);

    const activeLanguageObj =
        INDIAN_LANGUAGES.find((l) => l.code === currentLanguage) ||
        INDIAN_LANGUAGES[0];

    return (
        <LanguageContext.Provider
            value={{
                currentLanguage,
                activeLanguage: activeLanguageObj,
                languages: INDIAN_LANGUAGES,
                setLanguage,
                isLangModalOpen,
                setIsLangModalOpen,
                openLanguageModal: () => setIsLangModalOpen(true),
                closeLanguageModal: () => setIsLangModalOpen(false),
                isTranslating,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
