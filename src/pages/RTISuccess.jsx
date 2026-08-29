import {
    Check,
    Copy,
    Download,
    ExternalLink,
    Home,
    Search,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useMemo } from "react";

export default function RTISuccess() {

    const registrationNumber = useMemo(() => {
        const random = Math.floor(
            100000 + Math.random() * 900000
        );

        return `RTI/2026/${random}`;
    }, []);

    const copyNumber = async () => {
        await navigator.clipboard.writeText(
            registrationNumber
        );
    };

    return (
        <div className="min-h-[calc(100vh-180px)] bg-slate-50">

            <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">

                {/* Success */}
                <div className="text-center">

                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">

                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white">
                            <Check size={27} strokeWidth={3} />
                        </div>

                    </div>

                    <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-green-600">
                        Application submitted
                    </p>

                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
                        Your RTI application is on its way
                    </h1>

                    <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-500">
                        Your application has been submitted successfully.
                        Keep your registration number safe — you'll need it
                        to track your application.
                    </p>

                </div>

                {/* Registration number */}
                <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-soft sm:p-8">

                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Registration number
                    </p>

                    <div className="mt-4 flex items-center justify-center gap-3">

                        <p className="font-mono text-2xl font-bold tracking-wide text-navy-900 sm:text-3xl">
                            {registrationNumber}
                        </p>

                        <button
                            type="button"
                            onClick={copyNumber}
                            title="Copy registration number"
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-navy-900"
                        >
                            <Copy size={17} />
                        </button>

                    </div>

                    <p className="mt-4 text-sm text-slate-500">
                        A confirmation will also be sent to your registered
                        contact details.
                    </p>

                </div>

                {/* Actions */}
                <div className="mt-6 grid gap-3 sm:grid-cols-2">

                    <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-navy-900 hover:bg-slate-50"
                    >
                        <Download size={17} />
                        Download acknowledgement
                    </button>

                    <Link
                        to="/track"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-rti-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-rti-600/20 hover:bg-rti-700"
                    >
                        <Search size={17} />
                        Track application
                    </Link>

                </div>

                {/* What's next */}
                <div className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-6 sm:p-7">

                    <div className="flex gap-4">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600">
                            <ExternalLink size={18} />
                        </div>

                        <div>

                            <h2 className="font-semibold text-blue-950">
                                What happens next?
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-blue-900/75">
                                The concerned public authority will process your
                                application according to the RTI Act. You can use
                                your registration number to check its status and
                                view updates.
                            </p>

                        </div>

                    </div>

                </div>

                {/* Home */}
                <div className="mt-8 text-center">

                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-navy-900"
                    >
                        <Home size={16} />
                        Return to RTI Online
                    </Link>

                </div>

            </div>

        </div>
    );
}