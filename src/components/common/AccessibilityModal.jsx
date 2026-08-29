import {
    Accessibility,
    X,
    RotateCcw,
    Eye,
    Sun,
    Type,
    Underline,
    Volume2,
    Check,
} from "lucide-react";
import { useAccessibility } from "../../context/AccessibilityContext";

export default function AccessibilityModal() {
    const {
        settings,
        setFontSize,
        toggleHighContrast,
        toggleGrayscale,
        toggleReadableFont,
        toggleUnderlineLinks,
        resetAll,
        isPanelOpen,
        setIsPanelOpen,
    } = useAccessibility();

    if (!isPanelOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-fadeIn">
            <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl transition-all">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rti-50 text-rti-600">
                            <Accessibility size={22} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-navy-900">
                                Accessibility Options
                            </h2>
                            <p className="text-xs text-slate-500">
                                Customize reading and display preferences
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsPanelOpen(false)}
                        className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                        aria-label="Close accessibility options"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Content Options */}
                <div className="mt-5 space-y-6">

                    {/* 1. Text Sizing */}
                    <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Text Size
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                            {[
                                { key: "small", label: "A−", sub: "90%" },
                                { key: "normal", label: "A", sub: "100%" },
                                { key: "large", label: "A+", sub: "112%" },
                                { key: "xlarge", label: "A++", sub: "125%" },
                            ].map((item) => (
                                <button
                                    key={item.key}
                                    onClick={() => setFontSize(item.key)}
                                    className={`flex flex-col items-center justify-center rounded-xl border py-2.5 transition ${
                                        settings.fontSize === item.key
                                            ? "border-rti-600 bg-rti-50 font-bold text-rti-700 shadow-sm"
                                            : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                                    }`}
                                >
                                    <span className="text-base font-semibold">{item.label}</span>
                                    <span className="text-[10px] text-slate-500">{item.sub}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 2. Display & Contrast Toggles */}
                    <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Display &amp; Visual Modes
                        </label>

                        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">

                            {/* High Contrast */}
                            <button
                                onClick={toggleHighContrast}
                                className={`flex items-center justify-between rounded-xl border px-3.5 py-3 transition ${
                                    settings.highContrast
                                        ? "border-rti-600 bg-rti-50 text-rti-700 font-medium"
                                        : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                                }`}
                            >
                                <div className="flex items-center gap-2.5 text-xs">
                                    <Sun size={16} />
                                    <span>High Contrast</span>
                                </div>
                                {settings.highContrast && <Check size={14} className="text-rti-600" />}
                            </button>

                            {/* Grayscale */}
                            <button
                                onClick={toggleGrayscale}
                                className={`flex items-center justify-between rounded-xl border px-3.5 py-3 transition ${
                                    settings.grayscale
                                        ? "border-rti-600 bg-rti-50 text-rti-700 font-medium"
                                        : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                                }`}
                            >
                                <div className="flex items-center gap-2.5 text-xs">
                                    <Eye size={16} />
                                    <span>Monochrome</span>
                                </div>
                                {settings.grayscale && <Check size={14} className="text-rti-600" />}
                            </button>

                            {/* Readable Font */}
                            <button
                                onClick={toggleReadableFont}
                                className={`flex items-center justify-between rounded-xl border px-3.5 py-3 transition ${
                                    settings.readableFont
                                        ? "border-rti-600 bg-rti-50 text-rti-700 font-medium"
                                        : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                                }`}
                            >
                                <div className="flex items-center gap-2.5 text-xs">
                                    <Type size={16} />
                                    <span>Readable Font</span>
                                </div>
                                {settings.readableFont && <Check size={14} className="text-rti-600" />}
                            </button>

                            {/* Underline Links */}
                            <button
                                onClick={toggleUnderlineLinks}
                                className={`flex items-center justify-between rounded-xl border px-3.5 py-3 transition ${
                                    settings.underlineLinks
                                        ? "border-rti-600 bg-rti-50 text-rti-700 font-medium"
                                        : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                                }`}
                            >
                                <div className="flex items-center gap-2.5 text-xs">
                                    <Underline size={16} />
                                    <span>Highlight Links</span>
                                </div>
                                {settings.underlineLinks && <Check size={14} className="text-rti-600" />}
                            </button>

                        </div>
                    </div>

                    {/* 3. Screen reader note */}
                    <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-3 text-xs text-blue-800">
                        <div className="flex items-center gap-2 font-semibold">
                            <Volume2 size={14} /> Screen Reader Ready
                        </div>
                        <p className="mt-1 text-[11px] text-blue-700">
                            This site follows WCAG 2.1 Level AA guidelines and supports native NVDA, JAWS, and VoiceOver screen readers.
                        </p>
                    </div>

                </div>

                {/* Footer Controls */}
                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                    <button
                        onClick={resetAll}
                        className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800"
                    >
                        <RotateCcw size={14} />
                        Reset All Settings
                    </button>

                    <button
                        onClick={() => setIsPanelOpen(false)}
                        className="rounded-xl bg-navy-900 px-5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-navy-800"
                    >
                        Apply &amp; Close
                    </button>
                </div>

            </div>
        </div>
    );
}
