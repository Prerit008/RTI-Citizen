import { useState, useEffect } from "react";
import {
    Scale,
    Search,
    AlertCircle,
    CheckCircle2,
    Clock,
    FileText,
    ArrowRight,
    ArrowLeft,
    Download,
    Send,
    RotateCcw,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { applicationApi, appealApi } from "../services/api";
import { mockApplications } from "../data/mockApplications";
import { downloadAppealMemoPDF } from "../utils/pdfGenerator";

const APPEAL_GROUNDS = [
    {
        id: "no_response",
        label: "No response received within statutory 30-day limit (Deemed Refusal)",
        description: "The CPIO has failed to furnish a reply within the 30-day period prescribed under Section 7(1) of the RTI Act.",
    },
    {
        id: "rejected_exemptions",
        label: "Information wrongfully refused / rejected by CPIO",
        description: "The CPIO has denied disclosure under Section 8 or 9 without lawful justification or speaking order.",
    },
    {
        id: "incomplete_misleading",
        label: "Incomplete, misleading or false information provided",
        description: "The information supplied is evasive, partial, or does not address the specific queries raised in the RTI.",
    },
    {
        id: "unreasonable_fee",
        label: "Unreasonable or excessive additional fee demanded",
        description: "The calculation of additional cost or page charges demanded by CPIO is arbitrary or outside RTI Rules 2012.",
    },
    {
        id: "transfer_delay",
        label: "Delay or improper transfer under Section 6(3)",
        description: "The RTI was transferred beyond 5 days or forwarded to an incorrect authority causing undue delay.",
    },
];

export default function FirstAppeal() {
    const [searchParams] = useSearchParams();
    const parentFromUrl = searchParams.get("registration");

    // Workflow step: 1 = Lookup Parent RTI, 2 = Grounds & Grievance, 3 = Success
    const [step, setStep] = useState(1);

    // Parent RTI Lookup State
    const [parentRegNo, setParentRegNo] = useState(parentFromUrl || "");
    const [parentEmail, setParentEmail] = useState("");
    const [searchingParent, setSearchingParent] = useState(false);
    const [parentApplication, setParentApplication] = useState(null);
    const [lookupError, setLookupError] = useState("");

    // Appeal Form State
    const [appealForm, setAppealForm] = useState({
        groundCategory: "no_response",
        groundOfAppeal: APPEAL_GROUNDS[0].label,
        factsAndGrievance: "",
        prayerAndReliefSought: "Kindly direct the Central Public Information Officer (CPIO) to provide the complete, certified information requested in the original RTI application without charging any additional fee.",
        appellantName: "",
        appellantEmail: "",
        appellantMobile: "",
    });

    const [submittingAppeal, setSubmittingAppeal] = useState(false);
    const [appealResult, setAppealResult] = useState(null);
    const [submitError, setSubmitError] = useState("");

    // Fetch parent RTI helper
    const lookupParentRTI = async (regNo) => {
        const key = regNo.trim().toUpperCase();
        if (!key) {
            setLookupError("Please enter your original RTI Registration Number.");
            return;
        }

        setSearchingParent(true);
        setLookupError("");
        setParentApplication(null);

        try {
            const res = await applicationApi.track(key);
            if (res?.data?.application) {
                const app = res.data.application;
                setParentApplication(app);
                setAppealForm((prev) => ({
                    ...prev,
                    appellantName: app.applicantName || prev.appellantName,
                    appellantEmail: app.applicantEmail || prev.appellantEmail,
                    appellantMobile: app.applicantMobile || prev.appellantMobile,
                }));
                setSearchingParent(false);
                return;
            }
        } catch (e) {
            console.warn("Backend lookup failed, checking static fallback:", e.message);
        }

        // Fallback static check
        if (mockApplications[key]) {
            const app = mockApplications[key];
            setParentApplication(app);
            setAppealForm((prev) => ({
                ...prev,
                appellantName: app.applicantName || prev.appellantName,
                appellantEmail: app.applicantEmail || prev.appellantEmail,
                appellantMobile: app.applicantMobile || prev.appellantMobile,
            }));
            setSearchingParent(false);
            return;
        }

        // Check local storage
        try {
            const saved = JSON.parse(localStorage.getItem("submitted_rtis") || "{}");
            if (saved[key]) {
                const app = saved[key];
                setParentApplication(app);
                setAppealForm((prev) => ({
                    ...prev,
                    appellantName: app.applicantName || prev.appellantName,
                    appellantEmail: app.applicantEmail || prev.appellantEmail,
                    appellantMobile: app.applicantMobile || prev.appellantMobile,
                }));
                setSearchingParent(false);
                return;
            }
        } catch (err) {}

        setLookupError(`Original RTI "${key}" was not found. Please verify the registration number on your acknowledgement receipt.`);
        setSearchingParent(false);
    };

    useEffect(() => {
        if (parentFromUrl) {
            setParentRegNo(parentFromUrl);
            lookupParentRTI(parentFromUrl);
        }
    }, [parentFromUrl]);

    const handleLookupSubmit = (e) => {
        e.preventDefault();
        lookupParentRTI(parentRegNo);
    };

    const handleProceedToForm = () => {
        if (!parentApplication) {
            setLookupError("Please verify your original RTI Application before proceeding.");
            return;
        }
        setStep(2);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleGroundChange = (groundId) => {
        const item = APPEAL_GROUNDS.find((g) => g.id === groundId);
        if (item) {
            setAppealForm({
                ...appealForm,
                groundCategory: groundId,
                groundOfAppeal: item.label,
            });
        }
    };

    const handleAppealSubmit = async (e) => {
        e.preventDefault();
        setSubmitError("");

        if (!appealForm.factsAndGrievance.trim()) {
            setSubmitError("Please explain the grounds and facts of your appeal in detail.");
            return;
        }

        setSubmittingAppeal(true);

        const payload = {
            parentRegistrationNumber: parentApplication.registrationNumber,
            appellantName: appealForm.appellantName || parentApplication.applicantName || "Citizen Appellant",
            appellantEmail: appealForm.appellantEmail || parentApplication.applicantEmail || "",
            appellantMobile: appealForm.appellantMobile || parentApplication.applicantMobile || "",
            groundCategory: appealForm.groundCategory,
            groundOfAppeal: appealForm.groundOfAppeal,
            appealText: appealForm.factsAndGrievance,
            prayerAndReliefSought: appealForm.prayerAndReliefSought,
            authorityName: parentApplication.authorityName || parentApplication.authority,
        };

        try {
            const res = await appealApi.create(payload);
            if (res?.data?.appeal) {
                setAppealResult(res.data.appeal);
                setStep(3);
                window.scrollTo({ top: 0, behavior: "smooth" });
                return;
            }
        } catch (err) {
            console.warn("Backend appeal submission failed, using client fallback:", err.message);
        }

        // Client fallback if offline/backend demo
        const now = new Date();
        const appealNumber = `APPEAL/${now.getFullYear()}/${Math.floor(100000 + Math.random() * 900000)}`;
        const localAppeal = {
            id: appealNumber,
            appealNumber,
            parentRegistrationNumber: parentApplication.registrationNumber,
            authorityName: parentApplication.authorityName || parentApplication.authority,
            appellantName: payload.appellantName,
            appellantEmail: payload.appellantEmail,
            appellantMobile: payload.appellantMobile,
            groundOfAppeal: payload.groundOfAppeal,
            prayerAndReliefSought: payload.prayerAndReliefSought,
            submittedOn: now.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
            slaDeadlineDate: "Within 30 days",
            status: "Admitted with First Appellate Authority",
        };

        setAppealResult(localAppeal);
        setStep(3);
        window.scrollTo({ top: 0, behavior: "smooth" });
        setSubmittingAppeal(false);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <section className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700">
                            <Scale size={14} />
                            Section 19(1) · Right to Information Act, 2005
                        </span>

                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
                            File First Appeal
                        </h1>

                        <p className="mt-3 text-base leading-7 text-slate-600">
                            A First Appeal is preferred against the handling or decision of your original RTI application. It is routed to the <strong>First Appellate Authority (FAA)</strong> within the same Public Authority. Filing a First Appeal is <strong>100% Free (₹0 fee)</strong>.
                        </p>
                    </div>

                    {/* Relationship Infographic Banner */}
                    <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                            RTI Parent-Child Hierarchy
                        </p>

                        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-medium">
                            <div className="flex items-center gap-2 rounded-xl bg-white px-3.5 py-2 border border-slate-200 text-navy-900 shadow-2xs">
                                <FileText size={15} className="text-blue-600" />
                                <span>Original RTI Application</span>
                            </div>

                            <ArrowRight size={16} className="text-slate-400 shrink-0" />

                            <div className="flex items-center gap-2 rounded-xl bg-white px-3.5 py-2 border border-slate-200 text-slate-700 shadow-2xs">
                                <Clock size={15} className="text-amber-600" />
                                <span>CPIO Decision / 30-Day Limit</span>
                            </div>

                            <ArrowRight size={16} className="text-slate-400 shrink-0" />

                            <div className="flex items-center gap-2 rounded-xl bg-red-600 px-3.5 py-2 text-white shadow-xs font-bold">
                                <Scale size={15} />
                                <span>FIRST APPEAL (FAA)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 space-y-10">
                {/* ── STEP 1: Parent RTI Lookup ── */}
                {step === 1 && (
                    <div className="space-y-8">
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
                            <h2 className="text-xl font-bold text-navy-900">
                                Step 1: Link Original RTI Application
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Enter the registration number of the RTI application you wish to appeal against.
                            </p>

                            <form onSubmit={handleLookupSubmit} className="mt-6 space-y-4">
                                <div className="grid gap-4 sm:grid-cols-3">
                                    <div className="sm:col-span-2">
                                        <label className="block text-xs font-semibold text-navy-900 mb-1">
                                            Original RTI Registration Number *
                                        </label>
                                        <div className="relative">
                                            <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g. RTI/2026/123456 or RTI/2026/098721"
                                                value={parentRegNo}
                                                onChange={(e) => setParentRegNo(e.target.value)}
                                                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 font-mono text-sm text-navy-900 outline-none focus:border-rti-500 focus:ring-2 focus:ring-rti-50"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-navy-900 mb-1">
                                            Applicant Email (Optional)
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="you@example.com"
                                            value={parentEmail}
                                            onChange={(e) => setParentEmail(e.target.value)}
                                            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 outline-none focus:border-rti-500 focus:ring-2 focus:ring-rti-50"
                                        />
                                    </div>
                                </div>

                                {lookupError && (
                                    <div className="rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-700 flex items-center gap-2">
                                        <AlertCircle size={16} className="shrink-0" />
                                        <span>{lookupError}</span>
                                    </div>
                                )}

                                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                                    <button
                                        type="submit"
                                        disabled={searchingParent}
                                        className="inline-flex items-center gap-2 rounded-xl bg-rti-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-rti-700 transition disabled:opacity-60"
                                    >
                                        <Search size={16} />
                                        {searchingParent ? "Verifying Original RTI..." : "Find Original RTI"}
                                    </button>

                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                        <span>Try demo numbers:</span>
                                        <button
                                            type="button"
                                            onClick={() => { setParentRegNo("RTI/2026/123456"); lookupParentRTI("RTI/2026/123456"); }}
                                            className="font-mono text-rti-600 hover:underline"
                                        >
                                            RTI/2026/123456
                                        </button>
                                        <span>·</span>
                                        <button
                                            type="button"
                                            onClick={() => { setParentRegNo("RTI/2026/098721"); lookupParentRTI("RTI/2026/098721"); }}
                                            className="font-mono text-rti-600 hover:underline"
                                        >
                                            RTI/2026/098721
                                        </button>
                                    </div>
                                </div>
                            </form>

                            {/* Parent RTI Found Preview */}
                            {parentApplication && (
                                <div className="mt-8 rounded-2xl border-2 border-green-300 bg-green-50/50 p-6 animate-fadeIn">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-600 text-white">
                                                <CheckCircle2 size={22} />
                                            </div>
                                            <div>
                                                <span className="text-xs font-bold uppercase tracking-wider text-green-800">
                                                    Original RTI Verified
                                                </span>
                                                <h3 className="text-base font-bold text-navy-950 font-mono">
                                                    {parentApplication.registrationNumber}
                                                </h3>
                                            </div>
                                        </div>

                                        <span className="rounded-lg bg-white px-3 py-1 text-xs font-semibold border border-green-200 text-green-900">
                                            Status: {parentApplication.status}
                                        </span>
                                    </div>

                                    <div className="mt-5 grid gap-4 sm:grid-cols-3 text-xs">
                                        <div className="rounded-xl bg-white p-3 border border-green-200">
                                            <span className="text-slate-400 block font-medium">Public Authority</span>
                                            <strong className="text-navy-900 mt-0.5 block text-sm">
                                                {parentApplication.authorityName || parentApplication.authority}
                                            </strong>
                                        </div>

                                        <div className="rounded-xl bg-white p-3 border border-green-200">
                                            <span className="text-slate-400 block font-medium">Original Filing Date</span>
                                            <strong className="text-navy-900 mt-0.5 block text-sm">
                                                {parentApplication.submittedOn || parentApplication.filedDate}
                                            </strong>
                                        </div>

                                        <div className="rounded-xl bg-white p-3 border border-green-200">
                                            <span className="text-slate-400 block font-medium">Statutory SLA</span>
                                            <strong className="text-amber-700 mt-0.5 block text-sm">
                                                {parentApplication.slaCountdown ? `${parentApplication.slaCountdown.daysRemaining} days remaining` : "30-day limit"}
                                            </strong>
                                        </div>
                                    </div>

                                    {parentApplication.subject && (
                                        <p className="mt-3 text-xs text-slate-600 bg-white/80 p-3 rounded-xl border border-green-200">
                                            <strong>Subject:</strong> {parentApplication.subject}
                                        </p>
                                    )}

                                    <div className="mt-6 flex justify-end">
                                        <button
                                            type="button"
                                            onClick={handleProceedToForm}
                                            className="inline-flex items-center gap-2 rounded-xl bg-green-700 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-green-800 transition"
                                        >
                                            Proceed with First Appeal against this RTI
                                            <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Statutory Info Card */}
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
                            <h3 className="font-bold text-navy-900 text-sm">
                                Legal Guidelines for First Appeals (RTI Act, 2005)
                            </h3>
                            <ul className="mt-3 space-y-2 text-xs leading-6 text-slate-600 list-disc list-inside">
                                <li><strong>Appeal Window:</strong> A citizen can file a First Appeal within <strong>30 days</strong> from the date of expiry of the statutory 30-day CPIO deadline, or within 30 days of receiving an unsatisfactory decision from the CPIO.</li>
                                <li><strong>Appellate Officer:</strong> The appeal is adjudicated by an officer senior in rank to the CPIO within the same Ministry/Department.</li>
                                <li><strong>Disposal Timeline:</strong> The FAA is required to decide the appeal within <strong>30 to 45 days</strong> under Section 19(6).</li>
                                <li><strong>No Additional Fee:</strong> Under the RTI Rules 2012, no fee is charged for filing a First Appeal.</li>
                            </ul>
                        </div>
                    </div>
                )}

                {/* ── STEP 2: Ground of Appeal & Relief Sought ── */}
                {step === 2 && parentApplication && (
                    <div className="space-y-8">
                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-navy-900 transition"
                        >
                            <ArrowLeft size={15} />
                            Change Linked RTI Application
                        </button>

                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-6">
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                                        Step 2 of 2 · Appeal Drafting
                                    </span>
                                    <h2 className="text-xl font-bold text-navy-900 mt-1">
                                        Memorandum of First Appeal
                                    </h2>
                                </div>

                                <div className="rounded-xl bg-slate-100 px-3 py-1.5 text-xs text-slate-700">
                                    Parent RTI: <strong className="font-mono text-navy-900">{parentApplication.registrationNumber}</strong>
                                </div>
                            </div>

                            <form onSubmit={handleAppealSubmit} className="space-y-6">
                                {/* Ground Selection */}
                                <div>
                                    <label className="block text-sm font-bold text-navy-900 mb-2">
                                        Select Ground for First Appeal *
                                    </label>

                                    <div className="space-y-3">
                                        {APPEAL_GROUNDS.map((ground) => {
                                            const isSelected = appealForm.groundCategory === ground.id;
                                            return (
                                                <div
                                                    key={ground.id}
                                                    onClick={() => handleGroundChange(ground.id)}
                                                    className={`cursor-pointer rounded-2xl border p-4 transition ${
                                                        isSelected
                                                            ? "border-red-500 bg-red-50/50 shadow-2xs"
                                                            : "border-slate-200 bg-white hover:border-slate-300"
                                                    }`}
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <input
                                                            type="radio"
                                                            checked={isSelected}
                                                            onChange={() => handleGroundChange(ground.id)}
                                                            className="mt-1 h-4 w-4 text-red-600 focus:ring-red-500"
                                                        />
                                                        <div>
                                                            <strong className="block text-sm font-semibold text-navy-900">
                                                                {ground.label}
                                                            </strong>
                                                            <p className="mt-0.5 text-xs text-slate-500 leading-5">
                                                                {ground.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Facts of the Case */}
                                <div>
                                    <label className="block text-xs font-semibold text-navy-900 mb-1">
                                        Facts &amp; Grievance against PIO Handling *
                                    </label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={appealForm.factsAndGrievance}
                                        onChange={(e) => setAppealForm({ ...appealForm, factsAndGrievance: e.target.value })}
                                        placeholder="State the facts of your original application, reasons why you are dissatisfied with the response or non-response, and any other relevant points..."
                                        className="w-full rounded-xl border border-slate-300 bg-white p-3.5 text-sm text-navy-900 outline-none focus:border-rti-500 focus:ring-2 focus:ring-rti-50"
                                    />
                                </div>

                                {/* Relief Sought */}
                                <div>
                                    <label className="block text-xs font-semibold text-navy-900 mb-1">
                                        Prayer &amp; Relief Sought from First Appellate Authority *
                                    </label>
                                    <textarea
                                        required
                                        rows={3}
                                        value={appealForm.prayerAndReliefSought}
                                        onChange={(e) => setAppealForm({ ...appealForm, prayerAndReliefSought: e.target.value })}
                                        placeholder="State the exact relief you seek from the Appellate Authority (e.g. directing CPIO to provide certified copies, waive costs, etc.)"
                                        className="w-full rounded-xl border border-slate-300 bg-white p-3.5 text-sm text-navy-900 outline-none focus:border-rti-500 focus:ring-2 focus:ring-rti-50"
                                    />
                                </div>

                                {/* Appellant Particulars */}
                                <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                                        Appellant Particulars
                                    </p>

                                    <div className="grid gap-4 sm:grid-cols-3">
                                        <div>
                                            <label className="block text-xs font-medium text-slate-600 mb-1">
                                                Appellant Name
                                            </label>
                                            <input
                                                type="text"
                                                value={appealForm.appellantName}
                                                onChange={(e) => setAppealForm({ ...appealForm, appellantName: e.target.value })}
                                                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-navy-900"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-slate-600 mb-1">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                value={appealForm.appellantEmail}
                                                onChange={(e) => setAppealForm({ ...appealForm, appellantEmail: e.target.value })}
                                                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-navy-900"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-slate-600 mb-1">
                                                Mobile Number
                                            </label>
                                            <input
                                                type="tel"
                                                value={appealForm.appellantMobile}
                                                onChange={(e) => setAppealForm({ ...appealForm, appellantMobile: e.target.value })}
                                                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-navy-900"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {submitError && (
                                    <div className="rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-700 flex items-center gap-2">
                                        <AlertCircle size={16} className="shrink-0" />
                                        <span>{submitError}</span>
                                    </div>
                                )}

                                <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                                    <div className="text-xs text-slate-500">
                                        Appeal Fee: <strong className="text-green-700 font-bold">₹0 (Free under RTI Act)</strong>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={submittingAppeal}
                                        className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-red-700 transition disabled:opacity-60"
                                    >
                                        <Send size={16} />
                                        {submittingAppeal ? "Registering First Appeal..." : "Submit First Appeal to FAA"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* ── STEP 3: Appeal Confirmation & Memo ── */}
                {step === 3 && appealResult && (
                    <div className="space-y-8 animate-fadeIn">
                        <div className="rounded-3xl border border-red-200 bg-white p-6 sm:p-8 text-center shadow-card">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600 shadow-inner">
                                <Scale size={32} />
                            </div>

                            <p className="mt-4 text-xs font-bold uppercase tracking-wider text-red-600">
                                First Appeal Successfully Registered
                            </p>

                            <h2 className="mt-1 text-2xl font-bold text-navy-900 sm:text-3xl">
                                First Appeal Admitted under Section 19(1)
                            </h2>

                            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
                                Your appeal against RTI <strong className="font-mono text-navy-900">{appealResult.parentRegistrationNumber}</strong> has been transmitted to the <strong>First Appellate Authority (FAA)</strong> of {appealResult.authorityName}.
                            </p>

                            {/* Appeal Reg Box */}
                            <div className="mx-auto mt-6 max-w-md rounded-2xl border border-red-200 bg-red-50/70 p-5">
                                <span className="text-xs font-semibold text-red-800 uppercase tracking-wider">
                                    Appeal Registration Number
                                </span>
                                <div className="mt-1 font-mono text-2xl font-bold text-red-950">
                                    {appealResult.appealNumber}
                                </div>
                                <span className="mt-1 block text-xs text-red-700">
                                    Statutory SLA: 30-Day FAA Disposal Mandate
                                </span>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => downloadAppealMemoPDF(appealResult)}
                                    className="inline-flex items-center gap-2 rounded-xl bg-navy-900 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-navy-800 transition"
                                >
                                    <Download size={16} />
                                    Download Appeal Memo (PDF)
                                </button>

                                <Link
                                    to={`/track?registration=${encodeURIComponent(appealResult.parentRegistrationNumber)}`}
                                    className="inline-flex items-center gap-2 rounded-xl bg-rti-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-rti-700 transition"
                                >
                                    <Search size={16} />
                                    View Parent RTI &amp; Timeline
                                </Link>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setStep(1);
                                        setParentApplication(null);
                                        setParentRegNo("");
                                        setAppealResult(null);
                                    }}
                                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
                                >
                                    <RotateCcw size={15} />
                                    File Another Appeal
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}