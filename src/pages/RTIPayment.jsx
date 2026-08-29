import {
    ArrowLeft,
    Check,
    CreditCard,
    LockKeyhole,
    Smartphone,
    WalletCards,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";

import RTIWizardLayout from "../components/rti/RTIWizardLayout";

export default function RTIPayment() {
    const navigate = useNavigate();

    const [method, setMethod] = useState("upi");
    const [processing, setProcessing] = useState(false);

    const handlePayment = () => {
        setProcessing(true);

        /*
          Demo payment flow.
    
          Later this will call the real payment gateway/backend.
        */

        setTimeout(() => {
            navigate("/file-rti/success");
        }, 1200);
    };

    const paymentMethods = [
        {
            id: "upi",
            title: "UPI",
            description: "Google Pay, PhonePe, BHIM and more",
            icon: Smartphone,
        },

        {
            id: "card",
            title: "Debit / Credit Card",
            description: "Visa, Mastercard, RuPay and more",
            icon: CreditCard,
        },

        {
            id: "netbanking",
            title: "Net Banking",
            description: "Pay using your bank account",
            icon: WalletCards,
        },
    ];

    return (
        <RTIWizardLayout
            currentStep={5}
            title="Pay the application fee"
            description="Complete the secure payment to submit your RTI application."
        >

            <div className="grid gap-6 lg:grid-cols-[1fr_340px]">

                {/* Payment methods */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">

                    <h2 className="text-lg font-semibold text-navy-900">
                        Choose a payment method
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Select how you'd like to pay.
                    </p>

                    <div className="mt-6 space-y-3">

                        {paymentMethods.map((item) => {

                            const Icon = item.icon;
                            const selected = method === item.id;

                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => setMethod(item.id)}
                                    className={`
                    flex w-full items-center gap-4 rounded-2xl border
                    p-4 text-left transition
                    ${selected
                                            ? "border-rti-500 bg-rti-50 ring-2 ring-rti-100"
                                            : "border-slate-200 hover:bg-slate-50"
                                        }
                  `}
                                >

                                    <div
                                        className={`
                      flex h-11 w-11 shrink-0 items-center justify-center rounded-xl
                      ${selected
                                                ? "bg-rti-600 text-white"
                                                : "bg-slate-100 text-slate-600"
                                            }
                    `}
                                    >
                                        <Icon size={20} />
                                    </div>

                                    <div className="flex-1">

                                        <p className="text-sm font-semibold text-navy-900">
                                            {item.title}
                                        </p>

                                        <p className="mt-1 text-xs text-slate-500">
                                            {item.description}
                                        </p>

                                    </div>

                                    <div
                                        className={`
                      flex h-5 w-5 items-center justify-center rounded-full border
                      ${selected
                                                ? "border-rti-600 bg-rti-600 text-white"
                                                : "border-slate-300"
                                            }
                    `}
                                    >
                                        {selected && <Check size={12} />}
                                    </div>

                                </button>
                            );
                        })}

                    </div>

                    <div className="mt-7 flex items-center gap-3 rounded-xl bg-slate-50 p-4">

                        <LockKeyhole
                            size={17}
                            className="shrink-0 text-green-600"
                        />

                        <p className="text-xs leading-5 text-slate-500">
                            Your payment information is securely processed.
                            Never share your UPI PIN, OTP or banking password
                            with anyone.
                        </p>

                    </div>

                </div>

                {/* Order summary */}
                <div className="h-fit overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">

                    <div className="border-b border-slate-100 p-6">

                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Payment summary
                        </p>

                        <div className="mt-5 flex items-center justify-between">

                            <span className="text-sm text-slate-500">
                                RTI application fee
                            </span>

                            <span className="font-semibold text-navy-900">
                                ₹10
                            </span>

                        </div>

                    </div>

                    <div className="p-6">

                        <div className="flex items-center justify-between">

                            <span className="font-semibold text-navy-900">
                                Total
                            </span>

                            <span className="text-2xl font-bold text-navy-900">
                                ₹10
                            </span>

                        </div>

                        <button
                            type="button"
                            disabled={processing}
                            onClick={handlePayment}
                            className="mt-6 w-full rounded-xl bg-rti-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-rti-600/20 transition hover:bg-rti-700 disabled:cursor-wait disabled:opacity-70"
                        >
                            {processing
                                ? "Processing..."
                                : "Pay ₹10 securely"}
                        </button>

                        <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                            By continuing, you confirm that the information
                            provided in your application is correct.
                        </p>

                    </div>

                </div>

            </div>

            <div className="mt-8">

                <Link
                    to="/file-rti/review"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-navy-900 hover:bg-slate-50"
                >
                    <ArrowLeft size={17} />
                    Back to review
                </Link>

            </div>

        </RTIWizardLayout>
    );
}