import { useMemo, useState } from "react";

import {
    ArrowRight,
    ChevronDown,
    Landmark,
    Search,
    Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";

import AuthorityCard from "../components/authority/AuthorityCard";

import {
    authorities,
    authorityCategories,
} from "../data/authorities";

export default function Authorities() {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("All");

    const results = useMemo(() => {
        const search = query.trim().toLowerCase();

        return authorities.filter((authority) => {

            const matchesCategory =
                category === "All" ||
                authority.category === category;

            if (!matchesCategory) {
                return false;
            }

            if (!search) {
                return true;
            }

            return (
                authority.name.toLowerCase().includes(search) ||
                authority.description.toLowerCase().includes(search) ||
                authority.category.toLowerCase().includes(search) ||
                authority.keywords.some((keyword) =>
                    keyword.toLowerCase().includes(search)
                )
            );
        });
    }, [query, category]);

    const popularAuthorities = authorities.filter(
        (authority) => authority.popular
    );

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Hero */}
            <section className="bg-navy-950">

                <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">

                    <div className="max-w-3xl">

                        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold">
                            <Landmark size={14} />
                            Public authorities
                        </span>

                        <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
                            Find the right authority
                        </h1>

                        <p className="mt-5 max-w-2xl text-base leading-7 sm:text-lg">
                            Not sure where to file your RTI? Search by department,
                            topic or the kind of information you're looking for.
                        </p>

                    </div>

                    {/* Smart search */}
                    <div className="mt-8 max-w-3xl">

                        <div className="relative">

                            <Search
                                size={20}
                                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                value={query}
                                onChange={(event) =>
                                    setQuery(event.target.value)
                                }
                                placeholder='Try "railway", "scholarship" or "road"...'
                                className="h-14 w-full rounded-2xl border border-white/10 bg-white px-14 text-sm text-navy-900 shadow-xl outline-none placeholder:text-slate-400 focus:ring-4 focus:ring-rti-500/30"
                            />

                        </div>

                        <p className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                            <Sparkles size={13} />
                            You can search using everyday language.
                        </p>

                    </div>

                </div>

            </section>

            <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">

                {/* Smart helper */}
                {!query && category === "All" && (
                    <section className="mb-10 overflow-hidden rounded-3xl border border-rti-100 bg-rti-50">

                        <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-8">

                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-rti-600 shadow-sm">
                                <Sparkles size={24} />
                            </div>

                            <div className="flex-1">

                                <h2 className="font-semibold text-navy-900">
                                    Don't know which authority to choose?
                                </h2>

                                <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
                                    That's okay. Tell us what information you're
                                    looking for and we'll help you narrow it down.
                                </p>

                            </div>

                            <Link
                                to="/file-rti"
                                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-rti-600 px-5 py-3 text-sm font-semibold text-white hover:bg-rti-700"
                            >
                                Start with my question
                                <ArrowRight size={16} />
                            </Link>

                        </div>

                    </section>
                )}

                {/* Filters */}
                <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                        <h2 className="text-xl font-bold text-navy-900">
                            Public authorities
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            {results.length} authorities available
                        </p>

                    </div>

                    <div className="relative">

                        <select
                            value={category}
                            onChange={(event) =>
                                setCategory(event.target.value)
                            }
                            className="h-11 appearance-none rounded-xl border border-slate-300 bg-white py-2 pl-4 pr-10 text-sm font-medium text-navy-900 outline-none focus:border-rti-500 focus:ring-4 focus:ring-rti-50"
                        >
                            {authorityCategories.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>

                        <ChevronDown
                            size={16}
                            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                    </div>

                </div>

                {/* Popular */}
                {!query && category === "All" && (
                    <section className="mb-10">

                        <div className="mb-4">

                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                Frequently used
                            </p>

                            <h2 className="mt-1 text-lg font-semibold text-navy-900">
                                Popular authorities
                            </h2>

                        </div>

                        <div className="grid gap-4 md:grid-cols-2">

                            {popularAuthorities.map((authority) => (
                                <AuthorityCard
                                    key={authority.id}
                                    authority={authority}
                                />
                            ))}

                        </div>

                    </section>
                )}

                {/* Results */}
                <section>

                    {(query || category !== "All") && (
                        <p className="mb-4 text-sm text-slate-500">
                            Showing results
                            {query && (
                                <>
                                    {" "}
                                    for{" "}
                                    <span className="font-semibold text-navy-900">
                                        "{query}"
                                    </span>
                                </>
                            )}
                        </p>
                    )}

                    {results.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-2">
                            {results.map((authority) => (
                                <AuthorityCard
                                    key={authority.id}
                                    authority={authority}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center">

                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                                <Search size={24} />
                            </div>

                            <h3 className="mt-5 font-semibold text-navy-900">
                                No authority found
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                                Try a different department, topic or simpler
                                search term.
                            </p>

                            <button
                                type="button"
                                onClick={() => {
                                    setQuery("");
                                    setCategory("All");
                                }}
                                className="mt-5 text-sm font-semibold text-rti-600 hover:text-rti-700"
                            >
                                Clear search
                            </button>

                        </div>
                    )}

                </section>

            </main>

        </div>
    );
}