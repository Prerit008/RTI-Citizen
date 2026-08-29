import { useState, useEffect, useCallback } from "react";
import { RefreshCw, ShieldCheck } from "lucide-react";

/**
 * Simple arithmetic CAPTCHA — no external service needed.
 *
 * Props:
 *   onVerify(isValid: boolean) – called whenever the user's answer changes.
 *   error – error string passed from parent form validation.
 */
export default function MathCaptcha({ onVerify, error }) {
    const generate = useCallback(() => {
        const ops = ["+", "-", "×"];
        const op = ops[Math.floor(Math.random() * ops.length)];
        let a, b, answer;
        if (op === "+") {
            a = Math.floor(Math.random() * 20) + 1;
            b = Math.floor(Math.random() * 20) + 1;
            answer = a + b;
        } else if (op === "-") {
            a = Math.floor(Math.random() * 20) + 10;
            b = Math.floor(Math.random() * 10) + 1;
            answer = a - b;
        } else {
            a = Math.floor(Math.random() * 9) + 2;
            b = Math.floor(Math.random() * 9) + 2;
            answer = a * b;
        }
        return { a, b, op, answer };
    }, []);

    const [question, setQuestion] = useState(generate);
    const [input, setInput] = useState("");
    const [status, setStatus] = useState("idle"); // idle | correct | wrong

    const refresh = () => {
        setQuestion(generate());
        setInput("");
        setStatus("idle");
        onVerify(false);
    };

    useEffect(() => {
        if (input === "") {
            setStatus("idle");
            onVerify(false);
            return;
        }
        const correct = parseInt(input, 10) === question.answer;
        setStatus(correct ? "correct" : "wrong");
        onVerify(correct);
    }, [input, question.answer, onVerify]);

    const borderCls =
        error
            ? "border-red-300 focus:border-red-400 focus:ring-red-200"
            : status === "correct"
            ? "border-green-400 focus:border-green-500 focus:ring-green-200"
            : status === "wrong"
            ? "border-red-300 focus:border-red-400 focus:ring-red-200"
            : "border-slate-200 focus:border-rti-500 focus:ring-rti-500/20";

    return (
        <div className="space-y-2">
            <label className="mb-1.5 block text-sm font-medium text-navy-900">
                Security Verification
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                {/* Question box */}
                <div className="flex flex-1 items-center gap-2">
                    <ShieldCheck size={16} className="shrink-0 text-rti-600" />
                    <span className="select-none font-mono text-base font-bold tracking-widest text-navy-900">
                        {question.a} {question.op} {question.b} = ?
                    </span>
                </div>

                {/* Refresh */}
                <button
                    type="button"
                    onClick={refresh}
                    title="New question"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-200 hover:text-slate-600"
                >
                    <RefreshCw size={14} />
                </button>
            </div>

            {/* Answer input */}
            <div className="relative">
                <input
                    type="number"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter your answer"
                    className={`w-full rounded-xl border bg-slate-50 py-3 px-4 text-sm text-navy-900 placeholder-slate-400 transition focus:bg-white focus:outline-none focus:ring-2 ${borderCls}`}
                />
                {status === "correct" && (
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-green-600">
                        ✓ Correct
                    </span>
                )}
                {status === "wrong" && input !== "" && (
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-red-500">
                        ✗ Wrong
                    </span>
                )}
            </div>

            {error && (
                <p className="flex items-center gap-1 text-xs text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}
