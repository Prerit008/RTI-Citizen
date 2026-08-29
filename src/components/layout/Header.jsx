import { useState, useEffect } from "react";
import {
    Accessibility,
    Search,
    Sun,
} from "lucide-react";
import { useAccessibility } from "../../context/AccessibilityContext";
import GlobalSearchModal from "../common/GlobalSearchModal";

export default function Header() {
    const {
        settings,
        decreaseFontSize,
        resetFontSize,
        increaseFontSize,
        toggleHighContrast,
        setIsPanelOpen,
    } = useAccessibility();

    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Global keyboard shortcut Ctrl+K or Cmd+K
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "k") {
                e.preventDefault();
                setIsSearchOpen((p) => !p);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <>
            {/* Skip to Main Content Link for Keyboard / Screen Readers */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-rti-600 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white focus:shadow-lg"
            >
                Skip to main content
            </a>

            {/* Government utility bar */}
            <div className="bg-navy-900 text-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs sm:px-6 lg:px-8">

                    <div className="flex items-center gap-2">
                        <span className="font-medium">
                            Government of India
                        </span>

                        <span className="hidden text-white/40 sm:inline">
                            |
                        </span>

                        <span className="hidden text-white/70 sm:inline">
                            भारत सरकार
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsPanelOpen(true)}
                            className="flex items-center gap-1.5 font-medium transition hover:text-white/80 focus:outline-none focus:ring-1 focus:ring-white/40"
                            aria-label="Open accessibility settings panel"
                        >
                            <Accessibility size={14} />
                            Accessibility
                        </button>

                        <button
                            onClick={toggleHighContrast}
                            className={`flex items-center gap-1 transition hover:text-white/80 ${
                                settings.highContrast ? "text-amber-400 font-bold" : ""
                            }`}
                            aria-label="Toggle High Contrast"
                            title="Toggle High Contrast Mode"
                        >
                            <Sun size={14} />
                            <span className="hidden sm:inline">
                                {settings.highContrast ? "Standard" : "Contrast"}
                            </span>
                        </button>

                        <button className="hover:text-white/80">
                            हिन्दी
                        </button>
                    </div>

                </div>
            </div>

            {/* Main header */}
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">

                    {/* Logo */}
                    <div className="flex items-center gap-4">

                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-50">
                            <span className="text-2xl" role="img" aria-label="Flag of India">
                                🇮🇳
                            </span>
                        </div>

                        <div>
                            <div className="text-xl font-bold tracking-tight text-navy-900">
                                RTI ONLINE
                            </div>

                            <div className="text-xs text-slate-500 sm:text-sm">
                                Right to Information · Government of India
                            </div>
                        </div>

                    </div>

                    {/* Desktop utilities */}
                    <div className="hidden items-center gap-2 md:flex">

                        {/* A- Decrease */}
                        <button
                            onClick={decreaseFontSize}
                            className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${
                                settings.fontSize === "small"
                                    ? "border-rti-600 bg-rti-50 font-bold text-rti-700 shadow-sm"
                                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                            }`}
                            title="Decrease text size (A−)"
                            aria-label="Decrease text size"
                        >
                            A−
                        </button>

                        {/* A Normal */}
                        <button
                            onClick={resetFontSize}
                            className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${
                                settings.fontSize === "normal"
                                    ? "border-rti-600 bg-rti-50 font-bold text-rti-700 shadow-sm"
                                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                            }`}
                            title="Reset text size to default (A)"
                            aria-label="Default text size"
                        >
                            A
                        </button>

                        {/* A+ Increase */}
                        <button
                            onClick={increaseFontSize}
                            className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${
                                settings.fontSize === "large" || settings.fontSize === "xlarge"
                                    ? "border-rti-600 bg-rti-50 font-bold text-rti-700 shadow-sm"
                                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                            }`}
                            title="Increase text size (A+)"
                            aria-label="Increase text size"
                        >
                            A+
                        </button>

                        {/* Search button */}
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="ml-2 flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:border-rti-300 hover:bg-slate-50"
                            title="Search RTI Portal (Ctrl+K)"
                            aria-label="Search RTI Portal"
                        >
                            <Search size={17} className="text-rti-600" />
                            <span className="hidden lg:inline text-xs text-slate-400">Search...</span>
                            <kbd className="hidden lg:inline-block rounded border bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500">Ctrl+K</kbd>
                        </button>

                    </div>

                </div>
            </header>

            {/* Global Search Dialog */}
            <GlobalSearchModal
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
            />
        </>
    );
}