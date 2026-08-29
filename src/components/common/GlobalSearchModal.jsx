import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
    Search,
    X,
    Building2,
    FileText,
    HelpCircle,
    ArrowRight,
    Sparkles,
    UserCheck,
    Compass,
} from "lucide-react";
import { authorities } from "../../data/authorities";
import { useSearch } from "../../context/SearchContext";

const QUICK_LINKS = [
    { title: "File New RTI Application", desc: "Submit a fresh RTI request to any central ministry", path: "/file-rti", icon: FileText, tag: "Service" },
    { title: "Track RTI Application Status", desc: "Check status using your registration number", path: "/track", icon: Compass, tag: "Service" },
    { title: "File First Appeal", desc: "Appeal if response is delayed, incomplete, or rejected", path: "/first-appeal", icon: ArrowRight, tag: "Service" },
    { title: "Public Authorities Directory", desc: "Browse all ministries and public department lists", path: "/authorities", icon: Building2, tag: "Directory" },
    { title: "RTI FAQs & Help", desc: "Fee rules, BPL exemptions, response timeline (30 days)", path: "/faq", icon: HelpCircle, tag: "Help" },
    { title: "Citizen Login & Account", desc: "Access your dashboard and application history", path: "/login", icon: UserCheck, tag: "Account" },
];

const FAQ_ITEMS = [
    { title: "What is the fee for filing an RTI?", path: "/faq", desc: "Standard fee is ₹10. BPL card holders are exempt from fee." },
    { title: "What is the response time for an RTI?", path: "/faq", desc: "30 days normally, or 48 hours if life and liberty are concerned." },
    { title: "How to file a First Appeal?", path: "/first-appeal", desc: "File within 30 days if no response received or info rejected." },
];

