import { useEffect } from "react";
import { ArrowLeft, ArrowRight, UserCheck, ExternalLink, Mail, Phone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import RTIWizardLayout from "../components/rti/RTIWizardLayout";
import { useRTIApplication } from "../context/RTIApplicationContext";
import { useAuth } from "../context/AuthContext";

const STATES_LIST = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi (NCT)", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

export default function RTIApplicant() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const {
        application,
        updateSection,
    } = useRTIApplication();

    const applicant = application.applicant;

    // Automatically sync and lock from verified citizen profile
    useEffect(() => {
        if (user) {
            updateSection("applicant", {
                name: applicant.name || user.name || "",
                email: applicant.email || user.email || "",
                mobile: applicant.mobile || user.mobile || "",
                address: applicant.address || user.address || "",
                city: applicant.city || user.city || "",
                state: applicant.state || user.state || "Delhi (NCT)",
                pincode: applicant.pincode || user.pincode || "",
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const update = (field, value) => {
        updateSection("applicant", {
            [field]: value,
        });
    };

    const isValid =
        applicant.name?.trim() &&
        applicant.email?.trim() &&
        applicant.mobile?.trim() &&
        applicant.address?.trim() &&
        applicant.state?.trim() &&
        applicant.pincode?.trim();

    return (
        <RTIWizardLayout
            currentStep={2}
            title="Applicant Details &amp; Verification"
            description="Your identity and address are retrieved from your authenticated citizen profile."
        >
            {/* Verified Profile Notice */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-green-200 bg-green-50/80 p-5">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-600 text-white shadow-xs">
                        <UserCheck size={22} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-sm font-bold text-green-950">
                                Verified Citizen Profile Linked
                            </h2>
                            <span className="rounded bg-green-200/80 px-2 py-0.5 text-[10px] font-bold uppercase text-green-900">
                                Active
                            </span>
                        </div>
                        <p className="text-xs text-green-900/80 mt-0.5">
                            Particulars auto-filled from your authenticated account ({user?.email}).
                        </p>
                    </div>
                </div>

                <Link
                    to="/profile"
                    target="_blank"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-green-300 bg-white px-3.5 py-2 text-xs font-semibold text-green-900 hover:bg-green-100 transition shrink-0"
                >
                    <span>Edit Profile Settings</span>
                    <ExternalLink size={13} />
                </Link>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8 space-y-6">
                <div className="border-b border-slate-100 pb-4">
                    <h3 className="text-base font-bold text-navy-900">
                        Confirm Applicant Particulars for this Application
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                        These details will be printed on the official RTI application and Speed Post postal envelope.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                    {/* Name */}
                    <div className="sm:col-span-2">
                        <label className="text-xs font-semibold text-navy-900 mb-1.5 block">
                            Applicant Full Name *
                        </label>
                        <input
                            value={applicant.name}
                            onChange={(e) => update("name", e.target.value)}
                            placeholder="Enter your full name"
                            className="h-11 w-full rounded-xl border border-slate-300 px-3.5 text-sm text-navy-900 outline-none focus:border-rti-500 focus:ring-2 focus:ring-rti-50"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-xs font-semibold text-navy-900 mb-1.5 block">
                            Email Address (For Acknowledgement &amp; Digital Reply) *
                        </label>
                        <div className="relative">
                            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="email"
                                value={applicant.email}
                                onChange={(e) => update("email", e.target.value)}
                                placeholder="you@example.com"
                                className="h-11 w-full rounded-xl border border-slate-300 pl-10 pr-3.5 text-sm text-navy-900 outline-none focus:border-rti-500 focus:ring-2 focus:ring-rti-50"
                            />
                        </div>
                    </div>

                    {/* Mobile */}
                    <div>
                        <label className="text-xs font-semibold text-navy-900 mb-1.5 block">
                            Mobile Number (For SMS SLA Alerts) *
                        </label>
                        <div className="relative">
                            <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="tel"
                                maxLength={10}
                                value={applicant.mobile}
                                onChange={(e) => update("mobile", e.target.value)}
                                placeholder="9876543210"
                                className="h-11 w-full rounded-xl border border-slate-300 pl-10 pr-3.5 text-sm text-navy-900 outline-none focus:border-rti-500 focus:ring-2 focus:ring-rti-50"
                            />
                        </div>
                    </div>

                    {/* Address */}
                    <div className="sm:col-span-2">
                        <label className="text-xs font-semibold text-navy-900 mb-1.5 block">
                            Postal Delivery Address (For Certified Records via Speed Post) *
                        </label>
                        <textarea
                            rows={3}
                            value={applicant.address}
                            onChange={(e) => update("address", e.target.value)}
                            placeholder="Complete postal address with street, flat/house number..."
                            className="w-full rounded-xl border border-slate-300 p-3.5 text-sm text-navy-900 outline-none focus:border-rti-500 focus:ring-2 focus:ring-rti-50"
                        />
                    </div>

                    {/* State */}
                    <div>
                        <label className="text-xs font-semibold text-navy-900 mb-1.5 block">
                            State / Union Territory *
                        </label>
                        <select
                            value={applicant.state}
                            onChange={(e) => update("state", e.target.value)}
                            className="h-11 w-full rounded-xl border border-slate-300 px-3.5 text-sm text-navy-900 outline-none focus:border-rti-500 focus:ring-2 focus:ring-rti-50"
                        >
                            {STATES_LIST.map((state) => (
                                <option key={state} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Pincode */}
                    <div>
                        <label className="text-xs font-semibold text-navy-900 mb-1.5 block">
                            6-Digit PIN Code *
                        </label>
                        <input
                            maxLength={6}
                            value={applicant.pincode}
                            onChange={(e) => update("pincode", e.target.value)}
                            placeholder="e.g. 110001"
                            className="h-11 w-full rounded-xl border border-slate-300 px-3.5 font-mono text-sm text-navy-900 outline-none focus:border-rti-500 focus:ring-2 focus:ring-rti-50"
                        />
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex items-center justify-between">
                <Link
                    to="/file-rti"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-navy-900 transition hover:bg-slate-50"
                >
                    <ArrowLeft size={17} />
                    Back
                </Link>

                <button
                    type="button"
                    disabled={!isValid}
                    onClick={() => navigate("/file-rti/request")}
                    className="inline-flex items-center gap-2 rounded-xl bg-rti-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rti-600/20 transition hover:bg-rti-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Continue to Request Drafting
                    <ArrowRight size={17} />
                </button>
            </div>
        </RTIWizardLayout>
    );
}