import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    FileText,
    Landmark,
    MapPin,
} from "lucide-react";

import { Link, useParams } from "react-router-dom";

import { authorities } from "../data/authorities";

export default function AuthorityDetails() {
    const { id } = useParams();

    const authority = authorities.find(
        (item) => item.id === id
    );

    if (!authority) {
        return (
            <div className="mx-auto max-w-4xl px-4 py-20 text-center">

                <h1 className="text-2xl font-bold text-navy-900">
                    Authority not found
                </h1>

                <Link
                    to="/authorities"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-rti-600"
                >
                    <ArrowLeft size={16} />
                    Back to authorities
                </Link>

            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Header */}
            <section className="bg-white">

                <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">

                    <Link
                        to="/authorities"
                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-navy-900"
                    >
                        <ArrowLeft size={16} />
                        All authorities
                    </Link>

                    <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-start">

                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-rti-50 text-rti-600">
                            <Landmark size={30} />
                        </div>

                        <div>

                            <span className="text-xs font-semibold uppercase tracking-wider text-rti-600">
                                {authority.category}
                            </span>

                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-navy-900">
                                {authority.name}
                            </h1>

                            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
                                {authority.description}
                            </p>

                        </div>

                    </div>

                </div>

            </section>

            {/* Content */}
            <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

                <div className="grid gap-6 lg:grid-cols-[1fr_320px]">

                    <div className="space-y-6">

                        {/* About */}
                        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">

                            <h2 className="text-lg font-semibold text-navy-900">
                                What can you ask this authority?
                            </h2>

                            <p className="mt-2 text-sm leading-7 text-slate-500">
                                You can request records, documents, reports,
                                correspondence and other information held by or
                                under the control of this public authority, subject
                                to the applicable provisions of the RTI Act.
                            </p>

                            <div className="mt-6 grid gap-3 sm:grid-cols-2">

                                {authority.keywords.slice(0, 6).map((keyword) => (
                                    <div
                                        key={keyword}
                                        className="flex items-center gap-3 rounded-xl bg-slate-50 p-3"
                                    >
                                        <CheckCircle2
                                            size={16}
                                            className="shrink-0 text-green-600"
                                        />

                                        <span className="text-sm text-slate-600">
                                            {keyword}
                                        </span>

                                    </div>
                                ))}

                            </div>

                        </section>

                        {/* Filing */}
                        <section className="rounded-3xl border border-rti-100 bg-rti-50 p-6 sm:p-8">

                            <div className="flex gap-4">

                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-rti-600">
                                    <FileText size={20} />
                                </div>

                                <div>

                                    <h2 className="font-semibold text-navy-900">
                                        Ready to request information?
                                    </h2>

                                    <p className="mt-1 text-sm leading-6 text-slate-600">
                                        Start your RTI application with this authority
                                        already selected.
                                    </p>

                                    <Link
                                        to={`/file-rti?authority=${authority.id}`}
                                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-rti-600 px-5 py-3 text-sm font-semibold text-white hover:bg-rti-700"
                                    >
                                        File an RTI
                                        <ArrowRight size={16} />
                                    </Link>

                                </div>

                            </div>

                        </section>

                    </div>

                    {/* Side information */}
                    <aside className="h-fit overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">

                        <div className="border-b border-slate-100 p-6">

                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                Authority information
                            </p>

                        </div>

                        <div className="divide-y divide-slate-100">

                            <div className="flex gap-3 p-6">

                                <MapPin
                                    size={18}
                                    className="mt-0.5 shrink-0 text-slate-400"
                                />

                                <div>

                                    <p className="text-xs text-slate-400">
                                        Coverage
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-navy-900">
                                        Central Government
                                    </p>

                                </div>

                            </div>

                            <div className="flex gap-3 p-6">

                                <CheckCircle2
                                    size={18}
                                    className="mt-0.5 shrink-0 text-green-600"
                                />

                                <div>

                                    <p className="text-xs text-slate-400">
                                        Online filing
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-green-700">
                                        Available
                                    </p>

                                </div>

                            </div>

                        </div>

                    </aside>

                </div>

            </main>

        </div>
    );
}