export default function GlobalSearchModal({ isOpen: propIsOpen, onClose: propOnClose }) {
    const searchCtx = useSearch();
    const isOpen = propIsOpen !== undefined ? propIsOpen : searchCtx.isSearchOpen;
    const onClose = propOnClose || searchCtx.closeSearch;
    const query = searchCtx.searchQuery;
    const setQuery = searchCtx.setSearchQuery;

    const inputRef = useRef(null);
    const navigate = useNavigate();

    // Focus input on open
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.focus();
                    inputRef.current.select();
                }
            }, 50);
        }
    }, [isOpen]);

    // Keyboard ESC listener
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const q = query.trim().toLowerCase();

    // Filter Quick Links
    const matchedLinks = QUICK_LINKS.filter(
        (item) =>
            item.title.toLowerCase().includes(q) ||
            item.desc.toLowerCase().includes(q) ||
            item.tag.toLowerCase().includes(q)
    );

    // Filter Authorities
    const matchedAuthorities = authorities.filter(
        (auth) =>
            auth.name.toLowerCase().includes(q) ||
            auth.shortName.toLowerCase().includes(q) ||
            auth.category.toLowerCase().includes(q) ||
            auth.keywords.some((k) => k.toLowerCase().includes(q))
    );

    // Filter FAQs
    const matchedFaqs = FAQ_ITEMS.filter(
        (faq) =>
            faq.title.toLowerCase().includes(q) ||
            faq.desc.toLowerCase().includes(q)
    );

    const hasResults =
        matchedLinks.length > 0 ||
        matchedAuthorities.length > 0 ||
        matchedFaqs.length > 0;

    const handleSelect = (path) => {
        onClose();
        navigate(path);
    };

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-16 px-4 backdrop-blur-sm animate-fadeIn cursor-pointer"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl transition-all cursor-default"
            >

                {/* Search Input Header */}
                <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4 bg-slate-50/50">
                    <Search size={22} className="shrink-0 text-rti-600" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search services, ministries, FAQs, or topics (e.g. railways, fee, track)..."
                        className="w-full bg-transparent text-base text-navy-900 placeholder-slate-400 focus:outline-none"
                    />
                    {query && (
                        <button
                            onClick={() => setQuery("")}
                            className="rounded-lg p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600"
                        >
                            <X size={16} />
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className="rounded-xl border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500 hover:bg-slate-100"
                    >
                        ESC
                    </button>
                </div>

                {/* Search Results Area */}
                <div className="max-h-[65vh] overflow-y-auto p-5 space-y-6">

                    {/* Default state when empty */}
                    {!q && (
                        <div>
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                                <Sparkles size={14} className="text-rti-600" /> Quick Access Services
                            </div>
                            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                                {QUICK_LINKS.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <button
                                            key={item.title}
                                            onClick={() => handleSelect(item.path)}
                                            className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-left transition hover:border-rti-200 hover:bg-rti-50/40 hover:shadow-sm"
                                        >
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-rti-600 shadow-xs border border-slate-100">
                                                <Icon size={18} />
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-navy-900">
                                                    {item.title}
                                                </div>
                                                <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                                    {item.desc}
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Query Active & Has Results */}
                    {q && hasResults && (
                        <>
                            {/* Quick Links Results */}
                            {matchedLinks.length > 0 && (
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                                        Services &amp; Pages ({matchedLinks.length})
                                    </div>
                                    <div className="space-y-1.5">
                                        {matchedLinks.map((item) => {
                                            const Icon = item.icon;
                                            return (
                                                <button
                                                    key={item.title}
                                                    onClick={() => handleSelect(item.path)}
                                                    className="flex w-full items-center justify-between rounded-xl p-3 text-left hover:bg-slate-100 transition"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rti-50 text-rti-600">
                                                            <Icon size={16} />
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-semibold text-navy-900">
                                                                {item.title}
                                                            </div>
                                                            <div className="text-xs text-slate-500">
                                                                {item.desc}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <ArrowRight size={16} className="text-slate-400" />
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Public Authorities Results */}
                            {matchedAuthorities.length > 0 && (
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                                        Public Authorities &amp; Ministries ({matchedAuthorities.length})
                                    </div>
                                    <div className="space-y-1.5">
                                        {matchedAuthorities.map((auth) => (
                                            <button
                                                key={auth.id}
                                                onClick={() => handleSelect(`/authorities/${auth.id}`)}
                                                className="flex w-full items-center justify-between rounded-xl p-3 text-left hover:bg-slate-100 transition"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-700 font-bold text-xs">
                                                        {auth.shortName.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-semibold text-navy-900">
                                                            {auth.name}
                                                        </div>
                                                        <div className="text-xs text-slate-500 line-clamp-1">
                                                            {auth.description}
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600">
                                                    {auth.category}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* FAQ Results */}
                            {matchedFaqs.length > 0 && (
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                                        Frequently Asked Questions ({matchedFaqs.length})
                                    </div>
                                    <div className="space-y-1.5">
                                        {matchedFaqs.map((faq, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleSelect(faq.path)}
                                                className="flex w-full items-start justify-between rounded-xl p-3 text-left hover:bg-slate-100 transition"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <HelpCircle size={18} className="mt-0.5 text-rti-600 shrink-0" />
                                                    <div>
                                                        <div className="text-sm font-semibold text-navy-900">
                                                            {faq.title}
                                                        </div>
                                                        <div className="text-xs text-slate-500">
                                                            {faq.desc}
                                                        </div>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {/* No Results */}
                    {q && !hasResults && (
                        <div className="py-12 text-center">
                            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                                <Search size={22} />
                            </div>
                            <h3 className="text-sm font-bold text-navy-900">
                                No matching results found for &ldquo;{query}&rdquo;
                            </h3>
                            <p className="mt-1 text-xs text-slate-500">
                                Try searching for terms like &ldquo;Railways&rdquo;, &ldquo;Track&rdquo;, &ldquo;Fee&rdquo;, or &ldquo;Appeal&rdquo;.
                            </p>
                        </div>
                    )}

                </div>

                {/* Footer hints */}
                <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-5 py-2.5 text-xs text-slate-500">
                    <span>Press <kbd className="rounded border bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-700 shadow-xs">ESC</kbd> to close</span>
                    <span>RTI Online Portal Search</span>
                </div>

            </div>
        </div>
    );
}
