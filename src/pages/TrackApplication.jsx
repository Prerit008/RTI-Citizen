import { useEffect, useState } from "react";
import {
    ArrowRight,
    CheckCircle2,
    FileText,
    Info,
    Landmark,
    Search,
    ShieldCheck,
} from "lucide-react";

import {
    Link,
    useSearchParams,
} from "react-router-dom";
import RTITimeline from "../components/rti/RTITimeline";

import { mockApplications } from "../data/mockApplications";

export default function TrackApplication() {
    const [searchParams] = useSearchParams();

    const registrationFromUrl = searchParams.get("registration");

    const [registrationNumber, setRegistrationNumber] =
        useState("");

    const [application, setApplication] = useState(null);

    const [error, setError] = useState("");

    const handleTrack = (event) => {
        event.preventDefault();

        const value = registrationNumber.trim().toUpperCase();

        if (!value) {
            setError("Please enter your registration number.");
            setApplication(null);
            return;
        }

        const result = mockApplications[value];

        if (!result) {
            setError(
                "We couldn't find an application with that registration number."
            );

            setApplication(null);
            return;
        }

        setError("");
        setApplication(result);
    };

    const useDemoNumber = () => {
        setRegistrationNumber("RTI/2026/123456");
        setError("");
    };

    useEffect(() => {
        if (registrationFromUrl) {
            setRegistrationNumber(registrationFromUrl);

            const result =
                mockApplications[registrationFromUrl];

            if (result) {
                setApplication(result);
                setError("");
            }
        }
    }, [registrationFromUrl]);

    return (
        <div className="min-h-[calc(100vh-180px)] bg-slate-50">

            {/* Hero */}
            <section className="border-b border-slate-200 bg-white">

                <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">

                    <div className="max-w-2xl">

                        <span className="inline-flex items-center gap-2 rounded-full bg-rti-50 px-3 py-1.5 text-xs font-semibold text-rti-700">
                            <Search size={14} />
                            Application tracking
                        </span>

                        <h1 className="mt-5 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
                            Track your RTI application
                        </h1>

                        <p className="mt-4 text-base leading-7 text-slate-500">
                            Enter your registration number to see the latest
                            status, timeline and updates for your application.
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
                                        setRegistrationNumber(
                                            event.target.value
                                        )
                                    }
                                    placeholder="e.g. RTI/2026/123456"
                                    className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 font-mono text-sm text-navy-900 outline-none transition placeholder:font-sans placeholder:text-slate-400 focus:border-rti-500 focus:ring-4 focus:ring-rti-50"
                                />

                            </div>

                            <button
                                type="submit"
                                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-rti-600 px-6 text-sm font-semibold text-white shadow-lg shadow-rti-600/20 transition hover:bg-rti-700"
                            >
                                Track application
                                <ArrowRight size={17} />
                            </button>

                        </div>

                        {error && (
                            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                {error}
                            </div>
                        )}

                        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-400">

                            <span>
                                For testing:
                            </span>

                            <button
                                type="button"
                                onClick={useDemoNumber}
                                className="font-mono font-medium text-rti-600 hover:underline"
                            >
                                RTI/2026/123456
                            </button>

                        </div>

                    </form>

                </div>

            </section>

            {/* Results */}
            {application && (
                <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">

                    {/* Status */}
                    <div className="rounded-3xl border border-green-200 bg-green-50 p-6 sm:p-7">

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
                                    {application.statusDescription}
                                </p>

                            </div>

                            <div className="sm:text-right">

                                <p className="text-xs text-green-700">
                                    Last updated
                                </p>

                                <p className="mt-1 text-sm font-semibold text-green-950">
                                    {application.lastUpdated}
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* Application information */}
                    <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">

                        {/* Timeline */}
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">

                            <div className="mb-8">

                                <h2 className="text-xl font-semibold text-navy-900">
                                    Application timeline
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Here's what's happened with your application.
                                </p>

                            </div>

                            <RTITimeline
                                timeline={application.timeline}
                            />

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

                                        <Landmark
                                            size={18}
                                            className="mt-0.5 shrink-0 text-slate-400"
                                        />

                                        <div>

                                            <p className="text-xs text-slate-400">
                                                Public authority
                                            </p>

                                            <p className="mt-1 text-sm font-semibold leading-6 text-navy-900">
                                                {application.authority}
                                            </p>

                                        </div>

                                    </div>

                                </div>

                                <div className="p-6">

                                    <div className="flex gap-3">

                                        <FileText
                                            size={18}
                                            className="mt-0.5 shrink-0 text-slate-400"
                                        />

                                        <div>

                                            <p className="text-xs text-slate-400">
                                                Submitted on
                                            </p>

                                            <p className="mt-1 text-sm font-semibold text-navy-900">
                                                {application.submittedOn}
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Help */}
                    <div className="mt-6 flex gap-4 rounded-3xl border border-blue-200 bg-blue-50 p-6">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600">
                            <Info size={19} />
                        </div>

                        <div>

                            <h3 className="text-sm font-semibold text-blue-950">
                                What does "With Public Authority" mean?
                            </h3>

                            <p className="mt-1 text-sm leading-6 text-blue-900/70">
                                Your application has reached the concerned authority
                                and is being processed. You don't need to take any
                                action right now unless you receive a request for
                                additional information.
                            </p>

                        </div>

                    </div>

                </section>
            )}

            {/* Empty state */}
            {!application && !error && (
                <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">

                    <div className="grid gap-4 sm:grid-cols-3">

                        <div className="rounded-2xl border border-slate-200 bg-white p-5">

                            <ShieldCheck
                                size={21}
                                className="text-green-600"
                            />

                            <h3 className="mt-4 text-sm font-semibold text-navy-900">
                                Secure tracking
                            </h3>

                            <p className="mt-1 text-sm leading-6 text-slate-500">
                                Check your application status using your registration
                                number.
                            </p>

                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5">

                            <FileText
                                size={21}
                                className="text-rti-600"
                            />

                            <h3 className="mt-4 text-sm font-semibold text-navy-900">
                                Complete timeline
                            </h3>

                            <p className="mt-1 text-sm leading-6 text-slate-500">
                                See important events and updates from submission to
                                response.
                            </p>

                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5">

                            <Landmark
                                size={21}
                                className="text-slate-600"
                            />

                            <h3 className="mt-4 text-sm font-semibold text-navy-900">
                                Know what's next
                            </h3>

                            <p className="mt-1 text-sm leading-6 text-slate-500">
                                Understand the current stage and whether you need to
                                take any action.
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