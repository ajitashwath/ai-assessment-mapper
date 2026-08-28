"use client";

import { IconCheck, SparkleGlyph } from "./icons";

const STEPS = ["Extracting questions", "Extracting handwritten answers", "Mapping answers & grading"];

export function LoadingScreen({ step }: { step: number }) {
  return (
    <div className="grid h-full place-items-center p-6">
      <div className="flex flex-col items-center text-center">
        {/* Animated icon */}
        <div className="relative mb-6">
          <div className="h-16 w-16 animate-[sparkle_1.6s_ease-in-out_infinite]">
            <SparkleGlyph className="h-16 w-16" />
          </div>
        </div>

        <h2 className="text-2xl font-extrabold tracking-tight text-ink-900">Extracting…</h2>
        <p className="mt-1 text-[15px] font-medium text-ink-500">This may take a while</p>

        {/* Step list */}
        <div className="mt-6 flex flex-col items-start gap-2">
          {STEPS.map((label, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <div key={label} className="flex items-center gap-2 text-left">
                <span className="grid h-4 w-4 shrink-0 place-items-center">
                  {done ? (
                    <IconCheck className="h-4 w-4 text-good-600" />
                  ) : active ? (
                    <span className="h-3 w-3 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-ink-200" />
                  )}
                </span>
                <span
                  className={`text-sm font-bold ${
                    done ? "text-good-600" : active ? "text-ink-900" : "text-ink-400"
                  }`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
