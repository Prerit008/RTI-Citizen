import { useEffect, useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    FileText,
    Landmark,
    MapPin,
    Clock,
    ShieldCheck,
    Mail,
    Phone,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { authorities as fallbackAuthorities } from "../data/authorities";
import { authorityApi } from "../services/api";

export default function AuthorityDetails() {
    const { id } = useParams();
    const [authority, setAuthority] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAuthority = async () => {
            setLoading(true);
            try {
                const res = await authorityApi.getById(id);
                if (res?.data?.authority) {
                    setAuthority(res.data.authority);
                    setLoading(false);
                    return;
                }
            } catch (err) {
                console.warn("Backend authority lookup warning:", err.message);
            }

            const fallback = fallbackAuthorities.find(
                (item) => item.id.toLowerCase() === id?.toLowerCase()
            );
            setAuthority(fallback || null);
            setLoading(false);
        };

        if (id) {
            fetchAuthority();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="mx-auto max-w-4xl px-4 py-20 text-center">
                <p className="text-slate-500">Loading public authority profile...</p>
            </div>
        );
    }

    if (!authority) {
        return (
            <div className="mx-auto max-w-4xl px-4 py-20 text-center">
                <h1 className="text-2xl font-bold text-navy-900">
                    Public Authority not found
                </h1>
                <Link
                    to="/authorities"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-rti-600 hover:text-rti-700"
                >
                    <ArrowLeft size={16} />
                    Back to all authorities
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <section className="bg-white border-b border-slate-200">
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

                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                                    {authority.category}
                                </span>
                                {authority.popular && (
                                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                                        High Filing Volume
                                    </span>
                                )}
                            </div>

                            <h1 className="mt-3 text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
                                {authority.name}
                            </h1>

                            <p className="mt-2 text-base leading-7 text-slate-500">
                                {authority.description}
                            </p>
                        </div>

                        <Link
                            to="/file-rti"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-rti-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-rti-600/20 hover:bg-rti-700 shrink-0"
                        >
                            File RTI to this authority
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Content info */}
            <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="grid gap-6 md:grid-cols-3">
                    {/* Performance metrics */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-2 text-rti-600">
                            <Clock size={20} />
                            <h3 className="font-semibold text-navy-900">Average SLA Speed</h3>
                        </div>
                        <p className="mt-4 text-3xl font-bold text-navy-900">
                            {authority.averageResponseDays || 21} days
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                            Statutory limit: 30 days under RTI Act 2005.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-2 text-green-600">
                            <ShieldCheck size={20} />
                            <h3 className="font-semibold text-navy-900">SLA Compliance</h3>
                        </div>
                        <p className="mt-4 text-3xl font-bold text-green-700">
                            {authority.slaComplianceRate || "93.4%"}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                            Applications resolved within statutory SLA timeline.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-2 text-slate-600">
                            <FileText size={20} />
                            <h3 className="font-semibold text-navy-900">Application Fee</h3>
                        </div>
                        <p className="mt-4 text-2xl font-bold text-navy-900">
                            ₹10
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                            Exempted for Below Poverty Line (BPL) applicants.
                        </p>
                    </div>
                </div>

                {/* PIO & Contact Info */}
                <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <h2 className="text-lg font-bold text-navy-900">
                        Public Information Officer (PIO) & Nodal Office
                    </h2>

                    <div className="mt-6 grid gap-6 sm:grid-cols-2">
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase">Designated PIO</p>
                                <p className="text-sm font-semibold text-navy-900 mt-1">
                                    {authority.nodalOfficer || "Central Public Information Officer (CPIO)"}
                                </p>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Mail size={16} className="text-slate-400" />
                                <span>{authority.email || "cpio@gov.in"}</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Phone size={16} className="text-slate-400" />
                                <span>{authority.phone || "+91-11-23000000"}</span>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase">Office Address</p>
                            <div className="flex items-start gap-2 text-sm text-slate-600 mt-1">
                                <MapPin size={16} className="text-slate-400 shrink-0 mt-0.5" />
                                <span>{authority.address || "Central Secretariat, New Delhi - 110001"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}