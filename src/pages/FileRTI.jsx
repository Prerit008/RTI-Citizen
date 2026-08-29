import { useMemo, useState } from "react";
import {
    ArrowRight,
    Check,
    Landmark,
    Search,
    ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import RTIWizardLayout from "../components/rti/RTIWizardLayout";
import { useRTIApplication } from "../context/RTIApplicationContext";
import { useSearchParams } from "react-router-dom";
import { authorities } from "../data/authorities";

export default function FileRTI() {
    const navigate = useNavigate();

    const {
        application,
        updateSection,
    } = useRTIApplication();

    const [searchParams, setSearchParams] = useSearchParams();

    const [selectedId, setSelectedId] = useState(
        () => searchParams.get("authority") || application.authority?.id || ""
    );

    const selectedAuthority = authorities.find(
        (authority) => authority.id === selectedId
    );

    const [search, setSearch] = useState("");

    const filteredAuthorities = useMemo(() => {
        const value = search.toLowerCase().trim();

        if (!value) {
            return authorities;
        }

        return authorities.filter(
            (authority) =>
                authority.name.toLowerCase().includes(value) ||
                authority.category.toLowerCase().includes(value)
        );
    }, [search]);

    const selectAuthority = (authority) => {
        setSelectedId(authority.id);
        updateSection("authority", {
            id: authority.id,
            name: authority.name,
            ministry: authority.ministry || authority.name,
        });
        setSearchParams({ authority: authority.id });
    };

    const continueToApplicant = () => {
        if (!selectedAuthority?.id) {
            return;
        }

        navigate("/file-rti/applicant");
    };
    return (
        <RTIWizardLayout
            currentStep={1}
            title="Who do you want information from?"
            description="Choose the Central Government public authority that holds the information you're looking for."
        >

            {/* Important notice */}
            <div className="mb-6 flex gap-4 rounded-2xl border border-blue-200 bg-blue-50 p-5">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600">
                    <ShieldCheck size={20} />
                </div>

                <div>
                    <h2 className="text-sm font-semibold text-blue-950">
                        This portal is for Central Government authorities
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-blue-800/80">
                        If your question concerns a State Government department,
                        use the relevant State RTI system instead.
                    </p>
                </div>

            </div>

            {/* Search */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft sm:p-7">

                <label
                    htmlFor="authority"
                    className="block text-sm font-semibold text-navy-900"
                >
                    Search public authorities
                </label>

                <p className="mt-1 text-sm text-slate-500">
                    Search by ministry, department or category.
                </p>

                <div className="relative mt-5">

                    <Search
                        size={19}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        id="authority"
                        type="search"
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                        placeholder="e.g. Railways, Finance, Education..."
                        className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 text-sm text-navy-900 outline-none transition placeholder:text-slate-400 focus:border-rti-500 focus:ring-4 focus:ring-rti-50"
                    />

                </div>

                {/* Results */}
                <div className="mt-5 divide-y divide-slate-100">

                    {filteredAuthorities.length > 0 ? (
                        filteredAuthorities.map((authority) => {

                            const selected =
                                selectedAuthority?.id === authority.id;

                            return (
                                <button
                                    key={authority.id}
                                    type="button"
                                    onClick={() => selectAuthority(authority)}
                                    className={`
                        flex w-full items-center gap-4 rounded-xl px-3 py-4 text-left transition
                        ${selected
                                            ? "bg-rti-50"
                                            : "hover:bg-slate-50"
                                        }
                    `}
                                >

                                    {/* Authority icon */}
                                    <div
                                        className={`
                            flex h-11 w-11 shrink-0 items-center justify-center rounded-xl
                            ${selected
                                                ? "bg-rti-600 text-white"
                                                : "bg-slate-100 text-navy-700"
                                            }
                        `}
                                    >
                                        <Landmark size={20} />
                                    </div>

                                    {/* Authority information */}
                                    <div className="min-w-0 flex-1">

                                        <p className="truncate text-sm font-semibold text-navy-900">
                                            {authority.name}
                                        </p>

                                        <p className="mt-1 text-xs text-slate-500">
                                            {authority.category}
                                        </p>

                                    </div>

                                    {/* Selected indicator */}
                                    {selected && (
                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
                                            <Check size={15} />
                                        </div>
                                    )}

                                </button>
                            );
                        })
                    ) : (
                        <div className="py-10 text-center">

                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                                <Landmark size={20} />
                            </div>

                            <p className="mt-4 font-medium text-navy-900">
                                No authority found
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                                Try a different ministry or department name.
                            </p>

                        </div>
                    )}

                </div>
            </div>

            {/* Selected authority */}
            {selectedAuthority && (
                <div className="mt-4 rounded-2xl border border-rti-100 bg-rti-50 p-4">

                    <p className="text-xs font-semibold uppercase tracking-wider text-rti-600">
                        Selected authority
                    </p>

                    <p className="mt-1 font-semibold text-navy-900">
                        {selectedAuthority.name}
                    </p>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                        {selectedAuthority.description}
                    </p>

                </div>
            )}

            {/* Bottom action */}
            <div className="mt-8 flex items-center justify-between">

                <p className="hidden text-sm text-slate-400 sm:block">
                    You can change this selection later.
                </p>

                <button
                    type="button"
                    disabled={!selectedAuthority?.id}
                    onClick={continueToApplicant}
                    className="
            inline-flex w-full items-center justify-center gap-2
            rounded-xl bg-rti-600 px-6 py-3.5
            text-sm font-semibold text-white
            shadow-lg shadow-rti-600/20
            transition
            hover:bg-rti-700
            disabled:cursor-not-allowed
            disabled:bg-slate-300
            disabled:shadow-none
            sm:w-auto
          "
                >
                    Continue
                    <ArrowRight size={17} />
                </button>

            </div>

        </RTIWizardLayout>
    );
}