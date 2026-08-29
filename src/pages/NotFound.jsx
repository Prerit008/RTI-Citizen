import { ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex min-h-[60vh] items-center justify-center px-4">

            <div className="text-center">

                <p className="text-sm font-semibold uppercase tracking-wider text-rti-600">
                    404
                </p>

                <h1 className="mt-3 text-4xl font-bold tracking-tight text-navy-900">
                    Page not found
                </h1>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                    The page you're looking for doesn't exist or may have
                    moved.
                </p>

                <div className="mt-7 flex flex-wrap justify-center gap-3">

                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 rounded-xl bg-rti-600 px-5 py-3 text-sm font-semibold text-white hover:bg-rti-700"
                    >
                        <Home size={16} />
                        Go home
                    </Link>

                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-navy-900 hover:bg-slate-50"
                    >
                        <ArrowLeft size={16} />
                        Go back
                    </button>

                </div>

            </div>

        </div>
    );
}