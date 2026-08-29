import { ChevronDown } from "lucide-react";

export default function FAQAccordion({
  faq,
  isOpen,
  onToggle,
}) {
  return (
    <div
      className={`
        overflow-hidden rounded-2xl border bg-white
        transition-all duration-200
        ${isOpen
          ? "border-rti-200 shadow-sm"
          : "border-slate-200"
        }
      `}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left sm:px-6"
      >
        <span
          className={`
            text-sm font-semibold leading-6 sm:text-base
            ${isOpen
              ? "text-rti-700"
              : "text-navy-900"
            }
          `}
        >
          {faq.question}
        </span>

        <span
          className={`
            flex h-8 w-8 shrink-0 items-center justify-center
            rounded-full transition
            ${isOpen
              ? "bg-rti-50 text-rti-600"
              : "bg-slate-100 text-slate-500"
            }
          `}
        >
          <ChevronDown
            size={17}
            className={`
              transition-transform duration-200
              ${isOpen ? "rotate-180" : ""}
            `}
          />
        </span>
      </button>

      {isOpen && (
        <div className="px-5 pb-6 sm:px-6">

          <div className="border-t border-slate-100 pt-4">

            <p className="text-sm leading-7 text-slate-600">
              {faq.answer}
            </p>

          </div>

        </div>
      )}
    </div>
  );
}