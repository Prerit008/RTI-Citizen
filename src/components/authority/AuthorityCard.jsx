import {
    ArrowRight,
    CheckCircle2,
    Landmark,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function AuthorityCard({
    authority,
}) {
    return (
        <div className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-rti-200 hover:shadow-soft">

            <div className="flex gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-navy-700 transition group-hover:bg-rti-50 group-hover:text-rti-600">
                    <Landmark size={20} />
                </div>

                <div className="min-w-0 flex-1">

                    <div className="flex items-start justify-between gap-3">

                        <div>

                            <h3 className="font-semibold leading-6 text-navy-900">
                                {authority.name}
                            </h3>

                            <span className="mt-1 inline-block text-xs font-medium text-slate-400">
                                {authority.category}
                            </span>

                        </div>

                        {authority.popular && (
                            <span className="shrink-0 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-semibold text-amber-700">
                                Popular
                            </span>
                        )}

                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                        {authority.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">

                        <span className="flex items-center gap-1.5 text-xs font-medium text-green-600">
                            <CheckCircle2 size={14} />
                            Available online
                        </span>

                        <Link
                            to={`/authorities/${authority.id}`}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-rti-600 hover:text-rti-700"
                        >
                            View
                            <ArrowRight
                                size={15}
                                className="transition group-hover:translate-x-0.5"
                            />
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
}