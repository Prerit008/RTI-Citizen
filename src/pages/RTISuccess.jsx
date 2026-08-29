import { useState } from "react";
import {
    Check,
    Copy,
    ExternalLink,
    Home,
    Search,
    Download,
    Printer,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useRTIApplication } from "../context/RTIApplicationContext";
import { downloadAcknowledgmentPDF } from "../utils/pdfGenerator";

export default function RTISuccess() {
    const location = useLocation();
    const { application, resetApplication } = useRTIApplication();
    const [copied, setCopied] = useState(false);

    // Get registration number and authority from navigation state or context
    const stateApp = location.state?.application;
    const registrationNumber =
        location.state?.registrationNumber ||
        stateApp?.registrationNumber ||
        "RTI/2026/123456";

    const authorityName =
        stateApp?.authorityName ||
        application.authority?.name ||
        "Concerned Public Authority";

    const applicantEmail =
        stateApp?.applicantEmail ||
        application.applicant?.email ||
        "your registered email";

    const copyNumber = async () => {
        await navigator.clipboard.writeText(registrationNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownloadPDF = () => {
        const payload = stateApp || {
            registrationNumber,
            authorityName,
            applicantName: application.applicant?.name || "Citizen Applicant",
            applicantEmail,
            applicantMobile: application.applicant?.mobile || "",
            applicantAddress: [
                application.applicant?.address,
                application.applicant?.city,
                application.applicant?.state,
                application.applicant?.pincode,
            ].filter(Boolean).join(", "),
            requestText: application.request?.text || "Right to Information Request",
            submittedOn: new Date().toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
            }),
            isBPL: application.request?.isBPL,
        };
        downloadAcknowledgmentPDF(payload);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-[calc(100vh-180px)] bg-slate-50">
            <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
                {/* Success Banner */}
                <div className="text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white shadow-lg">
                            <Check size={27} strokeWidth={3} />
                        </div>
                    </div>

                    <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-green-600">
                        Application Successfully Submitted
                    </p>

                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
                        Your RTI Application is Filed
                    </h1>

                    <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-500">
                        Your application has been logged and routed to{" "}
                        <strong className="text-navy-900">{authorityName}</strong>.
                        Keep your registration number safe to track your request in real-time.
                    </p>
                </div>

                {/* Registration Number Card */}
                <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-card sm:p-8">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        RTI Registration Number
                    </p>

                    <div className="mt-4 flex items-center justify-center gap-3">
                        <p className="font-mono text-2xl font-bold tracking-wide text-navy-900 sm:text-3xl">
                            {registrationNumber}
                        </p>

                        <button
                            type="button"
                            onClick={copyNumber}
                            title="Copy registration number"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-navy-900 transition"
                        >
                            {copied ? <Check size={17} className="text-green-600" /> : <Copy size={17} />}
                        </button>
                    </div>

                    {copied && (
                        <p className="mt-2 text-xs font-medium text-green-600">
                            Copied to clipboard!
                        </p>
                    )}

                    <p className="mt-4 text-sm text-slate-500">
                        An official confirmation acknowledgement has been recorded for{" "}
                        <span className="font-medium text-navy-900">{applicantEmail}</span>.
                    </p>
                </div>

                {/* Actions */}
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <button
                        type="button"
                        onClick={handleDownloadPDF}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy-900 px-4 py-3.5 text-sm font-semibold text-white shadow hover:bg-navy-800 transition sm:col-span-1"
                    >
                        <Download size={17} />
                        Download PDF
                    </button>

                    <button
                        type="button"
                        onClick={handlePrint}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm font-semibold text-navy-900 hover:bg-slate-50 transition sm:col-span-1"
                    >
                        <Printer size={17} />
                        Print Receipt
                    </button>

                    <Link
                        to={`/track?registration=${registrationNumber}`}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-rti-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-rti-600/20 hover:bg-rti-700 transition sm:col-span-1"
                    >
                        <Search size={17} />
                        Track RTI
                    </Link>
                </div>

                {/* What's Next Card */}
                <div className="mt-8 rounded-3xl border border-blue-200 bg-blue-50/80 p-6 sm:p-7">
                    <div className="flex gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-xs">
                            <ExternalLink size={18} />
                        </div>

                        <div>
                            <h2 className="font-semibold text-blue-950">
                                Statutory SLA &amp; What happens next?
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-blue-900/80">
                                The Public Information Officer (PIO) of{" "}
                                <strong>{authorityName}</strong> is mandated under Section 7(1) of the RTI Act 2005 to provide a reply within <strong>30 days</strong>. If delayed, you will receive an automatic prompt to file a First Appeal.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Return Home */}
                <div className="mt-8 text-center">
                    <Link
                        to="/"
                        onClick={resetApplication}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-navy-900"
                    >
                        <Home size={16} />
                        Return to RTI Online Home
                    </Link>
                </div>
            </div>
        </div>
    );
}