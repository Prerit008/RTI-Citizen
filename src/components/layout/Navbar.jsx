import { useState } from "react";
import {
    ChevronDown,
    Menu,
    Plus,
    LogIn,
    LogOut,
    User,
    X,
    Languages,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";

const links = [
    { label: "Home", path: "/" },
    { label: "Track Application", path: "/track" },
    { label: "First Appeal", path: "/first-appeal" },
    { label: "Public Authorities", path: "/authorities" },
    { label: "Learn", path: "/learn" },
    { label: "Payment Reconciliation", path: "/payment-reconciliation" },
    { label: "Help", path: "/help" },
];

export default function Navbar() {
    const { user, logout } = useAuth();
    const { activeLanguage, openLanguageModal } = useLanguage();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setUserMenuOpen(false);
        navigate("/login");
    };

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

                {/* Desktop right side */}
                <div className="hidden items-center gap-3 lg:flex">
                    {/* File RTI CTA */}
                    <Link
                        to="/file-rti"
                        className="flex items-center gap-2 rounded-xl bg-rti-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rti-700"
                    >
                        <Plus size={17} />
                        File an RTI
                    </Link>

                    {/* Auth button / user menu */}
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setUserMenuOpen((p) => !p)}
                                className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-navy-900 transition hover:bg-slate-50"
                            >
                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-rti-100 text-xs font-bold text-rti-700">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <span className="max-w-[120px] truncate">{user.name.split(" ")[0]}</span>
                                <ChevronDown size={14} className={`transition ${userMenuOpen ? "rotate-180" : ""}`} />
                            </button>

                            {userMenuOpen && (
                                <div className="absolute right-0 top-full z-50 mt-2 w-52 rounded-xl border border-slate-200 bg-white py-2 shadow-card">
                                    <div className="border-b border-slate-100 px-4 py-2.5">
                                        <p className="text-sm font-semibold text-navy-900">{user.name}</p>
                                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                                    </div>
                                    <Link
                                        to="/dashboard"
                                        onClick={() => setUserMenuOpen(false)}
                                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-navy-900"
                                    >
                                        <User size={15} /> My Dashboard
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                                    >
                                        <LogOut size={15} /> Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-navy-900 transition hover:bg-slate-50"
                        >
                            <LogIn size={17} />
                            Login
                        </Link>
                    )}
                </div>

                {/* Mobile */}
                <div className="flex w-full items-center justify-between py-3 lg:hidden">
                    <span className="text-sm font-semibold text-navy-900">Menu</span>
                    <button
                        onClick={() => setMobileOpen((p) => !p)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={21} /> : <Menu size={21} />}
                    </button>
                </div>

            </div>

            {/* Mobile drawer */}
            {mobileOpen && (
                <div className="border-t border-slate-100 bg-white px-4 pb-5 lg:hidden">
                    <div className="mt-3 space-y-1">
                        {links.map((link) => (
                            <Link
                                key={link.label}
                                to={link.path || "#"}
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-rti-600"
                            >
                                {link.label}
                                {link.dropdown && <ChevronDown size={14} />}
                            </Link>
                        ))}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={() => {
                                openLanguageModal();
                                setMobileOpen(false);
                            }}
                            className="flex w-full items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-navy-900 hover:bg-slate-50"
                        >
                            <div className="flex items-center gap-2">
                                <Languages size={17} className="text-rti-600" />
                                <span>Language: <strong>{activeLanguage.nativeName} ({activeLanguage.name})</strong></span>
                            </div>
                            <span className="text-xs font-semibold text-rti-600">Change</span>
                        </button>
                    </div>

                    <div className="mt-4 flex flex-col gap-3">
                        <Link
                            to="/file-rti"
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center justify-center gap-2 rounded-xl bg-rti-600 py-3 text-sm font-semibold text-white"
                        >
                            <Plus size={17} /> File an RTI
                        </Link>
                        {user ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-medium text-navy-900 hover:bg-slate-50"
                                >
                                    <User size={17} /> My Dashboard
                                </Link>
                                <button
                                    onClick={() => { handleLogout(); setMobileOpen(false); }}
                                    className="flex items-center justify-center gap-2 rounded-xl border border-red-200 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
                                >
                                    <LogOut size={17} /> Sign Out
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-medium text-navy-900 hover:bg-slate-50"
                            >
                                <LogIn size={17} /> Login / Register
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
