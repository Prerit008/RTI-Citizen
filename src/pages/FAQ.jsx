import { useMemo, useState } from "react";

import {
    CheckCircle2,
    ChevronRight,
    HelpCircle,
    Search,
    X,
} from "lucide-react";

import { Link } from "react-router-dom";

import FAQAccordion from "../components/faq/FAQAccordion";

import {
    faqs,
    faqCategories,
} from "../data/faqs";


export default function FAQ() {
    const [query, setQuery] = useState("");
    const [activeCategory, setActiveCategory] =
        useState("general");

    const [openId, setOpenId] = useState(null);

    const filteredFAQs = useMemo(() => {
        const search = query.trim().toLowerCase();

        return faqs.filter((faq) => {
            const matchesCategory =
                activeCategory === "all" ||
                faq.category === activeCategory;

            const matchesSearch =
                !search ||
                faq.question.toLowerCase().includes(search) ||
                faq.answer.toLowerCase().includes(search);

            return matchesCategory && matchesSearch;
        });
    }, [query, activeCategory]);


    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setOpenId(null);
    };


    return (
        <div className="min-h-screen bg-slate-50">

            {/* Hero */}
            <section className="bg-navy-950">

                <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">

                    <div className="mx-auto max-w-3xl text-center">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl">
                            <HelpCircle size={28} />
                        </div>

                        <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-5xl">
                            Frequently asked questions
                        </h1>

                        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 sm:text-lg">
                            Find clear answers about filing RTI applications,
                            payments, appeals, application status and more.
                        </p>

                        {/* Search */}
                        <div className="relative mx-auto mt-8 max-w-2xl">

                            <Search
                                size={20}
                                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                type="search"
                                value={query}
                                onChange={(event) => {
                                    setQuery(event.target.value);
                                    setOpenId(null);
                                }}
                                placeholder="Search your question..."
                                className="h-14 w-full rounded-2xl border border-white/10 bg-white pl-14 pr-12 text-sm text-navy-900 shadow-xl outline-none placeholder:text-slate-400 focus:ring-4 focus:ring-rti-500/30"
                            />

                            {query && (
                                <button
                                    type="button"
                                    onClick={() => setQuery("")}
                                    className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                                    aria-label="Clear search"
                                >
                                    <X size={17} />
                                </button>
                            )}

                        </div>

                    </div>

                </div>

            </section>


            {/* Content */}
            <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">

                <div className="grid gap-8 lg:grid-cols-[220px_1fr]">

                    {/* Category navigation */}
                    <aside className="lg:sticky lg:top-24 lg:h-fit">

                        <p className="mb-3 px-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Browse by topic
                        </p>

                        <nav className="flex gap-2 overflow-x-auto pb-2 lg:block lg:space-y-1 lg:overflow-visible">

                            {faqCategories.map((category) => {

                                const isActive =
                                    activeCategory === category.id;

                                const count = faqs.filter(
                                    (faq) =>
                                        faq.category === category.id
                                ).length;

                                return (
                                    <button
                                        key={category.id}
                                        type="button"
                                        onClick={() =>
                                            handleCategoryChange(
                                                category.id
                                            )
                                        }
                                        className={`
                      flex shrink-0 items-center justify-between
                      gap-3 rounded-xl px-3 py-2.5 text-left
                      text-sm font-medium transition
                      lg:w-full
                      ${isActive
                                                ? "bg-rti-50 text-rti-700"
                                                : "text-slate-600 hover:bg-white hover:text-navy-900"
                                            }
                    `}
                                    >

                                        <span>
                                            {category.label}
                                        </span>

                                        <span
                                            className={`
                        text-xs
                        ${isActive
                                                    ? "text-rti-500"
                                                    : "text-slate-400"
                                                }
                      `}
                                        >
                                            {count}
                                        </span>

                                    </button>
                                );
                            })}

                            <button
                                type="button"
                                onClick={() =>
                                    handleCategoryChange("all")
                                }
                                className={`
                  flex shrink-0 items-center justify-between
                  gap-3 rounded-xl px-3 py-2.5 text-left
                  text-sm font-medium transition
                  lg:w-full
                  ${activeCategory === "all"
                                        ? "bg-rti-50 text-rti-700"
                                        : "text-slate-600 hover:bg-white hover:text-navy-900"
                                    }
                `}
                            >
                                <span>All questions</span>

                                <span className="text-xs text-slate-400">
                                    {faqs.length}
                                </span>
                            </button>

                        </nav>

                    </aside>


                    {/* FAQ content */}
                    <section>

                        {/* Result header */}
                        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

                            <div>

                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    {activeCategory === "all"
                                        ? "All questions"
                                        : faqCategories.find(
                                            (category) =>
                                                category.id ===
                                                activeCategory
                                        )?.label}
                                </p>

                                <h2 className="mt-1 text-xl font-bold text-navy-900">
                                    {query
                                        ? "Search results"
                                        : "How can we help?"}
                                </h2>

                            </div>

                            <p className="text-sm text-slate-400">
                                {filteredFAQs.length}{" "}
                                {filteredFAQs.length === 1
                                    ? "question"
                                    : "questions"}
                            </p>

                        </div>


                        {/* Search result */}
                        {filteredFAQs.length > 0 ? (
                            <div className="space-y-3">

                                {filteredFAQs.map((faq) => (
                                    <FAQAccordion
                                        key={faq.id}
                                        faq={faq}
                                        isOpen={openId === faq.id}
                                        onToggle={() =>
                                            setOpenId(
                                                openId === faq.id
                                                    ? null
                                                    : faq.id
                                            )
                                        }
                                    />
                                ))}

                            </div>
                        ) : (
                            <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center">

                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                                    <Search size={24} />
                                </div>

                                <h3 className="mt-5 text-lg font-semibold text-navy-900">
                                    We couldn't find that
                                </h3>

                                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                                    Try searching with fewer words or choose a
                                    different topic.
                                </p>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setQuery("");
                                        setActiveCategory("all");
                                    }}
                                    className="mt-5 text-sm font-semibold text-rti-600 hover:text-rti-700"
                                >
                                    Clear filters
                                </button>

                            </div>
                        )}

                    </section>

                </div>


                {/* Still need help */}
                <section className="mt-12 overflow-hidden rounded-3xl border border-rti-100 bg-rti-50">

                    <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">

                        <div className="flex gap-4">

                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-rti-600">
                                <HelpCircle size={22} />
                            </div>

                            <div>

                                <h2 className="font-semibold text-navy-900">
                                    Still can't find what you're looking for?
                                </h2>

                                <p className="mt-1 max-w-xl text-sm leading-6 text-slate-600">
                                    Get help with the RTI filing process or find
                                    the public authority responsible for your
                                    subject.
                                </p>

                            </div>

                        </div>

                        <div className="flex flex-wrap gap-3">

                            <Link
                                to="/help"
                                className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-navy-900 shadow-sm hover:bg-slate-50"
                            >
                                Get help
                                <ChevronRight size={15} />
                            </Link>

                            <Link
                                to="/authorities"
                                className="inline-flex items-center gap-2 rounded-xl bg-rti-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rti-700"
                            >
                                Find an authority
                                <ChevronRight size={15} />
                            </Link>

                        </div>

                    </div>

                </section>


                {/* Trust note */}
                <div className="mt-8 flex items-start justify-center gap-2 text-center text-xs leading-5 text-slate-400">

                    <CheckCircle2
                        size={14}
                        className="mt-0.5 shrink-0"
                    />

                    <p>
                        Information shown here is based on the official
                        RTI Online Portal FAQ.
                    </p>

                </div>

            </main>

        </div>
    );
}