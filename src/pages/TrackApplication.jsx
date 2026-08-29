import { useEffect, useState } from "react";
import {
    ArrowRight,
    CheckCircle2,
    FileText,
    Info,
    Landmark,
    Search,
    ShieldCheck,
    Clock,
    Calendar,
    FileDown,
    Download,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import RTITimeline from "../components/rti/RTITimeline";
import { applicationApi } from "../services/api";
import { mockApplications } from "../data/mockApplications";
import { downloadAcknowledgmentPDF, downloadOfficialResponsePDF } from "../utils/pdfGenerator";

export default function TrackApplication() {
    const [searchParams] = useSearchParams();
    const registrationFromUrl = searchParams.get("registration");

    const [registrationNumber, setRegistrationNumber] = useState("");
    const [application, setApplication] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchApplication = async (regNum) => {
        const key = regNum.trim().toUpperCase();
        setLoading(true);
        setError("");

        try {
            // First call the Express backend API
            const res = await applicationApi.track(key);
            if (res?.data?.application) {
                setApplication(res.data.application);
                setLoading(false);
                return;
            }
        } catch (err) {
            console.warn("Backend fetch failed, checking local store fallback:", err.message);
        }

        // Fallback: check local storage and static mock
        try {
            const saved = JSON.parse(localStorage.getItem("submitted_rtis") || "{}");
            if (saved[key]) {
                setApplication(saved[key]);
                setLoading(false);
                return;
            }
        } catch (e) {}

        if (mockApplications[key]) {
            setApplication(mockApplications[key]);
            setLoading(false);
            return;
        }

        setError("We couldn't find an application with that registration number. Please verify and try again.");
        setApplication(null);
        setLoading(false);
    };

    const handleTrack = (event) => {
        event.preventDefault();
        const value = registrationNumber.trim().toUpperCase();

        if (!value) {
            setError("Please enter your registration number.");
            setApplication(null);
            return;
        }

        fetchApplication(value);
    };

    const handleUseDemoNumber = (num = "RTI/2026/123456") => {
        setRegistrationNumber(num);
        fetchApplication(num);
    };

    useEffect(() => {
        if (registrationFromUrl) {
            setRegistrationNumber(registrationFromUrl);
            fetchApplication(registrationFromUrl);
        }
    }, [registrationFromUrl]);

    const authorityDisplayName =
        application?.authorityName ||
        application?.authority ||
        "Public Authority";

    const isResponseReady =
        application?.statusType === "response" ||
        application?.status === "Response Ready";

    return (
        <div className="min-h-[calc(100vh-180px)] bg-slate-50">
            {/* Hero */}
            <section className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                    <div className="max-w-2xl">
                        <span className="inline-flex items-center gap-2 rounded-full bg-rti-50 px-3 py-1.5 text-xs font-semibold text-rti-700">
                            <Search size={14} />
                            Application tracking &amp; SLA Engine
                        </span>

                        <h1 className="mt-5 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
                            Track your RTI application
                        </h1>

                        <p className="mt-4 text-base leading-7 text-slate-500">
                            Enter your registration number to see the latest status, statutory SLA countdown, and download official documents.
                        </p>
                    </div>

                    {/* Search card */}
                    <form
                        onSubmit={handleTrack}
                        className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-soft sm:p-7"
                    >
                        <label
                            htmlFor="registration"
                            className="text-sm font-semibold text-navy-900"
                        >
                            Registration number
                        </label>

                        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                            <div className="relative flex-1">
                                <Search
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="registration"
                                    value={registrationNumber}
                                    onChange={(event) =>
                                        setRegistrationNumber(event.target.value)
                                    }
                                    placeholder="e.g. RTI/2026/123456"
                                    className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 font-mono text-sm text-navy-900 outline-none transition placeholder:font-sans placeholder:text-slate-400 focus:border-rti-500 focus:ring-4 focus:ring-rti-50"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-rti-600 px-6 text-sm font-semibold text-white shadow-lg shadow-rti-600/20 transition hover:bg-rti-700 disabled:opacity-70"
                            >
                                {loading ? "Checking..." : "Track application"}
                                <ArrowRight size={17} />
                            </button>
                        </div>

                        {error && (
                            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                {error}
                            </div>
                        )}

                        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                            <span>Quick test demo numbers:</span>
                            <button
                                type="button"
                                onClick={() => handleUseDemoNumber("RTI/2026/123456")}
                                className="font-mono font-medium text-rti-600 hover:underline"
                            >
                                RTI/2026/123456 (Active)
                            </button>
                            <span>·</span>
                            <button
                                type="button"
                                onClick={() => handleUseDemoNumber("RTI/2026/098721")}
                                className="font-mono font-medium text-rti-600 hover:underline"
                            >
                                RTI/2026/098721 (Response Ready)
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* Results */}
            {application && (
                <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                    {/* Status & SLA Banner */}
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="sm:col-span-2 rounded-3xl border border-green-200 bg-green-50 p-6 sm:p-7">
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-green-600 shadow-sm">
                                    <CheckCircle2 size={28} />
                                </div>

                                <div className="flex-1">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                                        Current status
                                    </p>

                                    <h2 className="mt-1 text-xl font-bold text-green-950">
                                        {application.status}
                                    </h2>

                                    <p className="mt-1 text-sm leading-6 text-green-900/70">
                                        {application.statusDescription || "Your application is being actively processed by the Public Information Officer."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Statutory SLA / Download Card */}
                        <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6 sm:p-7 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-2 text-blue-700">
                                    <Clock size={18} />
                                    <span className="text-xs font-semibold uppercase tracking-wider">
                                        Statutory SLA Clock
                                    </span>
                                </div>
                                <h3 className="mt-3 text-2xl font-bold text-blue-950">
                                    {application.slaCountdown
                                        ? `${application.slaCountdown.daysRemaining} days left`
                                        : "30-day statutory limit"}
                                </h3>
                                <p className="mt-1 text-xs text-blue-800/80">
                                    Deadline: {application.slaDeadlineDate || "Within 30 days"}
                                </p>
                            </div>

                            {isResponseReady ? (
                                <button
                                    type="button"
                                    onClick={() => downloadOfficialResponsePDF(application)}
                                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow hover:bg-blue-700 transition"
                                >
                                    <FileDown size={15} />
                                    Download Official Response PDF
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => downloadAcknowledgmentPDF(application)}
                                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-4 py-2 text-xs font-semibold text-blue-900 shadow-xs hover:bg-blue-50 transition"
                                >
                                    <Download size={14} />
                                    Download Receipt PDF
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Application information & Timeline */}
                    <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
                        {/* Timeline */}
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
                            <div className="mb-8 flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold text-navy-900">
                                        Application timeline
                                    </h2>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Transparent audit history of your request.
                                    </p>
                                </div>

                                {isResponseReady && (
                                    <button
                                        type="button"
                                        onClick={() => downloadOfficialResponsePDF(application)}
                                        className="inline-flex items-center gap-1.5 rounded-xl bg-green-50 border border-green-200 px-3 py-1.5 text-xs font-semibold text-green-700 hover:bg-green-100 transition"
                                    >
                                        <FileDown size={14} />
                                        Response PDF
                                    </button>
                                )}
                            </div>

                            {application.timeline && application.timeline.length > 0 ? (
                                <RTITimeline timeline={application.timeline} />
                            ) : (
                                <p className="text-sm text-slate-500">Timeline events are being compiled.</p>
                            )}
                        </div>

                        {/* Details */}
                        <div className="h-fit overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
                            <div className="border-b border-slate-100 p-6">
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    Application details
                                </p>
                                <p className="mt-3 break-all font-mono text-sm font-semibold text-navy-900">
                                    {application.registrationNumber}
                                </p>
                            </div>

                            <div className="divide-y divide-slate-100">
                                <div className="p-6">
                                    <div className="flex gap-3">
                                        <Landmark size={18} className="mt-0.5 shrink-0 text-slate-400" />
                                        <div>
                                            <p className="text-xs text-slate-400">Public authority</p>
                                            <p className="mt-1 text-sm font-semibold leading-6 text-navy-900">
                                                {authorityDisplayName}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex gap-3">
                                        <Calendar size={18} className="mt-0.5 shrink-0 text-slate-400" />
                                        <div>
                                            <p className="text-xs text-slate-400">Submitted on</p>
                                            <p className="mt-1 text-sm font-semibold text-navy-900">
                                                {application.submittedOn || application.filedDate}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {application.requestText && (
                                    <div className="p-6">
                                        <div className="flex gap-3">
                                            <FileText size={18} className="mt-0.5 shrink-0 text-slate-400" />
                                            <div>
                                                <p className="text-xs text-slate-400">Request Subject / Summary</p>
                                                <p className="mt-1 text-xs leading-5 text-slate-600 line-clamp-3">
                                                    {application.requestText}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="p-6 bg-slate-50/70">
                                    <button
                                        type="button"
                                        onClick={() => downloadAcknowledgmentPDF(application)}
                                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-slate-300 py-2.5 text-xs font-semibold text-navy-900 hover:bg-slate-50 transition shadow-2xs"
                                    >
                                        <Download size={14} />
                                        Download Acknowledgment Receipt
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Help & Auto-Escalation Prompt */}
                    <div className="mt-6 flex gap-4 rounded-3xl border border-blue-200 bg-blue-50 p-6">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600">
                            <Info size={19} />
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-blue-950">
                                What does "{application.status}" mean?
                            </h3>

                            <p className="mt-1 text-sm leading-6 text-blue-900/70">
                                Your application has reached the designated Public Information Officer and is being processed in compliance with the RTI Act 2005. If a response is not received within 30 days, you can file a First Appeal at no extra fee.
                            </p>

                            <div className="mt-4 flex flex-wrap gap-3">
                                <Link
                                    to={`/first-appeal?registration=${encodeURIComponent(application.registrationNumber)}`}
                                    className="inline-flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-red-700 transition"
                                >
                                    File First Appeal against this RTI
                                    <ArrowRight size={13} />
                                </Link>

                                <Link
                                    to="/learn"
                                    className="inline-flex items-center gap-1.5 rounded-xl border border-blue-200 bg-white px-3.5 py-2 text-xs font-semibold text-blue-900 hover:bg-blue-50 transition"
                                >
                                    RTI Appeal Guidelines
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Empty state */}
            {!application && !error && (
                <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="rounded-2xl border border-slate-200 bg-white p-5">
                            <ShieldCheck size={21} className="text-green-600" />
                            <h3 className="mt-4 text-sm font-semibold text-navy-900">
                                Secure tracking
                            </h3>
                            <p className="mt-1 text-sm leading-6 text-slate-500">
                                Check your application status using your official registration number.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5">
                            <FileText size={21} className="text-rti-600" />
                            <h3 className="mt-4 text-sm font-semibold text-navy-900">
                                Complete timeline
                            </h3>
                            <p className="mt-1 text-sm leading-6 text-slate-500">
                                See important events and statutory milestones from submission to response.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5">
                            <Landmark size={21} className="text-slate-600" />
                            <h3 className="mt-4 text-sm font-semibold text-navy-900">
                                Know what's next
                            </h3>
                            <p className="mt-1 text-sm leading-6 text-slate-500">
                                Understand the current stage and statutory deadlines without confusion.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-slate-500">
                            Haven't filed an RTI yet?
                        </p>
                        <Link
                            to="/file-rti"
                            className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-rti-600 hover:text-rti-700"
                        >
                            File an RTI application
                            <ArrowRight size={15} />
                        </Link>
                    </div>
                </section>
            )}
        </div>
    );
}