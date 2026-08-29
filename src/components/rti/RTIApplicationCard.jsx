import {
    ArrowRight,
    Building2,
    CalendarDays,
    FileText,
} from "lucide-react";

import { Link } from "react-router-dom";

import RTIStatusBadge from "./RTIStatusBadge";

export default function RTIApplicationCard({
    application,
}) {
    return (
        <div className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-rti-200 hover:shadow-soft">

            {/* Top */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                <div className="min-w-0">

                    <div className="flex items-center gap-2">

                        <FileText
                            size={17}
                            className="shrink-0 text-slate-400"
                        />

                        <span className="font-mono text-xs font-semibold text-slate-500">
                            {application.id}
                        </span>

                    </div>

                    <h3 className="mt-3 font-semibold leading-6 text-navy-900">
                        {application.subject}
                    </h3>

                </div>

                <RTIStatusBadge
                    type={application.statusType}
                    label={application.status}
                />

            </div>

            {/* Metadata */}
            <div className="mt-5 flex flex-col gap-2 border-t border-slate-100 pt-4 text-sm text-slate-500 sm:flex-row sm:gap-6">

                <span className="flex items-center gap-2">
                    <Building2 size={15} />
                    {application.authority}
                </span>

                <span className="flex items-center gap-2">
                    <CalendarDays size={15} />
                    Submitted {application.submittedOn}
                </span>

            </div>

            {/* Action */}
            <div className="mt-5 flex justify-end">

                <Link
                    to={`/track?registration=${encodeURIComponent(
                        application.id
                    )}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-rti-600 transition hover:text-rti-700"
                >
                    {application.statusType === "response"
                        ? "View response"
                        : "Track application"}

                    <ArrowRight
                        size={15}
                        className="transition group-hover:translate-x-0.5"
                    />
                </Link>

            </div>

        </div>
    );
}