import { useState } from "react";
import {
    ArrowRight,
    CheckCircle2,
    ChevronRight,
    Clock3,
    FileText,
    HelpCircle,
    Landmark,
    Search,
    ShieldCheck,
    Scale,
    Sparkles,
    TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
const quickActions = [
    {
        icon: FileText,
        title: "File an RTI",
        description:
            "Submit a new RTI application to a Central Government public authority.",
        action: "Start application",
        href: "/file-rti",
        featured: true,
    },
    {
        icon: TrendingUp,
        title: "Track my RTI",
        description:
            "Check the current status of your application or first appeal.",
        action: "Track application",
        href: "/track",
    },
    {
        icon: Scale,
        title: "First Appeal",
        description:
            "File a first appeal if you did not receive a response or need to challenge it.",
        action: "File an appeal",
        href: "/first-appeal",
    },
    {
        icon: Clock3,
        title: "RTI History",
        description:
            "View your previous applications, responses and appeals in one place.",
        action: "View history",
        href: "/dashboard",
    },
];

const steps = [
    {
        number: "01",
        title: "Choose authority",
        description:
            "Find the Central Government public authority that holds the information.",
    },
    {
        number: "02",
        title: "Write your request",
        description:
            "Clearly describe the information you are seeking.",
    },
    {
        number: "03",
        title: "Submit online",
        description:
            "Review your application, pay the applicable fee and submit.",
    },
    {
        number: "04",
        title: "Receive response",
        description:
            "Track your application and receive the response online.",
    },
];

const updates = [
    {
        type: "Important",
        title: "Use the correct RTI portal",
        description:
            "This portal is intended for RTI applications concerning Central Government public authorities.",
        date: "27 Aug 2026",
    },
    {
        type: "Guide",
        title: "New citizen guide available",
        description:
            "Learn how to identify the right public authority and write a clear information request.",
        date: "22 Aug 2026",
    },
    {
        type: "Service",
        title: "First Appeal support",
        description:
            "Eligible applicants can use the portal to submit and track their First Appeal.",
        date: "18 Aug 2026",
    },
];

export default function Home() {
    const { openSearch } = useSearch();
    const [localQuery, setLocalQuery] = useState("");

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        openSearch(localQuery);
    };

    return (
        <div>
            {/* =========================================================
          HERO
      ========================================================== */}
            <section className="relative overflow-hidden bg-white">
                {/* Decorative background */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-rti-50 blur-3xl" />
                    <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-slate-100 blur-3xl" />
                </div>

                <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:px-8 lg:pb-24 lg:pt-24">

                    {/* Small trust label */}
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm">
                        <span className="h-2 w-2 rounded-full bg-green-600" />
                        Government of India · RTI Online
                    </div>

                    <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">

                        {/* Hero copy */}
                        <div>

                            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight text-navy-900 sm:text-5xl lg:text-6xl">
                                Your right to know.
                                <span className="mt-2 block text-rti-600">
                                    Your right to ask.
                                </span>
                            </h1>

                            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                                File an RTI application with Central Government public
                                authorities, track its progress and manage your appeals —
                                all in one place.
                            </p>

                            {/* Hero CTAs */}
                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                                <Link
                                    to="/file-rti"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-rti-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-rti-600/20 transition hover:bg-rti-700"
                                >
                                    <FileText size={18} />
                                    File an RTI
                                    <ArrowRight size={17} />
                                </Link>

                                <Link
                                    to="/track"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-navy-900 transition hover:border-slate-400 hover:bg-slate-50"
                                >
                                    Track my application
                                </Link>

                            </div>

                            {/* Trust points */}
                            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">

                                <div className="flex items-center gap-2">
                                    <CheckCircle2 size={16} className="text-green-600" />
                                    Online submission
                                </div>

                                <div className="flex items-center gap-2">
                                    <ShieldCheck size={16} className="text-green-600" />
                                    Secure payment
                                </div>

                                <div className="flex items-center gap-2">
                                    <Clock3 size={16} className="text-green-600" />
                                    Track anytime
                                </div>

                            </div>

                        </div>

                        {/* Hero authority search card */}
                        <div className="lg:pl-8">

                            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">

                                <div className="flex items-center justify-between">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rti-50 text-rti-600">
                                        <Landmark size={24} />
                                    </div>

                                </div>

                                <h2 className="mt-5 text-xl font-semibold text-navy-900">
                                    Find the right public authority
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    Search across all Central ministries, departments, public authorities, services, and RTI FAQs.
                                </p>

                                <form onSubmit={handleSearchSubmit} className="mt-6">

                                    <label
                                        htmlFor="authority-search"
                                        className="mb-2 block text-sm font-medium text-slate-700"
                                    >
                                        Search authority or service
                                    </label>

                                    <div className="flex rounded-xl border border-slate-300 bg-white p-1.5 shadow-sm focus-within:border-rti-500 focus-within:ring-2 focus-within:ring-rti-100">

                                        <div className="flex flex-1 items-center">
                                            <Search
                                                size={18}
                                                className="ml-3 text-slate-400"
                                            />

                                            <input
                                                id="authority-search"
                                                type="text"
                                                value={localQuery}
                                                onChange={(e) => setLocalQuery(e.target.value)}
                                                onClick={() => {
                                                    if (!localQuery) openSearch("");
                                                }}
                                                placeholder="e.g. Railways, Education...."
                                                className="w-full border-0 bg-transparent px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="rounded-lg bg-navy-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy-800"
                                        >
                                            Search
                                        </button>

                                    </div>

                                </form>

                                {/* Popular Search Chips */}
                                <div className="mt-4 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                                    <span className="text-slate-400">Popular:</span>
                                    {["Railways", "Health", "Scholarship", "Environment"].map((tag) => (
                                        <button
                                            key={tag}
                                            type="button"
                                            onClick={() => openSearch(tag)}
                                            className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-rti-50 hover:text-rti-700 transition"
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-6 border-t border-slate-100 pt-5">

                                    <Link
                                        to="/authorities"
                                        className="group flex items-center justify-between text-sm font-medium text-rti-600"
                                    >
                                        <span>Browse all public authorities</span>

                                        <ArrowRight
                                            size={16}
                                            className="transition group-hover:translate-x-1"
                                        />
                                    </Link>

                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
          QUICK ACTIONS
      ========================================================== */}
            <section className="border-y border-slate-200 bg-slate-50">
                <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

                    <div className="mb-8">

                        <p className="text-sm font-semibold uppercase tracking-wider text-rti-600">
                            Citizen services
                        </p>

                        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-navy-900 sm:text-3xl">
                            What would you like to do?
                        </h2>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                            Start with the action you need. We’ll guide you through the
                            process.
                        </p>

                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                        {quickActions.map((item) => {
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.title}
                                    to={item.href}
                                    className={`group rounded-2xl border p-6 transition ${item.featured
                                        ? "border-rti-200 bg-white shadow-soft hover:-translate-y-0.5 hover:shadow-card"
                                        : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-soft"
                                        }`}
                                >

                                    <div
                                        className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.featured
                                            ? "bg-rti-50 text-rti-600"
                                            : "bg-slate-100 text-navy-700"
                                            }`}
                                    >
                                        <Icon size={21} />
                                    </div>

                                    <h3 className="mt-5 font-semibold text-navy-900">
                                        {item.title}
                                    </h3>

                                    <p className="mt-2 min-h-[72px] text-sm leading-6 text-slate-500">
                                        {item.description}
                                    </p>

                                    <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-rti-600">
                                        {item.action}

                                        <ArrowRight
                                            size={15}
                                            className="transition group-hover:translate-x-1"
                                        />
                                    </div>

                                </Link>
                            );
                        })}

                    </div>
                </div>
            </section>

            {/* =========================================================
          HOW RTI WORKS
      ========================================================== */}
            <section className="bg-white">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">

                    <div className="max-w-2xl">

                        <p className="text-sm font-semibold uppercase tracking-wider text-rti-600">
                            Simple process
                        </p>

                        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-navy-900">
                            How RTI works
                        </h2>

                        <p className="mt-3 text-base leading-7 text-slate-500">
                            From choosing the right authority to receiving a response,
                            the online process is designed to keep you informed.
                        </p>

                    </div>

                    <div className="mt-12 grid gap-8 md:grid-cols-4">

                        {steps.map((step, index) => (
                            <div
                                key={step.number}
                                className="relative"
                            >

                                {/* Connector */}
                                {index < steps.length - 1 && (
                                    <div className="absolute left-12 top-6 hidden h-px w-[calc(100%-3rem)] bg-slate-200 md:block" />
                                )}

                                <div className="relative">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-900 text-sm font-bold text-white">
                                        {step.number}
                                    </div>

                                    <h3 className="mt-5 font-semibold text-navy-900">
                                        {step.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-500">
                                        {step.description}
                                    </p>

                                </div>

                            </div>
                        ))}

                    </div>

                    <div className="mt-10">
                        <Link
                            to="/learn"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-rti-600 hover:text-rti-700"
                        >
                            Learn more about the RTI process
                            <ArrowRight size={16} />
                        </Link>
                    </div>

                </div>
            </section>

            {/* =========================================================
          BEFORE YOU FILE
      ========================================================== */}
            <section className="bg-navy-900">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">

                    <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">

                        <div>

                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                                <Sparkles size={22} />
                            </div>

                            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white">
                                Before you file
                            </h2>

                            <p className="mt-4 max-w-lg text-base leading-7 text-white/60">
                                A few simple checks can help you send your request to the
                                right place and get useful information faster.
                            </p>

                            <Link
                                to="/learn"
                                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-navy-900 transition hover:bg-slate-100"
                            >
                                Explore RTI guidance
                                <ArrowRight size={16} />
                            </Link>

                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">

                            {[
                                {
                                    title: "Is RTI right for your question?",
                                    text: "RTI is designed to help citizens access information held by public authorities.",
                                },
                                {
                                    title: "Choose the right authority",
                                    text: "Sending your application to the authority that holds the information helps avoid unnecessary transfers.",
                                },
                                {
                                    title: "Ask for information",
                                    text: "Keep your request clear and focused on information or records you want to access.",
                                },
                                {
                                    title: "Central or State?",
                                    text: "This portal is for Central Government public authorities. State matters use the relevant State RTI system.",
                                },
                            ].map((item) => (
                                <div
                                    key={item.title}
                                    className="rounded-2xl border border-white/10 bg-white/[0.05] p-5"
                                >

                                    <CheckCircle2
                                        size={19}
                                        className="text-green-400"
                                    />

                                    <h3 className="mt-4 text-sm font-semibold text-white">
                                        {item.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-white/55">
                                        {item.text}
                                    </p>

                                </div>
                            ))}

                        </div>

                    </div>

                </div>
            </section>

            {/* =========================================================
          LATEST UPDATES
      ========================================================== */}
            <section className="bg-slate-50">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">

                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

                        <div>

                            <p className="text-sm font-semibold uppercase tracking-wider text-rti-600">
                                Stay informed
                            </p>

                            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-navy-900">
                                Latest updates
                            </h2>

                        </div>

                        <Link
                            to="/learn"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-rti-600"
                        >
                            View all updates
                            <ArrowRight size={16} />
                        </Link>

                    </div>

                    <div className="mt-8 grid gap-4 lg:grid-cols-3">

                        {updates.map((update) => (
                            <article
                                key={update.title}
                                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                            >

                                <div className="flex items-center justify-between gap-4">

                                    <span className="rounded-full bg-rti-50 px-3 py-1 text-xs font-semibold text-rti-700">
                                        {update.type}
                                    </span>

                                    <span className="text-xs text-slate-400">
                                        {update.date}
                                    </span>

                                </div>

                                <h3 className="mt-5 font-semibold text-navy-900">
                                    {update.title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    {update.description}
                                </p>

                                <Link
                                    to="/learn"
                                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-rti-600 hover:text-rti-700"
                                >
                                    Read more
                                    <ChevronRight size={15} />
                                </Link>

                            </article>
                        ))}

                    </div>

                </div>
            </section>

            {/* =========================================================
          HELP
      ========================================================== */}
            <section className="bg-white">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-10 lg:p-12">

                        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">

                            <div className="flex gap-5">

                                <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-rti-600 shadow-sm sm:flex">
                                    <HelpCircle size={23} />
                                </div>

                                <div>

                                    <p className="text-sm font-semibold text-rti-600">
                                        Need help?
                                    </p>

                                    <h2 className="mt-1 text-2xl font-semibold text-navy-900">
                                        We're here to help you navigate RTI.
                                    </h2>

                                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                                        Find answers to common questions, read the user guide,
                                        or contact the RTI Online helpdesk.
                                    </p>

                                </div>

                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">

                                <Link
                                    to="/faq"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy-900 px-5 py-3 text-sm font-semibold text-white hover:bg-navy-800"
                                >
                                    Visit Help Centre
                                    <ArrowRight size={16} />
                                </Link>

                                <Link
                                    to="/faq"
                                    className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-navy-900 hover:bg-slate-50"
                                >
                                    Browse FAQs
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>
            </section>
        </div>
    );
}