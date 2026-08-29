import { useEffect, useState } from "react";
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
    RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";
import RTIApplicationCard from "../components/rti/RTIApplicationCard";
import { dashboardStats } from "../data/mockDashboard";
import { useAuth } from "../context/AuthContext";
import { applicationApi } from "../services/api";

export default function Dashboard() {
    const { user } = useAuth();
    const userName = user ? user.name : "Citizen";

    const [applications, setApplications] = useState([]);
    const [stats, setStats] = useState(dashboardStats);
    const [loading, setLoading] = useState(true);

    const loadDashboardData = async () => {
        setLoading(true);
        try {
            const [appsRes, statsRes] = await Promise.allSettled([
                applicationApi.list(),
                applicationApi.getStats(),
            ]);

            let loadedApps = [];
            if (appsRes.status === "fulfilled" && appsRes.value?.data?.applications) {
                loadedApps = appsRes.value.data.applications.map((app) => ({
                    id: app.registrationNumber || app.id,
                    subject: app.subject || app.requestText?.slice(0, 75) + "..." || "RTI Information Request",
                    authority: app.authorityName || app.authority || "Concerned Public Authority",
                    submittedOn: app.submittedOn || app.filedDate,
                    status: app.status || "With Public Authority",
                    statusType: app.statusType || "active",
                    slaCountdown: app.slaCountdown,
                }));
            }

            // Check local storage for any applications created by this user in offline mode
            if (loadedApps.length === 0 && user) {
                try {
                    const raw = localStorage.getItem("submitted_rtis");
                    if (raw) {
                        const localList = Object.values(JSON.parse(raw))
                            .filter((item) => (user.id && item.userId === user.id) || (user.email && item.applicantEmail?.toLowerCase() === user.email.toLowerCase()))
                            .map((item) => ({
                                id: item.registrationNumber,
                                subject: item.requestText?.slice(0, 75) + "..." || "RTI Information Request",
                                authority: item.authorityName,
                                submittedOn: item.filedDate,
                                status: item.status || "With Public Authority",
                                statusType: "active",
                                slaCountdown: item.slaCountdown,
                            }));
                        loadedApps = localList;
                    }
                } catch (e) { }
            }

            setApplications(loadedApps);

            if (statsRes.status === "fulfilled" && statsRes.value?.data?.stats) {
                setStats(statsRes.value.data.stats);
            } else {
                setStats({
                    total: loadedApps.length,
                    active: loadedApps.filter((a) => a.statusType === "active" || a.status === "With Public Authority").length,
                    responseReady: loadedApps.filter((a) => a.statusType === "response" || a.status === "Response Ready").length,
                    closed: loadedApps.filter((a) => a.statusType === "closed" || a.status === "Closed").length,
                });
            }
        } catch (err) {
            console.warn("Failed to load dashboard data from API:", err);
            setApplications([]);
            setStats({ total: 0, active: 0, responseReady: 0, closed: 0 });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDashboardData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const responseReadyApp = applications.find((a) => a.statusType === "response" || a.status === "Response Ready");

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <section className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Citizen Dashboard
                            </p>

                            <h1 className="mt-1 text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
                                Welcome back, {userName}
                            </h1>

                            <p className="mt-2 text-sm text-slate-500">
                                Real-time monitoring of your filed Right to Information applications and statutory SLA clocks.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={loadDashboardData}
                                title="Refresh dashboard"
                                className="inline-flex items-center justify-center p-3 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                            >
                                <RefreshCw size={17} className={loading ? "animate-spin text-rti-600" : ""} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
                {/* Stats */}
                <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        icon={FileText}
                        label="Total applications"
                        value={stats.total}
                    />

                    <StatCard
                        icon={Clock3}
                        label="Active applications"
                        value={stats.active}
                    />

                    <StatCard
                        icon={CheckCircle2}
                        label="Response ready"
                        value={stats.responseReady}
                        highlight={stats.responseReady > 0}
                    />

                    <StatCard
                        icon={FilePlus2}
                        label="Closed / Disposed"
                        value={stats.closed}
                    />
                </section>

                {/* Attention banner */}
                {responseReadyApp && (
                    <section className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-5">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-green-600">
                                <Bell size={20} />
                            </div>

                            <div className="flex-1">
                                <h2 className="font-semibold text-green-950">
                                    Official Response Disclosed
                                </h2>

                                <p className="mt-1 text-sm leading-6 text-green-900/70">
                                    A response has been uploaded for application <strong>{responseReadyApp.id}</strong> by the Public Information Officer.
                                </p>
                            </div>

                            <Link
                                to={`/track?registration=${encodeURIComponent(responseReadyApp.id)}`}
                                className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-800"
                            >
                                View response
                                <ArrowRight size={15} />
                            </Link>
                        </div>
                    </section>
                )}

                {/* Applications List */}
                <section className="mt-10">
                    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-navy-900">
                                My Applications
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Track statutory progress and deadlines for your RTI requests.
                            </p>
                        </div>

                        <Link
                            to="/track"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-rti-600 hover:text-rti-700"
                        >
                            Track any registration number
                            <ArrowRight size={15} />
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {loading && applications.length === 0 ? (
                            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500">
                                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-rti-600 border-t-transparent mb-3" />
                                <p className="text-sm">Loading applications from server...</p>
                            </div>
                        ) : applications.length > 0 ? (
                            applications.map((application) => (
                                <RTIApplicationCard
                                    key={application.id}
                                    application={application}
                                />
                            ))
                        ) : (
                            <div className="p-10 sm:p-14 text-center bg-white rounded-3xl border border-slate-200 shadow-soft">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rti-50 text-rti-600 mb-4">
                                    <FilePlus2 size={32} />
                                </div>
                                <h3 className="text-lg font-bold text-navy-900">
                                    No RTI Applications Filed Yet
                                </h3>
                                <p className="mt-1 text-sm text-slate-500 max-w-md mx-auto">
                                    You have not submitted any RTI requests under this account. File a new request to track its 30-day statutory SLA countdown and public disclosures.
                                </p>
                                <div className="mt-6">
                                    <Link
                                        to="/file-rti"
                                        className="inline-flex items-center gap-2 rounded-xl bg-rti-600 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-rti-700 transition"
                                    >
                                        <Plus size={18} />
                                        File Your First RTI
                                    </Link>
                                </div>
                            </div>
                        )}
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
                            description="Check the status and SLA of an RTI application."
                            to="/track"
                        />

                        <QuickAction
                            icon={HelpCircle}
                            title="First Appeal"
                            description="Escalate delayed or unsatisfactory responses."
                            to="/first-appeal"
                        />

                        <QuickAction
                            icon={FileText}
                            title="Find authority"
                            description="Directory of ministries and public bodies."
                            to="/authorities"
                        />
                    </div>
                </section>
            </main>
        </div>
    );
}

function StatCard({ icon: Icon, label, value, highlight = false }) {
    return (
        <div
            className={`rounded-2xl border bg-white p-5 ${highlight ? "border-green-200" : "border-slate-200"
                }`}
        >
            <div className="flex items-center justify-between">
                <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${highlight
                            ? "bg-green-50 text-green-600"
                            : "bg-slate-100 text-slate-500"
                        }`}
                >
                    <Icon size={19} />
                </div>

                {highlight && (
                    <span className="text-xs font-semibold text-green-600">
                        Action needed
                    </span>
                )}
            </div>

            <p className="mt-5 text-2xl font-bold text-navy-900">{value}</p>
            <p className="mt-1 text-sm text-slate-500">{label}</p>
        </div>
    );
}

function QuickAction({ icon: Icon, title, description, to }) {
    return (
        <Link
            to={to}
            className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-rti-200 hover:shadow-soft"
        >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rti-50 text-rti-600">
                <Icon size={19} />
            </div>

            <h3 className="mt-4 font-semibold text-navy-900">{title}</h3>
            <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>

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