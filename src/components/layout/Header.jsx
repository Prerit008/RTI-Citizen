import {
    Accessibility,
    Search,
    Sun,
    Moon,
    Languages,
} from "lucide-react";
import { useAccessibility } from "../../context/AccessibilityContext";
import { useSearch } from "../../context/SearchContext";
import { useLanguage } from "../../context/LanguageContext";
import GlobalSearchModal from "../common/GlobalSearchModal";

export default function Header() {
    const {
        settings,
        decreaseFontSize,
        resetFontSize,
        increaseFontSize,
        toggleDarkMode,
        setIsPanelOpen,
    } = useAccessibility();

    const { openSearch } = useSearch();
    const { activeLanguage, openLanguageModal } = useLanguage();

    return (
        <>
            {/* Skip to Main Content Link for Keyboard / Screen Readers */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-rti-600 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white focus:shadow-lg"
            >
                Skip to main content
            </a>

            {/* Competition / Demo Disclaimer Banner */}
            <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white text-[11px] sm:text-xs py-1.5 px-4 font-medium shadow-inner">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <span className="rounded bg-black/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-100 border border-white/20">
                            Competition Prototype
                        </span>
                        <span className="font-semibold text-white">
                            ⚠️ DEMONSTRATION PORTAL: This website is a prototype created for competition / hackathon demonstration purposes. It is not an official Government of India portal.
                        </span>
                    </div>
                    <span className="hidden md:inline-block text-[11px] text-amber-100/90 font-mono">
                        Do not file real-world sensitive legal claims
                    </span>
                </div>
            </div>

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
                            onClick={toggleDarkMode}
                            className={`flex items-center gap-1.5 font-medium transition hover:text-white/80 rounded px-2 py-0.5 border border-white/20 hover:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40 ${
                                settings.darkMode ? "text-amber-300 font-bold bg-white/10" : ""
                            }`}
                            aria-label="Toggle Dark Mode"
                            title={settings.darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        >
                            {settings.darkMode ? (
                                <Sun size={14} className="text-amber-300" />
                            ) : (
                                <Moon size={14} className="text-slate-300" />
                            )}
                            <span className="hidden sm:inline">
                                {settings.darkMode ? "Light Mode" : "Dark Mode"}
                            </span>
                        </button>

                        <button
                            onClick={openLanguageModal}
                            className="flex items-center gap-1.5 font-medium transition hover:text-white/80 rounded px-1.5 py-0.5 border border-white/20 hover:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
                            aria-label="Change Indian Regional Language"
                            title="Select Indian Language"
                        >
                            <Languages size={14} className="text-amber-300" />
                            <span>{activeLanguage.nativeName}</span>
                            <span className="text-[10px] text-white/60 hidden sm:inline">({activeLanguage.name})</span>
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
                            className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${settings.fontSize === "small"
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
                            className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${settings.fontSize === "normal"
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
                            className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${settings.fontSize === "large" || settings.fontSize === "xlarge"
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
                            onClick={() => openSearch("")}
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
            <GlobalSearchModal />
        </>
    );
}