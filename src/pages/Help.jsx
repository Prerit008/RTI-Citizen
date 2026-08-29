import { useState } from "react";
import {
    Headphones,
    Phone,
    Mail,
    Clock,
    AlertTriangle,
    CheckCircle2,
    Send,
    HelpCircle,
    FileQuestion,
    CreditCard,
    ArrowRight,
    Copy,
    Check,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Help() {
    const [copiedEmail, setCopiedEmail] = useState(false);
    const [copiedPhone, setCopiedPhone] = useState(false);

    const [ticketForm, setTicketForm] = useState({
        name: "",
        email: "",
        mobile: "",
        category: "General Query",
        registrationNumber: "",
        message: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [ticketSubmitted, setTicketSubmitted] = useState(null);

    const handleCopy = (text, type) => {
        navigator.clipboard.writeText(text);
        if (type === "email") {
            setCopiedEmail(true);
            setTimeout(() => setCopiedEmail(false), 2000);
        } else {
            setCopiedPhone(true);
            setTimeout(() => setCopiedPhone(false), 2000);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        setTimeout(() => {
            const ticketId = `HD-2026-${Math.floor(100000 + Math.random() * 900000)}`;
            setTicketSubmitted({
                ticketId,
                email: ticketForm.email,
                category: ticketForm.category,
            });
            setSubmitting(false);
            setTicketForm({
                name: "",
                email: "",
                mobile: "",
                category: "General Query",
                registrationNumber: "",
                message: "",
            });
        }, 800);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header / Hero */}
            <section className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-2 rounded-full bg-rti-50 px-3 py-1.5 text-xs font-semibold text-rti-700">
                            <Headphones size={14} />
                            Citizen Support &amp; Grievances
                        </span>

                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
                            RTI Online Help Desk &amp; Support
                        </h1>

                        <p className="mt-3 text-base leading-7 text-slate-600">
                            We are dedicated to helping citizens access public information seamlessly. Find contact details, submit support tickets, or reconcile payment inquiries.
                        </p>
                    </div>
                </div>
            </section>

            <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12 space-y-10">
                {/* ── Official Mandatory Help Desk Notice ── */}
                <div className="rounded-3xl border-2 border-blue-300 bg-gradient-to-br from-blue-50 via-white to-blue-50/50 p-6 sm:p-8 shadow-sm">
                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md">
                            <Headphones size={24} />
                        </div>

                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <h2 className="text-lg font-bold text-navy-900 sm:text-xl">
                                    Official Help Desk Notice
                                </h2>
                                <span className="rounded-md bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
                                    DoPT · Govt. of India
                                </span>
                            </div>

                            {/* Exact requirement text */}
                            <div className="mt-4 rounded-2xl bg-white/90 border border-blue-100 p-5 shadow-xs">
                                <p className="text-sm font-medium leading-7 text-slate-800">
                                    <strong className="text-navy-950">Help Desk :</strong> For any query or feedback related to this portal, Please contact at{" "}
                                    <span className="font-mono font-bold text-blue-700">011-24010690 / 691 new</span>, during office hours{" "}
                                    <span className="font-semibold text-slate-900">(9:00 AM to 5:30 PM, Monday to Friday except Public Holidays)</span>{" "}
                                    or send an email to{" "}
                                    <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-blue-700">
                                        helprtionline-dopt[at]nic[dot]in
                                    </code>.
                                </p>

                                <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-amber-700">
                                    <AlertTriangle size={15} className="shrink-0" />
                                    <span>Due to high call volume, call waiting may occur.</span>
                                </div>
                            </div>

                            {/* Action Badges */}
                            <div className="mt-5 flex flex-wrap gap-3">
                                <a
                                    href="tel:01124010690"
                                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition"
                                >
                                    <Phone size={14} />
                                    Call 011-24010690
                                </a>

                                <button
                                    type="button"
                                    onClick={() => handleCopy("011-24010690", "phone")}
                                    className="inline-flex items-center gap-1.5 rounded-xl border border-blue-200 bg-white px-3.5 py-2.5 text-xs font-medium text-blue-800 hover:bg-blue-50 transition"
                                >
                                    {copiedPhone ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                                    {copiedPhone ? "Phone Copied!" : "Copy Numbers"}
                                </button>

                                <a
                                    href="mailto:helprtionline-dopt@nic.in"
                                    className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-white px-3.5 py-2.5 text-xs font-medium text-blue-800 hover:bg-blue-50 transition"
                                >
                                    <Mail size={14} />
                                    Email Helpdesk
                                </a>

                                <button
                                    type="button"
                                    onClick={() => handleCopy("helprtionline-dopt@nic.in", "email")}
                                    className="inline-flex items-center gap-1.5 rounded-xl border border-blue-200 bg-white px-3.5 py-2.5 text-xs font-medium text-blue-800 hover:bg-blue-50 transition"
                                >
                                    {copiedEmail ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                                    {copiedEmail ? "Email Copied!" : "Copy Email ID"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Quick Assistance Cards ── */}
                <div className="grid gap-6 sm:grid-cols-3">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                            <Clock size={20} />
                        </div>
                        <h3 className="mt-4 font-semibold text-navy-900">
                            Working Hours
                        </h3>
                        <p className="mt-2 text-xs leading-6 text-slate-500">
                            Monday to Friday<br />
                            <strong>9:00 AM – 5:30 PM IST</strong><br />
                            (Closed on Gazetted &amp; Public Holidays)
                        </p>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                            <CreditCard size={20} />
                        </div>
                        <h3 className="mt-4 font-semibold text-navy-900">
                            Payment Issues?
                        </h3>
                        <p className="mt-2 text-xs leading-6 text-slate-500">
                            Fee debited from your bank or UPI account but registration not generated?
                        </p>
                        <Link
                            to="/payment-reconciliation"
                            className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-green-700 hover:underline"
                        >
                            Payment Reconciliation Page <ArrowRight size={13} />
                        </Link>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                            <FileQuestion size={20} />
                        </div>
                        <h3 className="mt-4 font-semibold text-navy-900">
                            Frequently Asked Questions
                        </h3>
                        <p className="mt-2 text-xs leading-6 text-slate-500">
                            Common questions about filing, 30-day statutory SLA, fee exemption, and appeals.
                        </p>
                        <Link
                            to="/faq"
                            className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-purple-700 hover:underline"
                        >
                            Browse FAQ Archive <ArrowRight size={13} />
                        </Link>
                    </div>
                </div>

                {/* ── Query / Feedback Ticket Submission Form ── */}
                <div className="grid gap-8 lg:grid-cols-5">
                    <div className="lg:col-span-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
                        <h2 className="text-xl font-bold text-navy-900">
                            Submit Query or Feedback
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Have an issue with registration, portal navigation, or filing? Submit a ticket below.
                        </p>

                        {ticketSubmitted && (
                            <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 p-5">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 size={22} className="text-green-600 shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-green-950">
                                            Ticket Registered Successfully
                                        </h4>
                                        <p className="text-xs text-green-800 mt-1">
                                            Reference Ticket ID:{" "}
                                            <strong className="font-mono">{ticketSubmitted.ticketId}</strong>.
                                            Our support team will review and reply to {ticketSubmitted.email}.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleFormSubmit} className="mt-6 space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-xs font-semibold text-navy-900 mb-1">
                                        Your Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={ticketForm.name}
                                        onChange={(e) => setTicketForm({ ...ticketForm, name: e.target.value })}
                                        placeholder="e.g. Rahul Sharma"
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
                                        value={ticketForm.email}
                                        onChange={(e) => setTicketForm({ ...ticketForm, email: e.target.value })}
                                        placeholder="you@example.com"
                                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 outline-none focus:border-rti-500 focus:ring-2 focus:ring-rti-50"
                                    />
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-xs font-semibold text-navy-900 mb-1">
                                        Mobile Number
                                    </label>
                                    <input
                                        type="tel"
                                        maxLength={10}
                                        value={ticketForm.mobile}
                                        onChange={(e) => setTicketForm({ ...ticketForm, mobile: e.target.value })}
                                        placeholder="9XXXXXXXXX"
                                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 outline-none focus:border-rti-500 focus:ring-2 focus:ring-rti-50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-navy-900 mb-1">
                                        Category of Issue *
                                    </label>
                                    <select
                                        value={ticketForm.category}
                                        onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 outline-none focus:border-rti-500 focus:ring-2 focus:ring-rti-50"
                                    >
                                        <option>General Query</option>
                                        <option>Login / Registration Problem</option>
                                        <option>Payment Debited but No Registration</option>
                                        <option>Status Tracking Issue</option>
                                        <option>First Appeal Guidance</option>
                                        <option>Portal Feedback / Suggestion</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-navy-900 mb-1">
                                    RTI Registration Number (If applicable)
                                </label>
                                <input
                                    type="text"
                                    value={ticketForm.registrationNumber}
                                    onChange={(e) => setTicketForm({ ...ticketForm, registrationNumber: e.target.value })}
                                    placeholder="e.g. RTI/2026/123456"
                                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 font-mono text-sm text-navy-900 outline-none focus:border-rti-500 focus:ring-2 focus:ring-rti-50"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-navy-900 mb-1">
                                    Message / Details of Query *
                                </label>
                                <textarea
                                    required
                                    rows={4}
                                    value={ticketForm.message}
                                    onChange={(e) => setTicketForm({ ...ticketForm, message: e.target.value })}
                                    placeholder="Please describe your query or issue in detail..."
                                    className="w-full rounded-xl border border-slate-300 bg-white p-3.5 text-sm text-navy-900 outline-none focus:border-rti-500 focus:ring-2 focus:ring-rti-50"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-rti-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-rti-700 transition disabled:opacity-60"
                            >
                                <Send size={16} />
                                {submitting ? "Submitting Ticket..." : "Submit Support Query"}
                            </button>
                        </form>
                    </div>

                    {/* Side Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
                            <h3 className="font-bold text-navy-900">
                                Department Contact Details
                            </h3>

                            <div className="mt-4 space-y-3 text-xs leading-6 text-slate-600">
                                <div>
                                    <span className="font-semibold text-navy-900">Nodal Ministry:</span>
                                    <p>Department of Personnel and Training (DoPT), Government of India</p>
                                </div>

                                <div>
                                    <span className="font-semibold text-navy-900">Technical Partner:</span>
                                    <p>National Informatics Centre (NIC), New Delhi</p>
                                </div>

                                <div>
                                    <span className="font-semibold text-navy-900">Address:</span>
                                    <p>North Block, Central Secretariat, New Delhi - 110001</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-blue-200 bg-blue-50/70 p-6">
                            <div className="flex items-center gap-2 text-blue-900 font-bold">
                                <HelpCircle size={18} />
                                <span>Self-Service Tips</span>
                            </div>

                            <ul className="mt-3 space-y-2 text-xs text-blue-950/80 leading-5 list-disc list-inside">
                                <li>Always retain your 14-digit registration number safely.</li>
                                <li>Check spam/junk folders for official email notifications.</li>
                                <li>First Appeals can be filed after 30 days if no PIO reply arrives.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}