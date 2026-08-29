import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Eye,
    EyeOff,
    Lock,
    Mail,
    AlertCircle,
    Info,
    LogIn,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import MathCaptcha from "../components/common/MathCaptcha";

// ── Mock credentials hint panel ────────────────────────────────
function MockCredentialsHint({ onFill }) {
    const [open, setOpen] = useState(false);
    const CREDS = [
        { label: "Citizen 1", email: "rahul@citizen.in", pass: "Citizen@123" },
        { label: "Citizen 2", email: "priya@citizen.in", pass: "India@456" },
    ];
    return (
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
            <button
                onClick={() => setOpen((p) => !p)}
                className="flex w-full items-center gap-2 text-left text-sm font-medium text-blue-700"
            >
                <Info size={16} className="shrink-0" />
                Demo Credentials — click to {open ? "hide" : "view"}
            </button>

            {open && (
                <div className="mt-3 space-y-3">
                    {CREDS.map((c) => (
                        <div
                            key={c.email}
                            className="rounded-lg bg-white px-3 py-2 text-xs text-slate-700 shadow-soft"
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-navy-900">
                                    {c.label}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => onFill(c.email, c.pass)}
                                    className="rounded-md bg-blue-600 px-2 py-0.5 text-xs font-medium text-white hover:bg-blue-700"
                                >
                                    Use this →
                                </button>
                            </div>
                            <div className="mt-1 flex flex-col gap-0.5">
                                <span>
                                    Email:{" "}
                                    <code className="font-mono text-blue-600">
                                        {c.email}
                                    </code>
                                </span>
                                <span>
                                    Password:{" "}
                                    <code className="font-mono text-blue-600">
                                        {c.pass}
                                    </code>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// ── Main Login Page ─────────────────────────────────────────────
export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({ email: "", password: "" });
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [captchaOk, setCaptchaOk] = useState(false);

    const handle = (e) => {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
        setFieldErrors((fe) => ({ ...fe, [e.target.name]: "" }));
    };

    // Called by hint panel "Use this →" button
    const fillCreds = (email, pass) => setForm({ email, password: pass });

    const onVerifyCaptcha = useCallback((ok) => setCaptchaOk(ok), []);

    const submit = async (e) => {
        e.preventDefault();
        setError("");

        const email = form.email.trim();
        const password = form.password.trim();
        const fe = {};

        if (!email) fe.email = "Email is required.";
        if (!password) fe.password = "Password is required.";
        if (!captchaOk) fe.captcha = "Please solve the security question correctly.";

        if (Object.keys(fe).length) {
            setFieldErrors(fe);
            return;
        }

        setLoading(true);
        await new Promise((r) => setTimeout(r, 600));
        const result = login(email, password);
        setLoading(false);

        if (!result.success) {
            setError(result.message);
        } else {
            navigate("/dashboard");
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-180px)] items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">

                {/* Card */}
                <div className="rounded-2xl border border-slate-200 bg-white px-8 py-10 shadow-card">

                    {/* Header */}
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rti-50">
                            <LogIn size={26} className="text-rti-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-navy-900">
                            Citizen Login
                        </h1>
                        <p className="mt-1.5 text-sm text-slate-500">
                            Sign in to file or track your RTI applications
                        </p>
                    </div>

                    {/* Demo hint */}
                    <MockCredentialsHint onFill={fillCreds} />

                    {/* Global error */}
                    {error && (
                        <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            <AlertCircle size={16} className="shrink-0" />
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={submit} noValidate className="mt-6 space-y-5">

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-1.5 block text-sm font-medium text-navy-900"
                            >
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail
                                    size={16}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                                />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={form.email}
                                    onChange={handle}
                                    placeholder="you@example.com"
                                    className={`w-full rounded-xl border bg-slate-50 py-3 pl-10 pr-4 text-sm text-navy-900 placeholder-slate-400 transition focus:bg-white focus:outline-none focus:ring-2 ${fieldErrors.email ? "border-red-300 focus:border-red-400 focus:ring-red-200" : "border-slate-200 focus:border-rti-500 focus:ring-rti-500/20"}`}
                                />
                            </div>
                            {fieldErrors.email && (
                                <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                                    <AlertCircle size={12} /> {fieldErrors.email}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <div className="mb-1.5 flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="text-sm font-medium text-navy-900"
                                >
                                    Password
                                </label>
                                <button
                                    type="button"
                                    className="text-xs font-medium text-rti-600 hover:underline"
                                    onClick={() =>
                                        alert(
                                            "Password reset via OTP is not available in this demo."
                                        )
                                    }
                                >
                                    Forgot password?
                                </button>
                            </div>
                            <div className="relative">
                                <Lock
                                    size={16}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                                />
                                <input
                                    id="password"
                                    name="password"
                                    type={showPass ? "text" : "password"}
                                    autoComplete="current-password"
                                    value={form.password}
                                    onChange={handle}
                                    placeholder="Enter your password"
                                    className={`w-full rounded-xl border bg-slate-50 py-3 pl-10 pr-11 text-sm text-navy-900 placeholder-slate-400 transition focus:bg-white focus:outline-none focus:ring-2 ${fieldErrors.password ? "border-red-300 focus:border-red-400 focus:ring-red-200" : "border-slate-200 focus:border-rti-500 focus:ring-rti-500/20"}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass((p) => !p)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    aria-label={showPass ? "Hide password" : "Show password"}
                                >
                                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            {fieldErrors.password && (
                                <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                                    <AlertCircle size={12} /> {fieldErrors.password}
                                </p>
                            )}
                        </div>

                        {/* CAPTCHA */}
                        <MathCaptcha
                            onVerify={onVerifyCaptcha}
                            error={fieldErrors.captcha}
                        />

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-rti-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-rti-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? (
                                <>
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    Signing in…
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-3">
                        <span className="h-px flex-1 bg-slate-200" />
                        <span className="text-xs text-slate-400">or</span>
                        <span className="h-px flex-1 bg-slate-200" />
                    </div>

                    {/* Register link */}
                    <p className="text-center text-sm text-slate-600">
                        New to RTI Online?{" "}
                        <Link
                            to="/register"
                            className="font-semibold text-rti-600 hover:underline"
                        >
                            Create an account
                        </Link>
                    </p>
                </div>

                {/* Footer note */}
                <p className="mt-5 text-center text-xs text-slate-400">
                    By continuing you agree to the{" "}
                    <span className="text-slate-500 underline">Terms of Use</span>{" "}
                    &amp;{" "}
                    <span className="text-slate-500 underline">Privacy Policy</span>{" "}
                    of the Government of India.
                </p>
            </div>
        </div>
    );
}