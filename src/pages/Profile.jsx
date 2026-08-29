import { useState, useEffect } from "react";
import {
    User,
    Mail,
    Phone,
    MapPin,
    ShieldCheck,
    FileCheck,
    Save,
    CheckCircle2,
    AlertCircle,
    ArrowRight,
    Lock,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { INDIAN_LANGUAGES } from "../data/languages";

const INDIAN_STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi (NCT)", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

export default function Profile() {
    const { user, updateProfile } = useAuth();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("personal");
    const [saving, setSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Form state initialized from user profile
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        fatherOrSpouseName: "",
        gender: "male",
        dateOfBirth: "",
        preferredLanguage: "English",
        address: "",
        city: "",
        state: "Delhi (NCT)",
        pincode: "",
        isBPL: false,
        bplCardNumber: "",
        bplState: "Delhi (NCT)",
        bplAuthority: "Food & Civil Supplies Department",
    });

    useEffect(() => {
        if (!user) {
            navigate("/login?redirect=/profile");
            return;
        }

        setFormData({
            name: user.name || "",
            email: user.email || "",
            mobile: user.mobile || "",
            fatherOrSpouseName: user.fatherOrSpouseName || "",
            gender: user.gender || "male",
            dateOfBirth: user.dateOfBirth || "",
            preferredLanguage: user.preferredLanguage || "English",
            address: user.address || "",
            city: user.city || "",
            state: user.state || "Delhi (NCT)",
            pincode: user.pincode || "",
            isBPL: Boolean(user.isBPL),
            bplCardNumber: user.bplCardNumber || "",
            bplState: user.bplState || "Delhi (NCT)",
            bplAuthority: user.bplAuthority || "Food & Civil Supplies Department",
        });
    }, [user, navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setSuccessMessage("");
        setErrorMessage("");

        try {
            const res = await updateProfile(formData);
            if (res.success) {
                setSuccessMessage("Citizen profile updated successfully. Details will automatically auto-fill when filing RTIs.");
                setTimeout(() => setSuccessMessage(""), 5000);
            } else {
                setErrorMessage(res.message || "Failed to update profile.");
            }
        } catch (err) {
            setErrorMessage("An unexpected error occurred while saving profile.");
        } finally {
            setSaving(false);
        }
    };

    if (!user) return null;

    const tabs = [
        { id: "personal", label: "Personal Particulars", icon: User },
        { id: "address", label: "Postal Address", icon: MapPin },
        { id: "bpl", label: "BPL & Statutory Concessions", icon: FileCheck },
        { id: "security", label: "Account & Security", icon: Lock },
    ];

    return (
        <div className="min-h-screen bg-slate-50 py-10">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                {/* ── Profile Header Card ── */}
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
                    <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-slate-900 px-6 py-8 text-white sm:px-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                            <div className="flex items-center gap-5">
                                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-rti-600 text-2xl font-bold text-white shadow-lg ring-4 ring-white/10">
                                    {formData.name.charAt(0).toUpperCase() || "C"}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h1 className="text-2xl font-bold">{formData.name || "Citizen User"}</h1>
                                        <span className="inline-flex items-center gap-1 rounded-full bg-green-500/20 px-2.5 py-0.5 text-xs font-semibold text-green-300 border border-green-400/30">
                                            <ShieldCheck size={13} />
                                            Verified Citizen
                                        </span>
                                    </div>
                                    <p className="mt-1 text-sm text-slate-300 flex items-center gap-4">
                                        <span>{formData.email}</span>
                                        {formData.mobile && <span>· +91 {formData.mobile}</span>}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Link
                                    to="/file-rti"
                                    className="inline-flex items-center gap-2 rounded-xl bg-rti-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-rti-700 transition"
                                >
                                    File an RTI
                                    <ArrowRight size={14} />
                                </Link>
                                <Link
                                    to="/dashboard"
                                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/20 transition"
                                >
                                    My Dashboard
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Auto-fill Notice Banner */}
                    <div className="bg-blue-50/80 border-b border-blue-100 px-6 py-3 sm:px-8 flex items-center justify-between text-xs text-blue-900">
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={16} className="text-blue-600 shrink-0" />
                            <span>These verified profile details are automatically linked to your RTI applications to save filing time.</span>
                        </div>
                        <span className="font-semibold text-blue-700 hidden sm:inline">RTI Rules 2012 Compliant</span>
                    </div>
                </div>

                {/* ── Alert Messages ── */}
                {successMessage && (
                    <div className="mt-6 flex items-center gap-2 rounded-2xl bg-green-50 p-4 text-sm text-green-800 border border-green-200 animate-fadeIn">
                        <CheckCircle2 size={18} className="shrink-0 text-green-600" />
                        <span>{successMessage}</span>
                    </div>
                )}

                {errorMessage && (
                    <div className="mt-6 flex items-center gap-2 rounded-2xl bg-red-50 p-4 text-sm text-red-800 border border-red-200 animate-fadeIn">
                        <AlertCircle size={18} className="shrink-0 text-red-600" />
                        <span>{errorMessage}</span>
                    </div>
                )}

                {/* ── Main Form Container ── */}
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    {/* Navigation Tabs */}
                    <div className="flex gap-2 border-b border-slate-200 overflow-x-auto pb-px">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const active = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-xs sm:text-sm font-semibold transition ${
                                        active
                                            ? "border-rti-600 text-rti-600 bg-white rounded-t-xl"
                                            : "border-transparent text-slate-500 hover:text-navy-900"
                                    }`}
                                >
                                    <Icon size={16} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* ── Tab 1: Personal Particulars ── */}
                    {activeTab === "personal" && (
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-soft space-y-6 animate-fadeIn">
                            <div>
                                <h2 className="text-lg font-bold text-navy-900">Personal &amp; Legal Particulars</h2>
                                <p className="text-xs text-slate-500 mt-1">Official applicant identification details as required under RTI filing regulations.</p>
                            </div>

                            <div className="grid gap-6 sm:grid-cols-2">
                                <div>
                                    <label className="block text-xs font-semibold text-navy-900 mb-1.5">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 outline-none focus:border-rti-500 focus:ring-2 focus:ring-rti-50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-navy-900 mb-1.5">
                                        Father / Spouse / Guardian's Name
                                    </label>
                                    <input
                                        type="text"
                                        name="fatherOrSpouseName"
                                        value={formData.fatherOrSpouseName}
                                        onChange={handleChange}
                                        placeholder="e.g. Shri Ramesh Kumar"
                                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 outline-none focus:border-rti-500 focus:ring-2 focus:ring-rti-50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-navy-900 mb-1.5">
                                        Gender
                                    </label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 outline-none focus:border-rti-500 focus:ring-2 focus:ring-rti-50"
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="transgender">Transgender</option>
                                        <option value="prefer_not_to_say">Prefer not to say</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-navy-900 mb-1.5">
                                        Date of Birth
                                    </label>
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={formData.dateOfBirth}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 outline-none focus:border-rti-500 focus:ring-2 focus:ring-rti-50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-navy-900 mb-1.5">
                                        Preferred Language for RTI Communications
                                    </label>
                                    <select
                                        name="preferredLanguage"
                                        value={formData.preferredLanguage}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 outline-none focus:border-rti-500 focus:ring-2 focus:ring-rti-50"
                                    >
                                        {INDIAN_LANGUAGES.map((l) => (
                                            <option key={l.code} value={l.name}>
                                                {l.name} ({l.nativeName})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── Tab 2: Postal Address ── */}
                    {activeTab === "address" && (
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-soft space-y-6 animate-fadeIn">
                            <div>
                                <h2 className="text-lg font-bold text-navy-900">Permanent Postal Address</h2>
                                <p className="text-xs text-slate-500 mt-1">
                                    Physical address where the Public Authority / CPIO will dispatch certified hardcopy records and Speed Post responses.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-navy-900 mb-1.5">
                                        Street Address / House No. / Apartment *
                                    </label>
                                    <textarea
                                        name="address"
                                        required
                                        rows={3}
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="e.g. Flat No. 402, Royal Palms, Sector 14"
                                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 outline-none focus:border-rti-500 focus:ring-2 focus:ring-rti-50"
                                    />
                                </div>

                                <div className="grid gap-4 sm:grid-cols-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-navy-900 mb-1.5">
                                            City / District *
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            required
                                            value={formData.city}
                                            onChange={handleChange}
                                            placeholder="e.g. New Delhi"
                                            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 outline-none focus:border-rti-500 focus:ring-2 focus:ring-rti-50"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-navy-900 mb-1.5">
                                            State / Union Territory *
                                        </label>
                                        <select
                                            name="state"
                                            required
                                            value={formData.state}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 outline-none focus:border-rti-500 focus:ring-2 focus:ring-rti-50"
                                        >
                                            {INDIAN_STATES.map((st) => (
                                                <option key={st} value={st}>{st}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-navy-900 mb-1.5">
                                            6-Digit PIN Code *
                                        </label>
                                        <input
                                            type="text"
                                            name="pincode"
                                            maxLength={6}
                                            required
                                            value={formData.pincode}
                                            onChange={handleChange}
                                            placeholder="e.g. 110001"
                                            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 font-mono text-sm text-navy-900 outline-none focus:border-rti-500 focus:ring-2 focus:ring-rti-50"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── Tab 3: BPL Concessions ── */}
                    {activeTab === "bpl" && (
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-soft space-y-6 animate-fadeIn">
                            <div>
                                <h2 className="text-lg font-bold text-navy-900">Below Poverty Line (BPL) Statutory Status</h2>
                                <p className="text-xs text-slate-500 mt-1">
                                    Citizens below poverty line are exempted from the ₹10 RTI application fee and photocopy fees under Section 7(5) of the RTI Act 2005.
                                </p>
                            </div>

                            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 cursor-pointer hover:bg-slate-100/70 transition">
                                <input
                                    type="checkbox"
                                    name="isBPL"
                                    checked={formData.isBPL}
                                    onChange={handleChange}
                                    className="h-5 w-5 rounded text-rti-600 focus:ring-rti-500"
                                />
                                <div>
                                    <span className="font-semibold text-navy-900 text-sm block">
                                        I hold a valid Below Poverty Line (BPL) / Antyodaya Ration Card
                                    </span>
                                    <span className="text-xs text-slate-500">
                                        Enable this to automatically apply statutory ₹0 fee exemption when filing RTIs.
                                    </span>
                                </div>
                            </label>

                            {formData.isBPL && (
                                <div className="space-y-4 pt-4 border-t border-slate-100 animate-fadeIn">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div>
                                            <label className="block text-xs font-semibold text-navy-900 mb-1.5">
                                                BPL Card / Certificate Number *
                                            </label>
                                            <input
                                                type="text"
                                                name="bplCardNumber"
                                                required={formData.isBPL}
                                                value={formData.bplCardNumber}
                                                onChange={handleChange}
                                                placeholder="e.g. BPL-MH-2024-987123"
                                                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 font-mono text-sm text-navy-900 outline-none focus:border-rti-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-navy-900 mb-1.5">
                                                Issuing State / UT *
                                            </label>
                                            <select
                                                name="bplState"
                                                value={formData.bplState}
                                                onChange={handleChange}
                                                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 outline-none focus:border-rti-500"
                                            >
                                                {INDIAN_STATES.map((st) => (
                                                    <option key={st} value={st}>{st}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label className="block text-xs font-semibold text-navy-900 mb-1.5">
                                                Issuing Authority *
                                            </label>
                                            <input
                                                type="text"
                                                name="bplAuthority"
                                                value={formData.bplAuthority}
                                                onChange={handleChange}
                                                placeholder="e.g. Tehsildar / Food & Civil Supplies Department"
                                                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 outline-none focus:border-rti-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ── Tab 4: Account & Security ── */}
                    {activeTab === "security" && (
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-soft space-y-6 animate-fadeIn">
                            <div>
                                <h2 className="text-lg font-bold text-navy-900">Account Credentials &amp; Verification</h2>
                                <p className="text-xs text-slate-500 mt-1">Manage your verified login contact channels and security settings.</p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-xs font-semibold text-navy-900 mb-1.5">
                                        Registered Email Address (Locked)
                                    </label>
                                    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-500">
                                        <Mail size={16} className="text-slate-400" />
                                        <span className="font-mono text-xs">{formData.email}</span>
                                        <span className="ml-auto rounded bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700">Verified</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-navy-900 mb-1.5">
                                        Registered Mobile Number *
                                    </label>
                                    <div className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm">
                                        <Phone size={16} className="text-slate-400" />
                                        <span className="text-xs font-semibold text-slate-500">+91</span>
                                        <input
                                            type="tel"
                                            name="mobile"
                                            maxLength={10}
                                            required
                                            value={formData.mobile}
                                            onChange={handleChange}
                                            placeholder="9876543210"
                                            className="w-full bg-transparent text-sm text-navy-900 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── Submit & Action Buttons ── */}
                    <div className="flex items-center justify-between pt-4">
                        <Link
                            to="/dashboard"
                            className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-navy-900 hover:bg-slate-50"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            disabled={saving}
                            className="inline-flex items-center gap-2 rounded-xl bg-rti-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-rti-700 transition disabled:opacity-60"
                        >
                            <Save size={16} />
                            {saving ? "Saving Changes..." : "Save Profile Details"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
