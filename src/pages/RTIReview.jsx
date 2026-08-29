import {
    ArrowLeft,
    ArrowRight,
    Edit3,
    FileText,
    Landmark,
    Mail,
    MapPin,
    Phone,
    ShieldCheck,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import RTIWizardLayout from "../components/rti/RTIWizardLayout";
import { useRTIApplication } from "../context/RTIApplicationContext";

function ReviewSection({
    icon: Icon,
    title,
    children,
    editPath,
}) {
    return (
        <div className="border-b border-slate-100 p-6 last:border-0 sm:p-7">

            <div className="flex items-start justify-between gap-4">

                <div className="flex min-w-0 gap-4">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-navy-700">
                        <Icon size={19} />
                    </div>

                    <div className="min-w-0">

                        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            {title}
                        </h2>

                        <div className="mt-3">
                            {children}
                        </div>

                    </div>

                </div>

                <Link
                    to={editPath}
                    className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-rti-600 hover:text-rti-700"
                >
                    <Edit3 size={14} />
                    Edit
                </Link>

            </div>

        </div>
    );
}

export default function RTIReview() {
    const navigate = useNavigate();

    const { application } = useRTIApplication();

    const { authority, applicant, request } = application;

    return (
        <RTIWizardLayout
            currentStep={4}
            title="Review your application"
            description="Please check your details and information request carefully before continuing to payment."
        >

            {/* Review card */}
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">

                {/* Authority */}
                <ReviewSection
                    icon={Landmark}
                    title="Public authority"
                    editPath="/file-rti"
                >

                    <p className="font-semibold text-navy-900">
                        {authority.name}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                        Central Government public authority
                    </p>

                </ReviewSection>

                {/* Applicant */}
                <ReviewSection
                    icon={MapPin}
                    title="Applicant details"
                    editPath="/file-rti/applicant"
                >

                    <p className="font-semibold text-navy-900">
                        {applicant.name}
                    </p>

                    <div className="mt-3 space-y-2">

                        <p className="flex items-center gap-2 text-sm text-slate-500">
                            <Mail size={15} />
                            {applicant.email}
                        </p>

                        <p className="flex items-center gap-2 text-sm text-slate-500">
                            <Phone size={15} />
                            {applicant.mobile}
                        </p>

                        <p className="text-sm leading-6 text-slate-500">
                            {applicant.address}
                            <br />
                            {applicant.state} — {applicant.pincode}
                        </p>

                    </div>

                </ReviewSection>

                {/* Request */}
                <ReviewSection
                    icon={FileText}
                    title="Information requested"
                    editPath="/file-rti/request"
                >

                    <div className="rounded-2xl bg-slate-50 p-4 sm:p-5">

                        <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
                            {request.text}
                        </p>

                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">

                        <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                            {request.language}
                        </span>

                        {request.attachment && (
                            <span className="rounded-lg bg-rti-50 px-3 py-1.5 text-xs font-medium text-rti-700">
                                Attachment included
                            </span>
                        )}

                    </div>

                </ReviewSection>

            </div>

            {/* Fee */}
            <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">

                <div className="flex items-center gap-4 border-b border-slate-100 p-6 sm:p-7">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                        <ShieldCheck size={20} />
                    </div>

                    <div className="flex-1">

                        <p className="text-sm font-semibold text-navy-900">
                            Application fee
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                            The standard RTI application fee is ₹10.
                        </p>

                    </div>

                    <p className="text-xl font-bold text-navy-900">
                        ₹10
                    </p>

                </div>

                <div className="bg-slate-50 px-6 py-4 sm:px-7">

                    <p className="text-xs leading-5 text-slate-500">
                        If you are eligible for fee exemption under applicable
                        rules, the payment process may differ.
                    </p>

                </div>

            </div>

            {/* Action */}
            <div className="mt-8 flex items-center justify-between">

                <Link
                    to="/file-rti/request"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-navy-900 hover:bg-slate-50"
                >
                    <ArrowLeft size={17} />
                    Back
                </Link>

                <button
                    type="button"
                    onClick={() => navigate("/file-rti/payment")}
                    className="inline-flex items-center gap-2 rounded-xl bg-rti-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-rti-600/20 transition hover:bg-rti-700"
                >
                    Proceed to payment
                    <ArrowRight size={17} />
                </button>

            </div>

        </RTIWizardLayout>
    );
}