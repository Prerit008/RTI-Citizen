import { useState } from "react";
import {
    BookOpen,
    Scale,
    ShieldAlert,
    CheckCircle2,
    ArrowRight,
    FileText,
    Calculator,
    Info,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Learn() {
    const [selectedTab, setSelectedTab] = useState("basics");

    // Interactive SLA Calculator State
    const [filingDate, setFilingDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [isLifeLiberty, setIsLifeLiberty] = useState(false);

    // Calculate deadline
    const calcDeadline = () => {
        const start = new Date(filingDate);
        if (isNaN(start.getTime())) return { deadline: "Invalid Date", firstAppeal: "" };

        if (isLifeLiberty) {
            const lifeDate = new Date(start.getTime() + 48 * 60 * 60 * 1000);
            return {
                deadline: lifeDate.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) + " (48 Hours)",
                firstAppeal: "Immediate on expiry of 48 hours",
                isLife: true,
            };
        }

        const standardDeadline = new Date(start.getTime() + 30 * 24 * 60 * 60 * 1000);
        const appealExpiry = new Date(standardDeadline.getTime() + 30 * 24 * 60 * 60 * 1000);

        return {
            deadline: standardDeadline.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
            firstAppeal: `${standardDeadline.toLocaleDateString("en-IN", { day: "numeric", month: "short" })} to ${appealExpiry.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} (30-day window)`,
            isLife: false,
        };
    };

    const calculated = calcDeadline();

    const tabs = [
        { id: "basics", label: "RTI Fundamentals", icon: BookOpen },
        { id: "exemptions", label: "Section 8 Exemptions", icon: ShieldAlert },
        { id: "appeals", label: "Two-Tier Appeals", icon: Scale },
        { id: "fees", label: "Fees & BPL Rules", icon: Info },
        { id: "drafting", label: "Drafting Guide", icon: FileText },
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Header */}
            <section className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-2 rounded-full bg-rti-50 px-3 py-1.5 text-xs font-semibold text-rti-700">
                            <BookOpen size={14} />
                            RTI Knowledge &amp; Citizen Empowerment Centre
                        </span>

                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
                            How the RTI Act, 2005 Works
                        </h1>

                        <p className="mt-3 text-base leading-7 text-slate-600">
                            The Right to Information (RTI) Act, 2005 empowers Indian citizens to promote transparency, inspect public records, obtain certified government files, and hold public authorities accountable.
                        </p>
                    </div>
                </div>
            </section>

            <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 space-y-12">
                {/* ── Interactive Statutory SLA & Timeline Calculator ── */}
                <div className="rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50/80 via-white to-blue-50/40 p-6 sm:p-8 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-lg bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-800">
                                <Calculator size={14} />
                                Interactive Statutory Calculator
                            </div>
                            <h2 className="mt-2 text-xl font-bold text-navy-900">
                                Calculate Your Legal RTI &amp; Appeal Deadlines
                            </h2>
                            <p className="mt-1 text-xs text-slate-500 max-w-xl">
                                Under Section 7(1) of the RTI Act, the CPIO has statutory time limits to furnish replies. Compute exact dates based on your filing date.
                            </p>
                        </div>

                        {/* Input Controls */}
                        <div className="flex flex-wrap items-center gap-4">
                            <div>
                                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                                    RTI Filing Date
                                </label>
                                <input
                                    type="date"
                                    value={filingDate}
                                    onChange={(e) => setFilingDate(e.target.value)}
                                    className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-navy-900 outline-none focus:border-blue-500"
                                />
                            </div>

                            <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-700 cursor-pointer hover:bg-slate-50 mt-4 sm:mt-0">
                                <input
                                    type="checkbox"
                                    checked={isLifeLiberty}
                                    onChange={(e) => setIsLifeLiberty(e.target.checked)}
                                    className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                                />
                                <span>Life &amp; Liberty Case (48 Hours)</span>
                            </label>
                        </div>
                    </div>

                    {/* Calculation Results Grid */}
                    <div className="mt-6 grid gap-4 sm:grid-cols-3 pt-6 border-t border-blue-100">
                        <div className="rounded-2xl bg-white p-4 border border-blue-100 shadow-2xs">
                            <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider block">
                                CPIO Disposal Deadline
                            </span>
                            <strong className="text-base text-navy-950 font-mono mt-1 block">
                                {calculated.deadline}
                            </strong>
                            <span className="text-[11px] text-slate-500 mt-1 block">
                                {isLifeLiberty ? "Sec. 7(1) Proviso (48-hr urgent limit)" : "30-Day Statutory Mandate"}
                            </span>
                        </div>

                        <div className="rounded-2xl bg-white p-4 border border-blue-100 shadow-2xs">
                            <span className="text-[11px] font-semibold text-orange-600 uppercase tracking-wider block">
                                First Appeal Window
                            </span>
                            <strong className="text-xs font-semibold text-navy-950 mt-1 block">
                                {calculated.firstAppeal}
                            </strong>
                            <span className="text-[11px] text-slate-500 mt-1 block">
                                Section 19(1) to First Appellate Authority
                            </span>
                        </div>

                        <div className="rounded-2xl bg-white p-4 border border-blue-100 shadow-2xs">
                            <span className="text-[11px] font-semibold text-green-600 uppercase tracking-wider block">
                                Penalty on Delay (Sec 7(6))
                            </span>
                            <strong className="text-xs font-semibold text-green-800 mt-1 block">
                                Free Information after 30 days
                            </strong>
                            <span className="text-[11px] text-slate-500 mt-1 block">
                                CPIO cannot charge fees after deadline
                            </span>
                        </div>
                    </div>
                </div>

                {/* ── Topic Tabs ── */}
                <div className="flex gap-2 border-b border-slate-200 overflow-x-auto pb-px">
                    {tabs.map((t) => {
                        const Icon = t.icon;
                        const active = selectedTab === t.id;
                        return (
                            <button
                                key={t.id}
                                onClick={() => setSelectedTab(t.id)}
                                className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-xs sm:text-sm font-semibold transition ${
                                    active
                                        ? "border-rti-600 text-rti-600 bg-white rounded-t-xl"
                                        : "border-transparent text-slate-500 hover:text-navy-900"
                                }`}
                            >
                                <Icon size={16} />
                                {t.label}
                            </button>
                        );
                    })}
                </div>

                {/* ── Tab 1: RTI Fundamentals ── */}
                {selectedTab === "basics" && (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-soft">
                            <h2 className="text-xl font-bold text-navy-900">
                                1. Fundamental Principles of RTI Act, 2005
                            </h2>
                            <p className="mt-2 text-sm leading-7 text-slate-600">
                                Enacted by the Parliament of India, the RTI Act operationalizes the citizen's fundamental right to know flowing from <strong>Article 19(1)(a)</strong> of the Constitution of India. It replaces the old colonial culture of secrecy with proactive transparency.
                            </p>

                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                                    <h3 className="font-semibold text-sm text-navy-900">
                                        Who is a Public Authority?
                                    </h3>
                                    <p className="mt-1 text-xs leading-5 text-slate-600">
                                        All Central Ministries, government departments, public sector undertakings (PSUs), nationalized banks, universities, and bodies substantially financed by the government.
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                                    <h3 className="font-semibold text-sm text-navy-900">
                                        Who is the CPIO?
                                    </h3>
                                    <p className="mt-1 text-xs leading-5 text-slate-600">
                                        Every public authority designates Central Public Information Officers (CPIOs) responsible for receiving requests and providing certified records within 30 days.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── Tab 2: Section 8 Exemptions ── */}
                {selectedTab === "exemptions" && (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-soft">
                            <h2 className="text-xl font-bold text-navy-900">
                                2. Section 8: What Cannot Be Disclosed?
                            </h2>
                            <p className="mt-2 text-sm leading-7 text-slate-600">
                                While transparency is the general rule, Section 8(1) defines specific narrow exemptions where information may be withheld:
                            </p>

                            <div className="mt-6 space-y-3">
                                {[
                                    { title: "Sec. 8(1)(a) - National Sovereignty & Security", desc: "Information prejudicially affecting sovereignty, integrity, strategic scientific or economic interests of India." },
                                    { title: "Sec. 8(1)(d) - Commercial Confidence & Trade Secrets", desc: "Commercial confidence, trade secrets or intellectual property that harms competitive position unless public interest warrants." },
                                    { title: "Sec. 8(1)(g) - Physical Safety & Source of Info", desc: "Information that endangers life, safety, or reveals confidential law enforcement sources." },
                                    { title: "Sec. 8(1)(j) - Personal Privacy", desc: "Personal information having no relationship to public activity or interest, unless larger public interest justifies disclosure." },
                                ].map((ex) => (
                                    <div key={ex.title} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                                        <h4 className="font-semibold text-xs text-navy-900">{ex.title}</h4>
                                        <p className="text-xs text-slate-600 mt-1 leading-5">{ex.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* ── Tab 3: Two-Tier Appeals ── */}
                {selectedTab === "appeals" && (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-soft">
                            <h2 className="text-xl font-bold text-navy-900">
                                3. Two-Tier Appeal Mechanism
                            </h2>
                            <p className="mt-2 text-sm leading-7 text-slate-600">
                                If a citizen does not receive information within 30 days or is aggrieved by a rejection order, the Act provides a two-tier statutory remedy:
                            </p>

                            <div className="mt-6 grid gap-6 sm:grid-cols-2">
                                <div className="rounded-2xl border border-red-200 bg-red-50/50 p-5">
                                    <span className="rounded bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-800 uppercase">
                                        First Appeal · Section 19(1)
                                    </span>
                                    <h3 className="font-bold text-sm text-navy-900 mt-2">
                                        First Appellate Authority (FAA)
                                    </h3>
                                    <ul className="mt-2 space-y-1.5 text-xs text-slate-600 list-disc list-inside leading-5">
                                        <li>Filed with an officer senior in rank to the CPIO in the same Ministry.</li>
                                        <li>Filing deadline: <strong>30 days</strong> from receipt of reply or deadline expiry.</li>
                                        <li>Statutory Fee: <strong>₹0 (Completely Free)</strong>.</li>
                                        <li>Disposal Timeline: <strong>30 to 45 days</strong>.</li>
                                    </ul>
                                    <Link
                                        to="/first-appeal"
                                        className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-red-700 hover:underline"
                                    >
                                        File First Appeal on Portal →
                                    </Link>
                                </div>

                                <div className="rounded-2xl border border-purple-200 bg-purple-50/50 p-5">
                                    <span className="rounded bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-800 uppercase">
                                        Second Appeal · Section 19(3)
                                    </span>
                                    <h3 className="font-bold text-sm text-navy-900 mt-2">
                                        Central Information Commission (CIC)
                                    </h3>
                                    <ul className="mt-2 space-y-1.5 text-xs text-slate-600 list-disc list-inside leading-5">
                                        <li>Independent quasi-judicial statutory commission in New Delhi.</li>
                                        <li>Filing deadline: <strong>90 days</strong> from the date of the FAA order.</li>
                                        <li>Power to impose penalties up to <strong>₹25,000</strong> on errant CPIOs (Sec. 20).</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── Tab 4: Fees & BPL Rules ── */}
                {selectedTab === "fees" && (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-soft">
                            <h2 className="text-xl font-bold text-navy-900">
                                4. Statutory Fee Rules (RTI Rules, 2012)
                            </h2>

                            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
                                <table className="w-full text-left text-xs">
                                    <thead className="bg-slate-100 text-slate-700 font-semibold uppercase">
                                        <tr>
                                            <th className="p-3.5">Category</th>
                                            <th className="p-3.5">Prescribed Statutory Rate</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 text-slate-600">
                                        <tr>
                                            <td className="p-3.5 font-medium text-navy-900">Initial Application Fee</td>
                                            <td className="p-3.5 font-mono font-bold text-blue-700">₹10.00</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3.5 font-medium text-navy-900">Below Poverty Line (BPL) Applicants</td>
                                            <td className="p-3.5 font-mono font-bold text-green-700">₹0.00 (Exempted under Sec 7(5))</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3.5 font-medium text-navy-900">Document Copies (A4/A3 size)</td>
                                            <td className="p-3.5 font-mono">₹2.00 per page</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3.5 font-medium text-navy-900">Delayed Response (&gt;30 days)</td>
                                            <td className="p-3.5 font-mono font-bold text-green-700">₹0.00 (Free of cost under Sec 7(6))</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── Tab 5: Drafting Guide ── */}
                {selectedTab === "drafting" && (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-soft">
                            <h2 className="text-xl font-bold text-navy-900">
                                5. Tips for Drafting an Effective RTI Request
                            </h2>

                            <div className="mt-6 space-y-4 text-xs leading-6 text-slate-600">
                                <div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                                    <CheckCircle2 size={18} className="text-green-600 shrink-0 mt-0.5" />
                                    <div>
                                        <strong className="text-navy-900 block text-sm">Ask for documents, not opinions:</strong>
                                        <span>Use phrases like <em>"Please provide a certified copy of the sanctioned budget..."</em> instead of <em>"Why did the department delay..."</em>. CPIOs are only obligated to provide material records held in custody.</span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                                    <CheckCircle2 size={18} className="text-green-600 shrink-0 mt-0.5" />
                                    <div>
                                        <strong className="text-navy-900 block text-sm">Keep it concise and itemized:</strong>
                                        <span>Number your questions (Point 1, Point 2, Point 3). Stay within the 3,000-character limit or attach a clean PDF.</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <Link
                                    to="/file-rti"
                                    className="inline-flex items-center gap-2 rounded-xl bg-rti-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-rti-700 transition"
                                >
                                    Start Filing an RTI Now
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}