import { Check, Clock, FileCheck, Send } from "lucide-react";

export default function RTITimeline({ timeline }) {
    return (
        <div className="relative">

            {timeline.map((item, index) => {

                const isLast = index === timeline.length - 1;

                return (
                    <div
                        key={item.title}
                        className="relative flex gap-4 pb-8 last:pb-0"
                    >

                        {/* Connecting line */}
                        {!isLast && (
                            <div
                                className={`
                  absolute left-[19px] top-10 h-[calc(100%-18px)] w-px
                  ${item.completed
                                        ? "bg-green-500"
                                        : "bg-slate-200"
                                    }
                `}
                            />
                        )}

                        {/* Icon */}
                        <div
                            className={`
                relative z-10 flex h-10 w-10 shrink-0
                items-center justify-center rounded-full border-4 border-white
                ${item.completed
                                    ? "bg-green-600 text-white"
                                    : item.current
                                        ? "bg-rti-600 text-white ring-4 ring-rti-100"
                                        : "bg-slate-100 text-slate-400"
                                }
              `}
                        >
                            {item.completed ? (
                                <Check size={16} strokeWidth={3} />
                            ) : item.current ? (
                                <Clock size={16} />
                            ) : (
                                <FileCheck size={16} />
                            )}
                        </div>

                        {/* Content */}
                        <div className="min-w-0 flex-1 pt-0.5">

                            <div className="flex flex-wrap items-center justify-between gap-2">

                                <h3
                                    className={`
                    text-sm font-semibold
                    ${item.current
                                            ? "text-rti-700"
                                            : item.completed
                                                ? "text-navy-900"
                                                : "text-slate-400"
                                        }
                  `}
                                >
                                    {item.title}
                                </h3>

                                {item.date && (
                                    <span className="text-xs text-slate-400">
                                        {item.date} · {item.time}
                                    </span>
                                )}

                            </div>

                            <p
                                className={`
                  mt-1 text-sm leading-6
                  ${item.completed || item.current
                                        ? "text-slate-500"
                                        : "text-slate-400"
                                    }
                `}
                            >
                                {item.description}
                            </p>

                            {item.current && (
                                <span className="mt-3 inline-flex rounded-full bg-rti-50 px-3 py-1 text-xs font-semibold text-rti-700">
                                    Current status
                                </span>
                            )}

                        </div>

                    </div>
                );
            })}

        </div>
    );
}