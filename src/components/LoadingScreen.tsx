"use client";

import { IconCheck, SparkleGlyph } from "./icons";

const STEPS = [
  "Extracting questions",
  "Extracting handwritten answers",
  "Mapping answers & grading",
];

export function LoadingScreen({ step }: { step: number }) {
  return (
    <div className="grid h-full place-items-center p-6">
      <div className="flex flex-col items-center text-center">
        <SparkleGlyph className="h-24 w-24 animate-[sparkle_1.6s_ease-in-out_infinite]" />
        <h2 className="mt-6 text-3xl font-extrabold tracking-tight">Extracting…</h2>
        <p className="mt-1.5 text-[15px] font-medium text-ink-600">This may take a while</p>
        <ul className="mt-7 flex flex-col gap-2.5 text-sm font-bold">
          {STEPS.map((s, i) => (
            <li
              key={s}
              className={
                "flex items-center gap-2.5 " +
                (i < step ? "text-good-600" : i === step ? "text-ink-900" : "text-ink-400")
              }
            >
              {i < step ? (
                <IconCheck className="h-4.5 w-4.5" />
              ) : i === step ? (
                <span className="h-4.5 w-4.5 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
              ) : (
                <span className="h-4.5 w-4.5 rounded-full border-2 border-current opacity-40" />
              )}
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
