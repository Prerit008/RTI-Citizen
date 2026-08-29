import {
    CheckCircle2,
    Clock3,
    FileCheck2,
} from "lucide-react";

const statusConfig = {
    active: {
        label: "With Public Authority",
        icon: Clock3,
        classes: "bg-amber-50 text-amber-700 border-amber-200",
    },

    response: {
        label: "Response Ready",
        icon: CheckCircle2,
        classes: "bg-green-50 text-green-700 border-green-200",
    },

    closed: {
        label: "Closed",
        icon: FileCheck2,
        classes: "bg-slate-100 text-slate-600 border-slate-200",
    },
};

export default function RTIStatusBadge({
    type,
    label,
}) {
    const config =
        statusConfig[type] || statusConfig.active;

    const Icon = config.icon;

    return (
        <span
            className={`
        inline-flex items-center gap-1.5 rounded-full
        border px-2.5 py-1 text-xs font-semibold
        ${config.classes}
      `}
        >
            <Icon size={13} />
            {label || config.label}
        </span>
    );
}