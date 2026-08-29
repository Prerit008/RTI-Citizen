import { useState, useMemo } from "react";
import {
    Languages,
    X,
    Check,
    Search,
    Sparkles,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function LanguageSelectorModal() {
    const {
        languages,
        currentLanguage,
        setLanguage,
        isLangModalOpen,
        closeLanguageModal,
        isTranslating,
    } = useLanguage();

    const [search, setSearch] = useState("");

    const filteredLanguages = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return languages;
        return languages.filter(
            (lang) =>
                lang.name.toLowerCase().includes(q) ||
                lang.nativeName.toLowerCase().includes(q) ||
                lang.region.toLowerCase().includes(q) ||
                lang.code.toLowerCase().includes(q)
        );
    }, [languages, search]);

    if (!isLangModalOpen) return null;

    return (
        <div
            onClick={closeLanguageModal}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fadeIn cursor-pointer"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl transition-all cursor-default"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 bg-gradient-to-r from-slate-50 to-white">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rti-50 text-rti-600">
                            <Languages size={22} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-navy-900">
                                Select Portal Language / भाषा चुनें
                            </h2>
                            <p className="text-xs text-slate-500">
                                Instant auto-translation available across 12+ Indian official languages
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={closeLanguageModal}
                        className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                        aria-label="Close language selector"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Search Box */}
                <div className="border-b border-slate-100 px-6 py-3 bg-slate-50/50">
                    <div className="relative">
                        <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search language or state (e.g. Hindi, Tamil, Maharashtra, বাংলা)..."
                            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-xs sm:text-sm text-navy-900 outline-none focus:border-rti-500 focus:ring-2 focus:ring-rti-50"
                            autoFocus
                        />
                    </div>
                </div>

                {/* Language Grid */}
                <div className="max-h-[60vh] overflow-y-auto p-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                    {filteredLanguages.map((lang) => {
                        const isSelected = currentLanguage === lang.code;
                        return (
                            <button
                                key={lang.code}
                                type="button"
                                onClick={() => setLanguage(lang.code)}
                                disabled={isTranslating}
                                className={`flex flex-col text-left p-4 rounded-2xl border transition relative ${
                                    isSelected
                                        ? "border-rti-600 bg-rti-50/70 shadow-xs ring-2 ring-rti-600/20"
                                        : "border-slate-200 bg-white hover:border-rti-200 hover:bg-slate-50/60"
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-base font-bold text-navy-900 font-sans">
                                        {lang.nativeName}
                                    </span>
                                    {isSelected && (
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rti-600 text-white">
                                            <Check size={14} strokeWidth={3} />
                                        </span>
                                    )}
                                </div>

                                <span className="text-xs font-medium text-slate-600 mt-0.5">
                                    {lang.name}
                                </span>

                                <span className="text-[11px] text-slate-400 mt-2 line-clamp-1">
                                    {lang.region}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Footer Info */}
                <div className="border-t border-slate-100 bg-slate-50 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                        <Sparkles size={15} className="text-amber-500 shrink-0" />
                        <span>Dynamically translates all pages, buttons, and statutory notices.</span>
                    </div>

                    <button
                        type="button"
                        onClick={() => setLanguage("en")}
                        className="font-semibold text-rti-600 hover:underline shrink-0 text-left"
                    >
                        Reset to English
                    </button>
                </div>
            </div>
        </div>
    );
}
