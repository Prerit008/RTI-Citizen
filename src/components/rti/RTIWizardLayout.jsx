import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import RTIProgress from "./RTIProgress";

export default function RTIWizardLayout({
    children,
    currentStep,
    title,
    description,
}) {
    return (
        <div className="min-h-[calc(100vh-180px)] bg-slate-50">

            {/* Top */}
            <div className="border-b border-slate-200 bg-white">

                <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">

                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-navy-900"
                    >
                        <ArrowLeft size={16} />
                        Back to RTI Online
                    </Link>

                    <div className="mt-7">
                        <RTIProgress currentStep={currentStep} />
                    </div>

                </div>

            </div>

            {/* Content */}
            <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">

                <div className="mb-8 max-w-2xl">

                    <h1 className="text-3xl font-semibold tracking-tight text-navy-900 sm:text-4xl">
                        {title}
                    </h1>

                    {description && (
                        <p className="mt-3 text-base leading-7 text-slate-500">
                            {description}
                        </p>
                    )}

                </div>

                {children}

            </div>

        </div>
    );
}