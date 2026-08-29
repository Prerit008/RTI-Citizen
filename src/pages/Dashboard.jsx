import {
    ArrowRight,
    Bell,
    CheckCircle2,
    Clock3,
    FilePlus2,
    FileText,
    HelpCircle,
    Plus,
    Search,
} from "lucide-react";

import { Link } from "react-router-dom";

import RTIApplicationCard from "../components/rti/RTIApplicationCard";

import {
    dashboardApplications,
    dashboardStats,
} from "../data/mockDashboard";

import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
    const { user } = useAuth();
    const userName = user ? user.name : "Citizen";

    // Load user submitted applications
    const userSubmitted = (() => {
        try {
            const raw = localStorage.getItem("submitted_rtis");
            if (!raw) return [];
            return Object.values(JSON.parse(raw)).map((item) => ({
                id: item.registrationNumber,
                registrationNumber: item.registrationNumber,
                authority: item.authorityName,
                submittedDate: item.filedDate,
                status: item.status || "In progress",
                statusType: "info",
                summary: item.requestText,
            }));
        } catch {
            return [];
        }
    })();

    const allApps = [...userSubmitted, ...dashboardApplications];
    const totalCount = dashboardStats.total + userSubmitted.length;
    const activeCount = dashboardStats.active + userSubmitted.length;

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Header */}
            <section className="border-b border-slate-200 bg-white">

                <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">

                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

                        <div>

                            <p className="text-sm font-medium text-slate-500">
                                Citizen dashboard
                            </p>

                            <h1 className="mt-1 text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
                                Welcome back, {userName}
                            </h1>

                            <p className="mt-2 text-sm text-slate-500">
                                Here's what's happening with your RTI applications.
                            </p>

                        </div>

                        <Link
                            to="/file-rti"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-rti-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-rti-600/20 transition hover:bg-rti-700"
                        >
                            <Plus size={17} />
                            File new RTI
                        </Link>

                    </div>

                </div>

            </section>

            <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">

                {/* Stats */}
                <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                    <StatCard
                        icon={FileText}
                        label="Total applications"
                        value={totalCount}
                    />

                    <StatCard
                        icon={Clock3}
                        label="Active applications"
                        value={activeCount}
                    />

                    <StatCard
                        icon={CheckCircle2}
                        label="Response ready"
                        value={dashboardStats.responseReady}
                        highlight
                    />

                    <StatCard
                        icon={FilePlus2}
                        label="Closed"
                        value={dashboardStats.closed}
                    />

                </section>

                {/* Attention banner */}
                {dashboardStats.responseReady > 0 && (
                    <section className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-5">

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-green-600">
                                <Bell size={20} />
                            </div>

                            <div className="flex-1">

                                <h2 className="font-semibold text-green-950">
                                    You have a response waiting
                                </h2>

                                <p className="mt-1 text-sm leading-6 text-green-900/70">
                                    One of your RTI applications has received a
                                    response. Review it from your applications below.
                                </p>

                            </div>

                            <Link
                                to="/track?registration=RTI%2F2026%2F098721"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-800"
                            >
                                View response
                                <ArrowRight size={15} />
                            </Link>

                        </div>

                    </section>
                )}

                {/* Applications */}
                <section className="mt-10">

                    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

                        <div>

                            <h2 className="text-xl font-bold text-navy-900">
                                My applications
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Track and manage your RTI requests.
                            </p>

                        </div>

                        <Link
                            to="/track"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-rti-600 hover:text-rti-700"
                        >
                            Track another application
                            <ArrowRight size={15} />
                        </Link>

                    </div>

                    <div className="space-y-4">

                        {allApps.map((application) => (
                            <RTIApplicationCard
                                key={application.id}
                                application={application}
                            />
                        ))}

                    </div>

                </section>

                {/* Quick actions */}
                <section className="mt-10">

                    <div className="mb-5">

                        <h2 className="text-xl font-bold text-navy-900">
                            Quick actions
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Common things you may want to do.
                        </p>

                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                        <QuickAction
                            icon={FilePlus2}
                            title="File new RTI"
                            description="Request information from a public authority."
                            to="/file-rti"
                        />

                        <QuickAction
                            icon={Search}
                            title="Track application"
                            description="Check the status of an RTI application."
                            to="/track"
                        />

                        <QuickAction
                            icon={HelpCircle}
                            title="Get help"
                            description="Learn how the RTI process works."
                            to="/help"
                        />

                        <QuickAction
                            icon={FileText}
                            title="Find authority"
                            description="Find the department that can answer your question."
                            to="/authorities"
                        />

                    </div>

                </section>

            </main>

        </div>
    );
}


/* ----------------------------- */
/* Stat Card                      */
/* ----------------------------- */

function StatCard({
    icon: Icon,
    label,
    value,
    highlight = false,
}) {
    return (
        <div
            className={`
        rounded-2xl border bg-white p-5
        ${highlight
                    ? "border-green-200"
                    : "border-slate-200"
                }
      `}
        >

            <div className="flex items-center justify-between">

                <div
                    className={`
            flex h-10 w-10 items-center justify-center rounded-xl
            ${highlight
                            ? "bg-green-50 text-green-600"
                            : "bg-slate-100 text-slate-500"
                        }
          `}
                >
                    <Icon size={19} />
                </div>

                {highlight && (
                    <span className="text-xs font-semibold text-green-600">
                        Action needed
                    </span>
                )}

            </div>

            <p className="mt-5 text-2xl font-bold text-navy-900">
                {value}
            </p>

            <p className="mt-1 text-sm text-slate-500">
                {label}
            </p>

        </div>
    );
}


/* ----------------------------- */
/* Quick Action                   */
/* ----------------------------- */

function QuickAction({
    icon: Icon,
    title,
    description,
    to,
}) {
    return (
        <Link
            to={to}
            className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-rti-200 hover:shadow-soft"
        >

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rti-50 text-rti-600">
                <Icon size={19} />
            </div>

            <h3 className="mt-4 font-semibold text-navy-900">
                {title}
            </h3>

            <p className="mt-1 text-sm leading-6 text-slate-500">
                {description}
            </p>

            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-rti-600">
                Open
                <ArrowRight
                    size={13}
                    className="transition group-hover:translate-x-0.5"
                />
            </div>

        </Link>
    );
}