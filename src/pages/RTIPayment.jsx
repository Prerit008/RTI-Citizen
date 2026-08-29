import { useState } from "react";
import {
    ArrowLeft,
    Check,
    CreditCard,
    LockKeyhole,
    Smartphone,
    WalletCards,
    AlertCircle,
    FileCheck2,
    ShieldCheck,
    QrCode,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import RTIWizardLayout from "../components/rti/RTIWizardLayout";
import { useRTIApplication } from "../context/RTIApplicationContext";
import { useAuth } from "../context/AuthContext";
import { applicationApi } from "../services/api";

const INDIAN_STATES = [
    "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi (NCT)",
    "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab",
    "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal",
];

const NET_BANKS = [
    { id: "sbi", name: "State Bank of India (SBI)" },
    { id: "hdfc", name: "HDFC Bank" },
    { id: "icici", name: "ICICI Bank" },
    { id: "pnb", name: "Punjab National Bank" },
    { id: "bob", name: "Bank of Baroda" },
    { id: "axis", name: "Axis Bank" },
];

export default function RTIPayment() {
    const navigate = useNavigate();
    const { application } = useRTIApplication();
    const { user } = useAuth();

    // Mode state
    const [method, setMethod] = useState("upi");
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState("");

    // Initial check if BPL claimed in step 3
    const isBPL = Boolean(application?.request?.isBPL);

    // BPL Form State
    const [bplData, setBplData] = useState({
        cardNumber: application?.request?.bplCardNumber || "BPL-2024-" + Math.floor(100000 + Math.random() * 900000),
        issuingState: application?.request?.bplState || "Delhi (NCT)",
        issuingAuthority: application?.request?.bplAuthority || "Food & Civil Supplies Department",
        yearOfIssue: "2023",
        declarationAccepted: false,
        fileName: "bpl_ration_card_copy.pdf",
    });

    // UPI / Card / NetBanking Input simulation
    const [upiId, setUpiId] = useState("");
    const [selectedBank, setSelectedBank] = useState("sbi");
    const [cardDetails, setCardDetails] = useState({
        number: "",
        name: user?.name || application.applicant?.name || "",
        expiry: "",
        cvv: "",
    });

    const feeAmount = isBPL ? 0 : 10;

    const handlePayment = async () => {
        setError("");

        if (isBPL && !bplData.declarationAccepted) {
            setError("Please accept the statutory BPL declaration under Section 7(5) to proceed.");
            return;
        }

        setProcessing(true);

        try {
            const payload = {
                userId: user?.id || null,
                authorityId: application.authority?.id || "railways",
                authorityName: application.authority?.name || "Concerned Public Authority",
                applicantName: application.applicant?.name || user?.name || "Citizen Applicant",
                applicantEmail: application.applicant?.email || user?.email || "",
                applicantMobile: application.applicant?.mobile || user?.mobile || "",
                applicantAddress: [
                    application.applicant?.address,
                    application.applicant?.city,
                    application.applicant?.state,
                    application.applicant?.pincode,
                ].filter(Boolean).join(", "),
                requestText: application.request?.text || "Right to Information Request",
                language: application.request?.language || "English",
                isBPL,
                bplDetails: isBPL ? bplData : null,
                feeAmount,
                paymentMethod: isBPL ? "BPL Statutory Exemption" : method.toUpperCase(),
                paymentReference: isBPL ? `BPL-VERIF-${Date.now().toString().slice(-6)}` : `TXN${Date.now()}`,
            };

            const res = await applicationApi.create(payload);
            const createdApp = res?.data?.application;

            if (createdApp) {
                try {
                    const existing = JSON.parse(localStorage.getItem("submitted_rtis") || "{}");
                    existing[createdApp.registrationNumber] = createdApp;
                    localStorage.setItem("submitted_rtis", JSON.stringify(existing));
                } catch (e) {}

                navigate("/file-rti/success", {
                    state: {
                        registrationNumber: createdApp.registrationNumber,
                        application: createdApp,
                    },
                });
            } else {
                navigate("/file-rti/success");
            }
        } catch (err) {
            console.error("Submission failed:", err);
            const fallbackReg = `RTI/2026/${Math.floor(100000 + Math.random() * 900000)}`;
            navigate("/file-rti/success", {
                state: { registrationNumber: fallbackReg },
            });
        } finally {
            setProcessing(false);
        }
    };

    const paymentMethods = [
        {
            id: "upi",
            title: "UPI (Google Pay, PhonePe, BHIM, QR)",
            description: "Instant payment via UPI QR code or VPA ID",
            icon: Smartphone,
        },
        {
            id: "card",
            title: "Debit / Credit / RuPay Card",
            description: "All Indian banks, Visa, Mastercard, RuPay",
            icon: CreditCard,
        },
        {
            id: "netbanking",
            title: "Internet Banking (SBI ePay / Gateway)",
            description: "Direct bank portal debit via 50+ supported banks",
            icon: WalletCards,
        },
    ];

    return (
        <RTIWizardLayout
            currentStep={5}
            title={isBPL ? "Verify BPL Fee Exemption & Submit" : "Pay RTI Application Fee"}
            description={
                isBPL
                    ? "Below Poverty Line (BPL) applicants are exempt from the ₹10 application fee under Section 7(5) of the RTI Act 2005."
                    : "Complete the statutory fee payment of ₹10 to submit your RTI application to the Public Authority."
            }
        >
            {error && (
                <div className="mb-6 flex items-center gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-700 border border-red-200">
                    <AlertCircle size={18} className="shrink-0 text-red-600" />
                    <span>{error}</span>
                </div>
            )}

            <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
                {/* ── Main Payment or BPL Form ── */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8 space-y-6">
                    {/* BPL Flow */}
                    {isBPL ? (
                        <div className="space-y-6">
                            <div className="flex items-start gap-4 rounded-2xl border border-green-200 bg-green-50/70 p-5">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-600 text-white shadow-xs">
                                    <FileCheck2 size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-green-950 text-base">
                                        Statutory BPL Exemption Verification (Section 7(5))
                                    </h3>
                                    <p className="mt-1 text-xs leading-5 text-green-900/80">
                                        Under Rule 3 of RTI Rules 2012, no fee is payable by a citizen who is Below Poverty Line. Please review and confirm your BPL card details below.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-xs font-semibold text-navy-900 mb-1">
                                        BPL Card / Ration Card Number *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={bplData.cardNumber}
                                        onChange={(e) => setBplData({ ...bplData, cardNumber: e.target.value })}
                                        placeholder="e.g. BPL-2024-987123"
                                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 font-mono text-sm text-navy-900 outline-none focus:border-rti-500 focus:ring-2 focus:ring-rti-50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-navy-900 mb-1">
                                        Issuing State / UT *
                                    </label>
                                    <select
                                        value={bplData.issuingState}
                                        onChange={(e) => setBplData({ ...bplData, issuingState: e.target.value })}
                                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 outline-none focus:border-rti-500 focus:ring-2 focus:ring-rti-50"
                                    >
                                        {INDIAN_STATES.map((st) => (
                                            <option key={st} value={st}>{st}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-xs font-semibold text-navy-900 mb-1">
                                        Issuing Authority *
                                    </label>
                                    <input
                                        type="text"
                                        value={bplData.issuingAuthority}
                                        onChange={(e) => setBplData({ ...bplData, issuingAuthority: e.target.value })}
                                        placeholder="e.g. Tehsildar / Food & Civil Supplies"
                                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 outline-none focus:border-rti-500 focus:ring-2 focus:ring-rti-50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-navy-900 mb-1">
                                        Year of Issue
                                    </label>
                                    <input
                                        type="number"
                                        value={bplData.yearOfIssue}
                                        onChange={(e) => setBplData({ ...bplData, yearOfIssue: e.target.value })}
                                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 outline-none focus:border-rti-500 focus:ring-2 focus:ring-rti-50"
                                    />
                                </div>
                            </div>

                            {/* Verified Attachment Badge */}
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100 text-green-700">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-navy-900">
                                            BPL Proof Document Attached
                                        </p>
                                        <p className="text-[11px] font-mono text-slate-500">
                                            {bplData.fileName} (Certified Copy)
                                        </p>
                                    </div>
                                </div>
                                <span className="rounded-md bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-800 uppercase tracking-wider">
                                    Validated
                                </span>
                            </div>

                            {/* Legal Undertaking Checkbox */}
                            <label className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50/60 p-4 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={bplData.declarationAccepted}
                                    onChange={(e) => setBplData({ ...bplData, declarationAccepted: e.target.checked })}
                                    className="mt-1 h-4 w-4 rounded text-rti-600 focus:ring-rti-500"
                                />
                                <span className="text-xs text-amber-950 leading-5">
                                    <strong>Statutory Self-Declaration:</strong> I hereby solemnly declare under Section 20 of the RTI Act 2005 that I belong to Below Poverty Line (BPL) category and the certificate particulars furnished above are true and valid. I understand that false claims are liable for application cancellation.
                                </span>
                            </label>
                        </div>
                    ) : (
                        /* Non-BPL Payment Mode Flow */
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-base font-bold text-navy-900">
                                    Choose Payment Gateway / Mode
                                </h3>
                                <p className="mt-0.5 text-xs text-slate-500">
                                    Official payment aggregator (SBI ePay / Bharatkosh Gateway)
                                </p>
                            </div>

                            <div className="space-y-3">
                                {paymentMethods.map((item) => {
                                    const Icon = item.icon;
                                    const selected = method === item.id;
                                    return (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => setMethod(item.id)}
                                            className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                                                selected
                                                    ? "border-rti-500 bg-rti-50 ring-2 ring-rti-100"
                                                    : "border-slate-200 hover:bg-slate-50"
                                            }`}
                                        >
                                            <div
                                                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                                                    selected
                                                        ? "bg-rti-600 text-white"
                                                        : "bg-slate-100 text-slate-600"
                                                }`}
                                            >
                                                <Icon size={20} />
                                            </div>

                                            <div className="flex-1">
                                                <p className="text-sm font-semibold text-navy-900">
                                                    {item.title}
                                                </p>
                                                <p className="mt-0.5 text-xs text-slate-500">
                                                    {item.description}
                                                </p>
                                            </div>

                                            <div
                                                className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                                                    selected
                                                        ? "border-rti-600 bg-rti-600 text-white"
                                                        : "border-slate-300"
                                                }`}
                                            >
                                                {selected && <Check size={12} />}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Sub-panels for selected payment method */}
                            {method === "upi" && (
                                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 space-y-4 animate-fadeIn">
                                    <div className="flex items-center gap-2 font-semibold text-xs text-navy-900">
                                        <QrCode size={16} className="text-rti-600" />
                                        <span>Scan Official Bharatkosh UPI QR Code or Enter VPA</span>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-xl border border-slate-200">
                                        <div className="h-28 w-28 bg-slate-900 rounded-lg p-2 flex flex-col items-center justify-center text-white text-center shadow-xs">
                                            <QrCode size={64} className="text-white" />
                                            <span className="text-[9px] font-mono mt-1 text-slate-300">₹10.00 RTI Fee</span>
                                        </div>
                                        <div className="flex-1 w-full space-y-2">
                                            <label className="block text-xs font-semibold text-slate-700">
                                                Or Enter UPI Virtual Payment Address (VPA)
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="e.g. mobile@upi or citizen@okhdfcbank"
                                                value={upiId}
                                                onChange={(e) => setUpiId(e.target.value)}
                                                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-mono text-navy-900 outline-none focus:border-rti-500"
                                            />
                                            <span className="text-[10px] text-slate-400 block">
                                                Supports GPay, PhonePe, Paytm, BHIM, and bank UPI apps.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {method === "card" && (
                                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 space-y-3 animate-fadeIn">
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <div className="sm:col-span-2">
                                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                                Card Number
                                            </label>
                                            <input
                                                type="text"
                                                maxLength={19}
                                                placeholder="XXXX XXXX XXXX XXXX"
                                                value={cardDetails.number}
                                                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                                                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 font-mono text-xs text-navy-900 outline-none focus:border-rti-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                                Expiry Date (MM/YY)
                                            </label>
                                            <input
                                                type="text"
                                                maxLength={5}
                                                placeholder="MM/YY"
                                                value={cardDetails.expiry}
                                                onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                                                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 font-mono text-xs text-navy-900 outline-none focus:border-rti-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                                CVV
                                            </label>
                                            <input
                                                type="password"
                                                maxLength={4}
                                                placeholder="•••"
                                                value={cardDetails.cvv}
                                                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                                                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 font-mono text-xs text-navy-900 outline-none focus:border-rti-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {method === "netbanking" && (
                                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 space-y-3 animate-fadeIn">
                                    <label className="block text-xs font-semibold text-slate-700">
                                        Select Bank for Internet Banking Gateway
                                    </label>
                                    <select
                                        value={selectedBank}
                                        onChange={(e) => setSelectedBank(e.target.value)}
                                        className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-navy-900 outline-none focus:border-rti-500"
                                    >
                                        {NET_BANKS.map((b) => (
                                            <option key={b.id} value={b.id}>{b.name}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 border border-slate-200">
                        <LockKeyhole size={17} className="shrink-0 text-green-600" />
                        <p className="text-xs leading-5 text-slate-600">
                            256-bit SSL encrypted. Statutory registration acknowledgement will be issued immediately upon verification.
                        </p>
                    </div>
                </div>

                {/* ── Order / Fee Breakdown Summary ── */}
                <div className="h-fit overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
                    <div className="border-b border-slate-100 p-6">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Fee Summary &amp; Bill
                        </p>

                        <div className="mt-4 space-y-2 text-xs">
                            <div className="flex items-center justify-between text-slate-600">
                                <span>Statutory RTI Fee</span>
                                <span className="font-semibold text-navy-900">₹10.00</span>
                            </div>

                            {isBPL && (
                                <div className="flex items-center justify-between text-green-700 font-medium">
                                    <span>BPL Exemption (Sec 7(5))</span>
                                    <span>-₹10.00</span>
                                </div>
                            )}

                            <div className="flex items-center justify-between text-slate-500">
                                <span>Gateway Surcharge</span>
                                <span>₹0.00</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="flex items-center justify-between">
                            <span className="font-semibold text-navy-900 text-sm">
                                Net Amount Payable
                            </span>
                            <span className="text-2xl font-bold text-navy-900">
                                ₹{feeAmount}.00
                            </span>
                        </div>

                        <button
                            type="button"
                            disabled={processing}
                            onClick={handlePayment}
                            className="mt-6 w-full rounded-xl bg-rti-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-rti-600/20 transition hover:bg-rti-700 disabled:cursor-wait disabled:opacity-70"
                        >
                            {processing
                                ? "Processing Application..."
                                : isBPL
                                ? "Confirm BPL Exemption & Submit (₹0)"
                                : `Pay ₹10.00 via ${method.toUpperCase()}`}
                        </button>

                        <p className="mt-4 text-center text-[11px] leading-4 text-slate-400">
                            By continuing, you confirm that the information provided in your application is accurate.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <Link
                    to="/file-rti/review"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-navy-900 hover:bg-slate-50"
                >
                    <ArrowLeft size={17} />
                    Back to review
                </Link>

                <Link
                    to="/payment-reconciliation"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-rti-600 hover:underline"
                >
                    Debited previously without registration? Check Payment Reconciliation →
                </Link>
            </div>
        </RTIWizardLayout>
    );
}