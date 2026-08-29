import {
    ChevronDown,
    Menu,
    Plus,
} from "lucide-react";
import { Link } from "react-router-dom";
const links = [
    {
        label: "Home",
        path: "/",
    },
    {
        label: "File RTI",
        path: "/file-rti",
    },
    {
        label: "Track Application",
        path: "/track",
    },
    {
        label: "First Appeal",
        path: "/first-appeal",
    },
    {
        label: "Public Authorities",
        path: "/authorities",
    },
    {
        label: "Learn",
        dropdown: true,
    },
    {
        label: "Help",
        path: "/help",
    },
];

export default function Navbar() {
    return (
        <nav className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Desktop navigation */}
                <div className="hidden items-center gap-1 lg:flex">

                    {links.map((link) => (
                        <Link
                            key={link.label}
                            to={link.path || "#"}
                            className="group flex items-center gap-1 px-4 py-4 text-sm font-medium text-slate-600 transition hover:text-rti-600"
                        >
                            {link.label}

                            {link.dropdown && (
                                <ChevronDown
                                    size={15}
                                    className="transition group-hover:rotate-180"
                                />
                            )}
                        </Link>
                    ))}

                </div>

                {/* CTA */}
                <Link
                    to="/file-rti"
                    className="my-2 hidden items-center gap-2 rounded-xl bg-rti-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rti-700 lg:flex"
                >
                    <Plus size={17} />
                    File an RTI
                </Link>

                {/* Mobile */}
                <div className="flex w-full items-center justify-between py-3 lg:hidden">

                    <span className="text-sm font-semibold text-navy-900">
                        Menu
                    </span>

                    <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200">
                        <Menu size={21} />
                    </button>

                </div>

            </div>
        </nav>
    );
}