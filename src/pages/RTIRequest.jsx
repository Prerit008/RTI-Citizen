import { useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    FileText,
    Info,
    Upload,
    X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import RTIWizardLayout from "../components/rti/RTIWizardLayout";
import { useRTIApplication } from "../context/RTIApplicationContext";

export default function RTIRequest() {
    const navigate = useNavigate();

    const {
        application,
        updateSection,
    } = useRTIApplication();

    const request = application.request;

    const [fileName, setFileName] = useState("");

    const update = (field, value) => {
        updateSection("request", {
            [field]: value,
        });
    };

    const handleFile = (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        setFileName(file.name);

        update("attachment", {
            name: file.name,
            size: file.size,
            type: file.type,
        });
    };

    const removeFile = () => {
        setFileName("");
        update("attachment", null);
    };

    const isValid = request.text.trim().length > 10;

    return (
        <RTIWizardLayout
            currentStep={3}
            title="What information do you need?"
            description="Write your request clearly and specifically. You can ask for information held by the selected public authority."
        >

            {/* Selected authority */}
            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5">

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Requesting information from
                </p>

                <p className="mt-1 font-semibold text-navy-900">
                    {application.authority.name}
                </p>

            </div>

            {/* Guidance */}
            <div className="mb-6 flex gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-amber-600">
                    <Info size={19} />
                </div>

                <div>

                    <h2 className="text-sm font-semibold text-amber-950">
                        Keep your request clear
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-amber-900/75">
                        Ask for specific information, records, documents or
                        data. Avoid asking questions that require the authority
                        to create an opinion or explanation.
                    </p>

                </div>

            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">

                {/* Language */}
                <div>

                    <label className="text-sm font-semibold text-navy-900">
                        Request language
                    </label>

                    <div className="mt-3 flex flex-wrap gap-2">

                        {["English", "हिन्दी"].map((language) => {

                            const selected =
                                request.language === language;

                            return (
                                <button
                                    key={language}
                                    type="button"
                                    onClick={() =>
                                        update("language", language)
                                    }
                                    className={`
                    rounded-xl border px-4 py-2.5 text-sm font-medium transition
                    ${selected
                                            ? "border-rti-600 bg-rti-50 text-rti-700"
                                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                                        }
                  `}
                                >
                                    {language}
                                </button>
                            );
                        })}

                    </div>

                </div>

                {/* Request */}
                <div className="mt-7">

                    <div className="flex items-end justify-between gap-4">

                        <label
                            htmlFor="request"
                            className="text-sm font-semibold text-navy-900"
                        >
                            Information requested
                            <span className="ml-1 text-rti-600">*</span>
                        </label>

                        <span className="text-xs text-slate-400">
                            {request.text.length} characters
                        </span>

                    </div>

                    <textarea
                        id="request"
                        rows={10}
                        value={request.text}
                        onChange={(e) =>
                            update("text", e.target.value)
                        }
                        placeholder={
                            "Example:\n\nPlease provide copies of the records relating to..."
                        }
                        className="mt-3 w-full resize-y rounded-2xl border border-slate-300 px-5 py-4 text-sm leading-7 text-navy-900 outline-none placeholder:text-slate-400 focus:border-rti-500 focus:ring-4 focus:ring-rti-50"
                    />

                    <p className="mt-2 text-xs text-slate-400">
                        Be specific about the period, subject, records or
                        information you are seeking.
                    </p>

                </div>

                {/* Attachment */}
                <div className="mt-8 border-t border-slate-100 pt-7">

                    <div>

                        <h3 className="text-sm font-semibold text-navy-900">
                            Supporting document
                            <span className="ml-2 font-normal text-slate-400">
                                Optional
                            </span>
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            Attach a document if it helps explain your request.
                        </p>

                    </div>

                    {!fileName ? (
                        <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center transition hover:border-rti-300 hover:bg-rti-50/30">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm">
                                <Upload size={21} />
                            </div>

                            <p className="mt-4 text-sm font-semibold text-navy-900">
                                Upload a document
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                                Click to browse files
                            </p>

                            <input
                                type="file"
                                className="hidden"
                                onChange={handleFile}
                            />

                        </label>
                    ) : (
                        <div className="mt-4 flex items-center gap-4 rounded-2xl border border-slate-200 p-4">

                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rti-50 text-rti-600">
                                <FileText size={20} />
                            </div>

                            <div className="min-w-0 flex-1">

                                <p className="truncate text-sm font-semibold text-navy-900">
                                    {fileName}
                                </p>

                                <p className="mt-1 text-xs text-slate-400">
                                    Supporting document
                                </p>

                            </div>

                            <button
                                type="button"
                                onClick={removeFile}
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                            >
                                <X size={18} />
                            </button>

                        </div>
                    )}

                </div>

            </div>

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between">

                <Link
                    to="/file-rti/applicant"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-navy-900 hover:bg-slate-50"
                >
                    <ArrowLeft size={17} />
                    Back
                </Link>

                <button
                    type="button"
                    disabled={!isValid}
                    onClick={() =>
                        navigate("/file-rti/review")
                    }
                    className="
            inline-flex items-center gap-2 rounded-xl
            bg-rti-600 px-6 py-3.5
            text-sm font-semibold text-white
            shadow-lg shadow-rti-600/20
            hover:bg-rti-700
            disabled:cursor-not-allowed
            disabled:bg-slate-300
            disabled:shadow-none
          "
                >
                    Review application
                    <ArrowRight size={17} />
                </button>

            </div>

        </RTIWizardLayout>
    );
}