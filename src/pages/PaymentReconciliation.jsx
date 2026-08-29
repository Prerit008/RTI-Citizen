import { useState } from "react";
import {
    CreditCard,
    Search,
    CheckCircle2,
    Clock,
    AlertCircle,
    RotateCcw,
    FileText,
    ArrowRight,
    ShieldCheck,
    Send,
    ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function PaymentReconciliation() {
    const [searchForm, setSearchForm] = useState({
        transactionRef: "",
        mobileOrEmail: "",
        transactionDate: "",
    });

    const [searching, setSearching] = useState(false);
    const [searchResult, setSearchResult] = useState(null);
    const [error, setError] = useState("");

    // Grievance Form state
    const [grievanceForm, setGrievanceForm] = useState({
        name: "",
        email: "",
        mobile: "",
        bankName: "",
        utrNumber: "",
        amount: "10",
        date: new Date().toISOString().split("T")[0],
        description: "",
    });
    const [grievanceSubmitting, setGrievanceSubmitting] = useState(false);
    const [grievanceSubmitted, setGrievanceSubmitted] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        setError("");
        setSearchResult(null);

        const ref = searchForm.transactionRef.trim();
        const contact = searchForm.mobileOrEmail.trim();

        if (!ref && !contact) {
            setError("Please enter either Transaction Reference ID or Mobile/Email.");
            return;
        }

        setSearching(true);
        setTimeout(() => {
            setSearching(false);
            // Demonstration resolution
            if (ref.toUpperCase().includes("FAIL") || ref === "000000") {
                setSearchResult({
                    status: "failed",
                    statusTitle: "Transaction Failed at Bank Gateway",
                    message: "The amount was declined by the acquiring bank. If debited, it will be automatically refunded to your source account within 3 to 5 banking days.",
                    refundStatus: "Auto-refund in Progress (Ref: REF" + Math.floor(100000 + Math.random() * 900000) + ")",
                    amount: "₹10",
                    utr: ref || "UPI-REF-998822",
                });
            } else {
                const generatedReg = `RTI/2026/${Math.floor(100000 + Math.random() * 900000)}`;
                setSearchResult({
                    status: "reconciled",
                    statusTitle: "Payment Verified & Reconciled",
                    message: "The statutory application fee was successfully confirmed. Your RTI application has been registered with the Public Authority.",
                    registrationNumber: generatedReg,
                    amount: "₹10",
                    utr: ref || `UPI${Date.now()}`,
                    settlementDate: new Date().toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    }),
                });
            }
        }, 900);
    };

    const handleGrievanceSubmit = (e) => {
        e.preventDefault();
        setGrievanceSubmitting(true);
        setTimeout(() => {
            const ticketId = `PR-2026-${Math.floor(100000 + Math.random() * 900000)}`;
            setGrievanceSubmitted({
                ticketId,
                utr: grievanceForm.utrNumber,
                email: grievanceForm.email,
            });
            setGrievanceSubmitting(false);
            setGrievanceForm({
                name: "",
                email: "",
                mobile: "",
                bankName: "",
                utrNumber: "",
                amount: "10",
                date: new Date().toISOString().split("T")[0],
                description: "",
            });
        }, 900);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <section className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-2 rounded-full bg-rti-50 px-3 py-1.5 text-xs font-semibold text-rti-700">
                            <CreditCard size={14} />
                            Payment Settlement &amp; Reconciliation
                        </span>

                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
                            Payment Reconciliation Portal
                        </h1>

                        <p className="mt-3 text-base leading-7 text-slate-600">
                            If your payment was debited from your bank account or UPI app but your RTI application registration number was not generated, check your transaction status or raise a reconciliation request below.
                        </p>
                    </div>
                </div>
            </section>

            <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 space-y-10">
                {/* ── Status Explanation Banner ── */}
                <div className="rounded-3xl border border-blue-200 bg-blue-50/80 p-6 sm:p-7">
                    <div className="flex gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-xs">
                            <ShieldCheck size={22} />
                        </div>
                        <div>
                            <h2 className="font-bold text-blue-950 text-base">
                                How Payment Reconciliation Works
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-blue-900/80">
                                Most digital payments settle immediately. In rare cases of network drops between the payment gateway (SBI ePay / Bharatkosh / Bank) and the RTI portal, transactions take up to <strong>24 to 48 hours</strong> to reconcile automatically. Unsettled amounts are auto-refunded to your bank account within <strong>3 to 5 banking working days</strong>.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── Search / Verification Card ── */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
                    <h2 className="text-xl font-bold text-navy-900">
                        Check Transaction Settlement Status
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Enter your Bank Reference Number / UPI UTR or Registered Contact.
                    </p>

                    <form onSubmit={handleSearch} className="mt-6 space-y-4">
                        <div className="grid gap-4 sm:grid-cols-3">
                            <div>
                                <label className="block text-xs font-semibold text-navy-900 mb-1">
                                    Bank Reference / UTR Number
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. 423987123901 or TXN123"
                                    value={searchForm.transactionRef}
                                    onChange={(e) => setSearchForm({ ...searchForm, transactionRef: e.target.value })}
                                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 font-mono text-sm text-navy-900 outline-none focus:border-rti-500 focus:ring-2 focus:ring-rti-50"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-navy-900 mb-1">
                                    Applicant Mobile or Email
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. 9876543210 or user@example.com"
                                    value={searchForm.mobileOrEmail}
                                    onChange={(e) => setSearchForm({ ...searchForm, mobileOrEmail: e.target.value })}
                                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 outline-none focus:border-rti-500 focus:ring-2 focus:ring-rti-50"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-navy-900 mb-1">
                                    Transaction Date
                                </label>
                                <input
                                    type="date"
                                    value={searchForm.transactionDate}
                                    onChange={(e) => setSearchForm({ ...searchForm, transactionDate: e.target.value })}
                                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 outline-none focus:border-rti-500 focus:ring-2 focus:ring-rti-50"
                                />
                            </div>
                        </div>

                        {error && (
                            <p className="text-xs text-red-600 flex items-center gap-1">
                                <AlertCircle size={14} /> {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={searching}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-rti-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-rti-700 transition disabled:opacity-60"
                        >
                            <Search size={16} />
                            {searching ? "Verifying Transaction with Gateway..." : "Verify Payment Status"}
                        </button>
                    </form>

                    {/* Result Output */}
                    {searchResult && (
                        <div className="mt-8 pt-6 border-t border-slate-100">
                            {searchResult.status === "reconciled" ? (
                                <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-600 text-white">
                                            <CheckCircle2 size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <span className="text-xs font-bold uppercase tracking-wider text-green-700">
                                                Reconciliation Successful
                                            </span>
                                            <h3 className="text-lg font-bold text-green-950 mt-0.5">
                                                {searchResult.statusTitle}
                                            </h3>
                                            <p className="mt-1 text-sm text-green-900/80">
                                                {searchResult.message}
                                            </p>

                                            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-700">
                                                <div className="rounded-lg bg-white px-3 py-1.5 border border-green-200">
                                                    Registration No: <strong className="font-mono text-navy-950">{searchResult.registrationNumber}</strong>
                                                </div>
                                                <div className="rounded-lg bg-white px-3 py-1.5 border border-green-200">
                                                    Amount: <strong>{searchResult.amount}</strong>
                                                </div>
                                                <div className="rounded-lg bg-white px-3 py-1.5 border border-green-200">
                                                    Ref ID: <span className="font-mono">{searchResult.utr}</span>
                                                </div>
                                            </div>

                                            <div className="mt-4">
                                                <Link
                                                    to={`/track?registration=${searchResult.registrationNumber}`}
                                                    className="inline-flex items-center gap-2 rounded-xl bg-green-700 px-4 py-2 text-xs font-semibold text-white hover:bg-green-800 transition"
                                                >
                                                    Track This Application <ArrowRight size={13} />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-600 text-white">
                                            <RotateCcw size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                                                Gateway Notice
                                            </span>
                                            <h3 className="text-lg font-bold text-amber-950 mt-0.5">
                                                {searchResult.statusTitle}
                                            </h3>
                                            <p className="mt-1 text-sm text-amber-900/80">
                                                {searchResult.message}
                                            </p>

                                            <div className="mt-4 rounded-lg bg-white px-3 py-2 border border-amber-200 text-xs text-slate-700 inline-block">
                                                Status: <strong>{searchResult.refundStatus}</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* ── Raise Grievance Ticket Form ── */}
                <div className="grid gap-8 lg:grid-cols-5">
                    <div className="lg:col-span-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
                        <h2 className="text-xl font-bold text-navy-900">
                            Raise Payment Grievance
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            If your payment issue is unresolved after 48 hours, submit the transaction details for manual reconciliation by our accounts team.
                        </p>

                        {grievanceSubmitted && (
                            <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 p-5">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 size={22} className="text-green-600 shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-green-950">
                                            Payment Grievance Registered
                                        </h4>
                                        <p className="text-xs text-green-800 mt-1">
                                            Grievance Ticket ID: <strong className="font-mono">{grievanceSubmitted.ticketId}</strong>.
                                            Updates will be dispatched to {grievanceSubmitted.email}.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleGrievanceSubmit} className="mt-6 space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-xs font-semibold text-navy-900 mb-1">
                                        Applicant Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={grievanceForm.name}
                                        onChange={(e) => setGrievanceForm({ ...grievanceForm, name: e.target.value })}
                                        placeholder="Full Name"
                                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 outline-none focus:border-rti-500 focus:ring-2 focus:ring-rti-50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-navy-900 mb-1">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={grievanceForm.email}
                                        onChange={(e) => setGrievanceForm({ ...grievanceForm, email: e.target.value })}
                                        placeholder="you@example.com"
                                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 outline-none focus:border-rti-500 focus:ring-2 focus:ring-rti-50"
                                    />
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-xs font-semibold text-navy-900 mb-1">
                                        Mobile Number *
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        maxLength={10}
                                        value={grievanceForm.mobile}
                                        onChange={(e) => setGrievanceForm({ ...grievanceForm, mobile: e.target.value })}
                                        placeholder="9XXXXXXXXX"
                                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 outline-none focus:border-rti-500 focus:ring-2 focus:ring-rti-50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-navy-900 mb-1">
                                        Bank / Wallet / UPI Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={grievanceForm.bankName}
                                        onChange={(e) => setGrievanceForm({ ...grievanceForm, bankName: e.target.value })}
                                        placeholder="e.g. SBI, HDFC, Google Pay, PhonePe"
                                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 outline-none focus:border-rti-500 focus:ring-2 focus:ring-rti-50"
                                    />
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-xs font-semibold text-navy-900 mb-1">
                                        Bank UTR / Transaction ID *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={grievanceForm.utrNumber}
                                        onChange={(e) => setGrievanceForm({ ...grievanceForm, utrNumber: e.target.value })}
                                        placeholder="12-digit UTR or Bank Ref No"
                                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 font-mono text-sm text-navy-900 outline-none focus:border-rti-500 focus:ring-2 focus:ring-rti-50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-navy-900 mb-1">
                                        Debited Amount (₹)
                                    </label>
                                    <input
                                        type="number"
                                        value={grievanceForm.amount}
                                        onChange={(e) => setGrievanceForm({ ...grievanceForm, amount: e.target.value })}
                                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 outline-none focus:border-rti-500 focus:ring-2 focus:ring-rti-50"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-navy-900 mb-1">
                                    Additional Remarks / Bank Debit Details
                                </label>
                                <textarea
                                    rows={3}
                                    value={grievanceForm.description}
                                    onChange={(e) => setGrievanceForm({ ...grievanceForm, description: e.target.value })}
                                    placeholder="Mention payment time, public authority applied for, etc."
                                    className="w-full rounded-xl border border-slate-300 bg-white p-3.5 text-sm text-navy-900 outline-none focus:border-rti-500 focus:ring-2 focus:ring-rti-50"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={grievanceSubmitting}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-rti-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-rti-700 transition disabled:opacity-60"
                            >
                                <Send size={16} />
                                {grievanceSubmitting ? "Submitting Grievance..." : "Register Payment Grievance"}
                            </button>
                        </form>
                    </div>

                    {/* Guidelines and Policy */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
                            <h3 className="font-bold text-navy-900">
                                Payment Guidelines
                            </h3>

                            <ul className="mt-4 space-y-3 text-xs leading-6 text-slate-600">
                                <li className="flex items-start gap-2">
                                    <Clock size={16} className="text-slate-400 shrink-0 mt-0.5" />
                                    <span><strong>Recheck after 24 hrs:</strong> Bank gateway batch reconciliations occur overnight.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <RotateCcw size={16} className="text-slate-400 shrink-0 mt-0.5" />
                                    <span><strong>Auto Refund:</strong> Duplicate or unsuccessful debits are refunded to the source account without penalty.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <FileText size={16} className="text-slate-400 shrink-0 mt-0.5" />
                                    <span><strong>Exemption:</strong> Below Poverty Line (BPL) applicants do not require payment.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="rounded-3xl border border-blue-200 bg-blue-50/70 p-6">
                            <h4 className="font-bold text-blue-950 text-sm">
                                Need Immediate Assistance?
                            </h4>
                            <p className="mt-2 text-xs leading-5 text-blue-900/80">
                                Contact the official RTI Online Help Desk during office hours at <strong>011-24010690/691</strong> or email <code>helprtionline-dopt[at]nic[dot]in</code>.
                            </p>
                            <Link
                                to="/help"
                                className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:underline"
                            >
                                View Help Desk Page <ExternalLink size={12} />
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
