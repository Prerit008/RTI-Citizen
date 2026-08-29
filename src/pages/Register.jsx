import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Eye,
    EyeOff,
    Lock,
    Mail,
    Phone,
    User,
    AlertCircle,
    CheckCircle,
    UserPlus,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import MathCaptcha from "../components/common/MathCaptcha";

// ── Password-strength meter ────────────────────────────────────
function PasswordStrength({ password }) {
    const checks = [
        { label: "At least 8 characters", ok: password.length >= 8 },
        { label: "Uppercase letter", ok: /[A-Z]/.test(password) },
        { label: "Number", ok: /\d/.test(password) },
        { label: "Special character", ok: /[^A-Za-z0-9]/.test(password) },
    ];
    const score = checks.filter((c) => c.ok).length;
    const bar = ["bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-green-500"];
    const label = ["Weak", "Fair", "Good", "Strong"];

    if (!password) return null;

    return (
        <div className="mt-2 space-y-2">
            <div className="flex gap-1">
                {[0, 1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-all ${
                            i < score ? bar[score - 1] : "bg-slate-200"
                        }`}
                    />
                ))}
            </div>
            <p className={`text-xs ${score < 2 ? "text-red-500" : score < 4 ? "text-yellow-600" : "text-green-600"}`}>
                {label[score - 1] ?? "Weak"} password
            </p>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-1">
                {checks.map((c) => (
                    <li
                        key={c.label}
                        className={`flex items-center gap-1 text-xs ${
                            c.ok ? "text-green-600" : "text-slate-400"
                        }`}
                    >
                        <CheckCircle size={12} />
                        {c.label}
                    </li>
                ))}
            </ul>
        </div>
    );
}

// ── Input wrapper ───────────────────────────────────────────────
function Field({ label, id, error, children }) {
    return (
        <div>
            <label
                htmlFor={id}
                className="mb-1.5 block text-sm font-medium text-navy-900"
            >
                {label}
            </label>
            {children}
            {error && (
                <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                    <AlertCircle size={12} />
                    {error}
                </p>
            )}
        </div>
    );
}

// ── Main Register Page ──────────────────────────────────────────
export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [step, setStep] = useState(1); // 1 = personal info, 2 = password + captcha
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [globalError, setGlobalError] = useState("");
    const [loading, setLoading] = useState(false);
    const [captchaOk, setCaptchaOk] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        confirm: "",
    });

    const [errors, setErrors] = useState({});

    const handle = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
        setErrors((er) => ({ ...er, [name]: "" }));
    };

    const onVerifyCaptcha = useCallback((ok) => {
        setCaptchaOk(ok);
        setErrors((er) => ({ ...er, captcha: "" }));
    }, []);

    // ── Validate per step ────────────────────────────────────────
    const validateStep = (s) => {
        const e = {};
        if (s === 1) {
            if (!form.name.trim()) e.name = "Full name is required.";
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                e.email = "Enter a valid email address.";
            if (!/^\d{10}$/.test(form.mobile))
                e.mobile = "Enter a valid 10-digit mobile number.";
        }
        if (s === 2) {
            const passOk =
                form.password.length >= 8 &&
                /[A-Z]/.test(form.password) &&
                /\d/.test(form.password) &&
                /[^A-Za-z0-9]/.test(form.password);
            if (!passOk)
                e.password =
                    "Password must be 8+ chars with uppercase, number & special character.";
            if (form.password !== form.confirm)
                e.confirm = "Passwords do not match.";
            if (!captchaOk)
                e.captcha = "Please solve the security question correctly.";
        }
        return e;
    };

    const next = () => {
        const e = validateStep(step);
        if (Object.keys(e).length) { setErrors(e); return; }
        setStep((s) => s + 1);
    };

    const back = () => setStep((s) => s - 1);

    const submit = async (e) => {
        e.preventDefault();
        const e2 = validateStep(2);
        if (Object.keys(e2).length) { setErrors(e2); return; }

        setLoading(true);
        await new Promise((r) => setTimeout(r, 700));

        const { confirm: _c, ...data } = form;
        const result = register(data);
        setLoading(false);

        if (!result.success) {
            setGlobalError(result.message);
        } else {
            navigate("/dashboard");
        }
    };

    // ── Step indicators ──────────────────────────────────────────
    const steps = ["Personal Info", "Set Password"];

    return (
        <div className="flex min-h-[calc(100vh-180px)] items-center justify-center px-4 py-12">
            <div className="w-full max-w-lg">

                {/* Card */}
                <div className="rounded-2xl border border-slate-200 bg-white px-8 py-10 shadow-card">

                    {/* Header */}
                    <div className="mb-6 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rti-50">
                            <UserPlus size={26} className="text-rti-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-navy-900">
                            Create Citizen Account
                        </h1>
                        <p className="mt-1.5 text-sm text-slate-500">
                            Register to file and manage RTI applications
                        </p>
                    </div>

                    {/* Step progress */}
                    <div className="mb-8 flex items-center gap-2">
                        {steps.map((s, i) => {
                            const num = i + 1;
                            const active = num === step;
                            const done = num < step;
                            return (
                                <div key={s} className="flex flex-1 items-center gap-2">
                                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition ${
                                        done
                                            ? "bg-green-500 text-white"
                                            : active
                                            ? "bg-rti-600 text-white"
                                            : "bg-slate-100 text-slate-400"
                                    }`}>
                                        {done ? <CheckCircle size={14} /> : num}
                                    </div>
                                    <span className={`hidden text-xs sm:inline ${active ? "font-semibold text-navy-900" : "text-slate-400"}`}>
                                        {s}
                                    </span>
                                    {i < steps.length - 1 && (
                                        <div className={`h-px flex-1 ${num < step ? "bg-green-400" : "bg-slate-200"}`} />
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Global error */}
                    {globalError && (
                        <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            <AlertCircle size={16} className="shrink-0" />
                            {globalError}
                        </div>
                    )}

                    <form onSubmit={submit} noValidate>

                        {/* ── Step 1: Personal Info ── */}
                        {step === 1 && (
                            <div className="space-y-5">
                                <Field label="Full Name" id="name" error={errors.name}>
                                    <div className="relative">
                                        <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            value={form.name}
                                            onChange={handle}
                                            placeholder="e.g. Rahul Sharma"
                                            className={`w-full rounded-xl border bg-slate-50 py-3 pl-10 pr-4 text-sm text-navy-900 placeholder-slate-400 transition focus:bg-white focus:outline-none focus:ring-2 ${errors.name ? "border-red-300 focus:border-red-400 focus:ring-red-200" : "border-slate-200 focus:border-rti-500 focus:ring-rti-500/20"}`}
                                        />
                                    </div>
                                </Field>

                                <Field label="Email Address" id="email" error={errors.email}>
                                    <div className="relative">
                                        <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={form.email}
                                            onChange={handle}
                                            placeholder="you@example.com"
                                            className={`w-full rounded-xl border bg-slate-50 py-3 pl-10 pr-4 text-sm text-navy-900 placeholder-slate-400 transition focus:bg-white focus:outline-none focus:ring-2 ${errors.email ? "border-red-300 focus:border-red-400 focus:ring-red-200" : "border-slate-200 focus:border-rti-500 focus:ring-rti-500/20"}`}
                                        />
                                    </div>
                                </Field>

                                <Field label="Mobile Number" id="mobile" error={errors.mobile}>
                                    <div className="relative">
                                        <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            id="mobile"
                                            name="mobile"
                                            type="tel"
                                            maxLength={10}
                                            value={form.mobile}
                                            onChange={handle}
                                            placeholder="9XXXXXXXXX"
                                            className={`w-full rounded-xl border bg-slate-50 py-3 pl-10 pr-4 text-sm text-navy-900 placeholder-slate-400 transition focus:bg-white focus:outline-none focus:ring-2 ${errors.mobile ? "border-red-300 focus:border-red-400 focus:ring-red-200" : "border-slate-200 focus:border-rti-500 focus:ring-rti-500/20"}`}
                                        />
                                    </div>
                                </Field>
                            </div>
                        )}

                        {/* ── Step 2: Password + CAPTCHA ── */}
                        {step === 2 && (
                            <div className="space-y-5">
                                <Field label="Create Password" id="password" error={errors.password}>
                                    <div className="relative">
                                        <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPass ? "text" : "password"}
                                            value={form.password}
                                            onChange={handle}
                                            placeholder="Create a strong password"
                                            className={`w-full rounded-xl border bg-slate-50 py-3 pl-10 pr-11 text-sm text-navy-900 placeholder-slate-400 transition focus:bg-white focus:outline-none focus:ring-2 ${errors.password ? "border-red-300 focus:border-red-400 focus:ring-red-200" : "border-slate-200 focus:border-rti-500 focus:ring-rti-500/20"}`}
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
                                    <PasswordStrength password={form.password} />
                                </Field>

                                <Field label="Confirm Password" id="confirm" error={errors.confirm}>
                                    <div className="relative">
                                        <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            id="confirm"
                                            name="confirm"
                                            type={showConfirm ? "text" : "password"}
                                            value={form.confirm}
                                            onChange={handle}
                                            placeholder="Re-enter password"
                                            className={`w-full rounded-xl border bg-slate-50 py-3 pl-10 pr-11 text-sm text-navy-900 placeholder-slate-400 transition focus:bg-white focus:outline-none focus:ring-2 ${errors.confirm ? "border-red-300 focus:border-red-400 focus:ring-red-200" : "border-slate-200 focus:border-rti-500 focus:ring-rti-500/20"}`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirm((p) => !p)}
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                            aria-label={showConfirm ? "Hide" : "Show"}
                                        >
                                            {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </Field>

                                {/* CAPTCHA */}
                                <MathCaptcha
                                    onVerify={onVerifyCaptcha}
                                    error={errors.captcha}
                                />

                                <p className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-xs text-amber-800">
                                    🔒 Your data is protected under the IT Act, 2000. We do not share your information with any third party.
                                </p>
                            </div>
                        )}

                        {/* ── Navigation buttons ── */}
                        <div className="mt-8 flex gap-3">
                            {step > 1 && (
                                <button
                                    type="button"
                                    onClick={back}
                                    className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                                >
                                    ← Back
                                </button>
                            )}

                            {step < 2 ? (
                                <button
                                    type="button"
                                    onClick={next}
                                    className="flex-1 rounded-xl bg-rti-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-rti-700"
                                >
                                    Continue →
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-rti-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-rti-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading ? (
                                        <>
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                            Creating account…
                                        </>
                                    ) : (
                                        "Create Account"
                                    )}
                                </button>
                            )}
                        </div>
                    </form>

                    {/* Login link */}
                    <p className="mt-6 text-center text-sm text-slate-600">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-semibold text-rti-600 hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
