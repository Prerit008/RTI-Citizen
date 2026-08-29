import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import RTIWizardLayout from "../components/rti/RTIWizardLayout";
import { useRTIApplication } from "../context/RTIApplicationContext";

export default function RTIApplicant() {
    const navigate = useNavigate();

    const {
        application,
        updateSection,
    } = useRTIApplication();

    const applicant = application.applicant;

    const update = (field, value) => {
        updateSection("applicant", {
            [field]: value,
        });
    };

    const isValid =
        applicant.name.trim() &&
        applicant.email.trim() &&
        applicant.mobile.trim() &&
        applicant.address.trim() &&
        applicant.state.trim() &&
        applicant.pincode.trim();

    return (
        <RTIWizardLayout
            currentStep={2}
            title="Tell us about yourself"
            description="Enter the details we'll use to process your RTI application and communicate with you."
        >

            {/* Privacy notice */}
            <div className="mb-6 flex gap-4 rounded-2xl border border-slate-200 bg-white p-5">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-navy-700">
                    <Info size={19} />
                </div>

                <div>

                    <h2 className="text-sm font-semibold text-navy-900">
                        Why do we need these details?
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                        Your contact details are needed to process your application
                        and send you updates about its status.
                    </p>

                </div>

            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">

                <div className="grid gap-6 sm:grid-cols-2">

                    {/* Name */}
                    <div className="sm:col-span-2">

                        <label className="text-sm font-semibold text-navy-900">
                            Full name
                            <span className="ml-1 text-rti-600">*</span>
                        </label>

                        <input
                            value={applicant.name}
                            onChange={(e) =>
                                update("name", e.target.value)
                            }
                            placeholder="Enter your full name"
                            className="mt-2 h-12 w-full rounded-xl border border-slate-300 px-4 text-sm outline-none focus:border-rti-500 focus:ring-4 focus:ring-rti-50"
                        />

                    </div>

                    {/* Email */}
                    <div>

                        <label className="text-sm font-semibold text-navy-900">
                            Email address
                            <span className="ml-1 text-rti-600">*</span>
                        </label>

                        <input
                            type="email"
                            value={applicant.email}
                            onChange={(e) =>
                                update("email", e.target.value)
                            }
                            placeholder="you@example.com"
                            className="mt-2 h-12 w-full rounded-xl border border-slate-300 px-4 text-sm outline-none focus:border-rti-500 focus:ring-4 focus:ring-rti-50"
                        />

                    </div>

                    {/* Mobile */}
                    <div>

                        <label className="text-sm font-semibold text-navy-900">
                            Mobile number
                            <span className="ml-1 text-rti-600">*</span>
                        </label>

                        <input
                            type="tel"
                            value={applicant.mobile}
                            onChange={(e) =>
                                update("mobile", e.target.value)
                            }
                            placeholder="10-digit mobile number"
                            className="mt-2 h-12 w-full rounded-xl border border-slate-300 px-4 text-sm outline-none focus:border-rti-500 focus:ring-4 focus:ring-rti-50"
                        />

                    </div>

                    {/* Address */}
                    <div className="sm:col-span-2">

                        <label className="text-sm font-semibold text-navy-900">
                            Address
                            <span className="ml-1 text-rti-600">*</span>
                        </label>

                        <textarea
                            rows={3}
                            value={applicant.address}
                            onChange={(e) =>
                                update("address", e.target.value)
                            }
                            placeholder="House / flat number, street, locality..."
                            className="mt-2 w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-rti-500 focus:ring-4 focus:ring-rti-50"
                        />

                    </div>

                    {/* State */}
                    <div>

                        <label className="text-sm font-semibold text-navy-900">
                            State / UT
                            <span className="ml-1 text-rti-600">*</span>
                        </label>

                        <select
                            value={applicant.state}
                            onChange={(e) =>
                                update("state", e.target.value)
                            }
                            className="mt-2 h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none focus:border-rti-500 focus:ring-4 focus:ring-rti-50"
                        >
                            <option value="">
                                Select state / UT
                            </option>
                            <option>Uttar Pradesh</option>
                            <option>Delhi</option>
                            <option>Maharashtra</option>
                            <option>Karnataka</option>
                            <option>Tamil Nadu</option>
                            <option>West Bengal</option>
                            <option>Gujarat</option>
                            <option>Rajasthan</option>
                            <option>Other</option>
                        </select>

                    </div>

                    {/* Pincode */}
                    <div>

                        <label className="text-sm font-semibold text-navy-900">
                            PIN code
                            <span className="ml-1 text-rti-600">*</span>
                        </label>

                        <input
                            inputMode="numeric"
                            maxLength={6}
                            value={applicant.pincode}
                            onChange={(e) =>
                                update(
                                    "pincode",
                                    e.target.value.replace(/\D/g, "")
                                )
                            }
                            placeholder="6-digit PIN code"
                            className="mt-2 h-12 w-full rounded-xl border border-slate-300 px-4 text-sm outline-none focus:border-rti-500 focus:ring-4 focus:ring-rti-50"
                        />

                    </div>

                </div>

            </div>

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between">

                <Link
                    to="/file-rti"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-navy-900 hover:bg-slate-50"
                >
                    <ArrowLeft size={17} />
                    Back
                </Link>

                <button
                    type="button"
                    disabled={!isValid}
                    onClick={() =>
                        navigate("/file-rti/request")
                    }
                    className="
            inline-flex items-center gap-2 rounded-xl
            bg-rti-600 px-6 py-3.5
            text-sm font-semibold text-white
            shadow-lg shadow-rti-600/20
            hover:bg-rti-700
            disabled:cursor-not-allowed
            disabled:bg-slate-300
            disabled:shadow-none
          "
                >
                    Continue
                    <ArrowRight size={17} />
                </button>

            </div>

        </RTIWizardLayout>
    );
}