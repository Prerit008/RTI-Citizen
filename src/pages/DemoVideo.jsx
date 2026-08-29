import { ArrowLeft, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";

const DEMO_VIDEO_URL = "";

export default function DemoVideo() {
    return (
        <div className="min-h-screen bg-slate-50">
            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm font-medium text-rti-600 transition hover:text-rti-700"
                    >
                        <ArrowLeft size={16} />
                        Back to home
                    </Link>

                    <span className="inline-flex items-center gap-2 rounded-full border border-rti-200 bg-rti-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-rti-700">
                        <PlayCircle size={14} />
                        Demo video
                    </span>
                </div>

                <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-card">
                    <div className="border-b border-slate-200 bg-slate-50 px-6 py-5 sm:px-8">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                            Product walkthrough
                        </p>
                        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-navy-900 sm:text-4xl">
                            See our RTI platform in action
                        </h1>
                        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
                            This demo highlights how citizens can file an RTI request, track progress,
                            and manage appeals with transparency and clarity.
                        </p>
                    </div>

                    <div className="p-4 sm:p-6 lg:p-8">
                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-900">
                            <iframe
                                src={DEMO_VIDEO_URL}
                                title="RTI platform demo video"
                                className="aspect-video w-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        </div>

                        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
                            <span>
                                Replace the placeholder sharing URL with your public Google Drive video link.
                            </span>
                            <Link
                                to="/"
                                className="inline-flex items-center justify-center rounded-xl bg-rti-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rti-700"
                            >
                                Explore the platform
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
