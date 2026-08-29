const steps = [
    {
        number: 1,
        label: "Authority",
    },
    {
        number: 2,
        label: "Your details",
    },
    {
        number: 3,
        label: "Request",
    },
    {
        number: 4,
        label: "Review",
    },
    {
        number: 5,
        label: "Payment",
    },
];

export default function RTIProgress({ currentStep = 1 }) {
    return (
        <div className="w-full">

            {/* Desktop */}
            <div className="hidden items-center md:flex">

                {steps.map((step, index) => {
                    const completed = step.number < currentStep;
                    const active = step.number === currentStep;

                    return (
                        <div
                            key={step.number}
                            className="flex flex-1 items-center"
                        >

                            <div className="flex items-center gap-3">

                                <div
                                    className={`
                    flex h-9 w-9 shrink-0 items-center
                    justify-center rounded-full text-sm font-semibold
                    transition
                    ${completed
                                            ? "bg-green-600 text-white"
                                            : active
                                                ? "bg-rti-600 text-white ring-4 ring-rti-100"
                                                : "bg-slate-100 text-slate-500"
                                        }
                  `}
                                >
                                    {completed ? "✓" : step.number}
                                </div>

                                <span
                                    className={`
                    whitespace-nowrap text-sm font-medium
                    ${active
                                            ? "text-navy-900"
                                            : completed
                                                ? "text-green-700"
                                                : "text-slate-400"
                                        }
                  `}
                                >
                                    {step.label}
                                </span>

                            </div>

                            {index < steps.length - 1 && (
                                <div
                                    className={`
                    mx-4 h-px flex-1
                    ${completed
                                            ? "bg-green-500"
                                            : "bg-slate-200"
                                        }
                  `}
                                />
                            )}

                        </div>
                    );
                })}

            </div>

            {/* Mobile */}
            <div className="md:hidden">

                <div className="flex items-center justify-between">

                    <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                            Step {currentStep} of {steps.length}
                        </p>

                        <p className="mt-1 text-sm font-semibold text-navy-900">
                            {steps[currentStep - 1].label}
                        </p>
                    </div>

                    <div className="text-sm font-semibold text-rti-600">
                        {Math.round(
                            (currentStep / steps.length) * 100
                        )}
                        %
                    </div>

                </div>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">

                    <div
                        className="h-full rounded-full bg-rti-600 transition-all"
                        style={{
                            width: `${(currentStep / steps.length) * 100}%`,
                        }}
                    />

                </div>

            </div>

        </div>
    );
}