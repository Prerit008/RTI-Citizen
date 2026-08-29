import {
    Accessibility,
    Search,
} from "lucide-react";

export default function Header() {
    return (
        <>
            {/* Government utility bar */}
            <div className="bg-navy-900 text-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs sm:px-6 lg:px-8">

                    <div className="flex items-center gap-2">
                        <span className="font-medium">
                            Government of India
                        </span>

                        <span className="hidden text-white/40 sm:inline">
                            |
                        </span>

                        <span className="hidden text-white/70 sm:inline">
                            भारत सरकार
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1.5 hover:text-white/80">
                            <Accessibility size={14} />
                            Accessibility
                        </button>

                        <button className="hover:text-white/80">
                            हिन्दी
                        </button>
                    </div>

                </div>
            </div>

            {/* Main header */}
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">

                    {/* Logo */}
                    <div className="flex items-center gap-4">

                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-50">
                            <span className="text-2xl">
                                🇮🇳
                            </span>
                        </div>

                        <div>
                            <div className="text-xl font-bold tracking-tight text-navy-900">
                                RTI ONLINE
                            </div>

                            <div className="text-xs text-slate-500 sm:text-sm">
                                Right to Information · Government of India
                            </div>
                        </div>

                    </div>

                    {/* Desktop utilities */}
                    <div className="hidden items-center gap-3 md:flex">

                        <button className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
                            A−
                        </button>

                        <button className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
                            A
                        </button>

                        <button className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
                            A+
                        </button>

                        <button className="ml-2 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50">
                            <Search size={19} />
                        </button>

                    </div>

                </div>
            </header>
        </>
    );
}