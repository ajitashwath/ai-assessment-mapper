"use client";

import { useState } from "react";

type Status = "all" | "pending" | "submitted" | "graded";

const ASSIGNMENTS = [
  {
    title: "Chapter 5 – Algebra Practice",
    class: "Class X-A",
    due: "Aug 28, 2026",
    submitted: 32,
    total: 38,
    status: "pending" as const,
  },
  {
    title: "Thermodynamics – Problem Set 3",
    class: "Class XI-B",
    due: "Aug 25, 2026",
    submitted: 34,
    total: 34,
    status: "submitted" as const,
  },
  {
    title: "Organic Chemistry – Lab Report",
    class: "Class XII-A",
    due: "Aug 20, 2026",
    submitted: 32,
    total: 32,
    status: "graded" as const,
  },
  {
    title: "Cell Biology – MCQ Sheet",
    class: "Class X-B",
    due: "Aug 18, 2026",
    submitted: 36,
    total: 36,
    status: "graded" as const,
  },
  {
    title: "Quadratic Equations – Worksheet",
    class: "Class X-A",
    due: "Sep 2, 2026",
    submitted: 0,
    total: 38,
    status: "pending" as const,
  },
  {
    title: "Newton's Laws – Application Problems",
    class: "Class XI-B",
    due: "Sep 5, 2026",
    submitted: 12,
    total: 34,
    status: "pending" as const,
  },
];

const STATUS_BADGE: Record<string, string> = {
  pending: "bg-warn-100 text-warn-700",
  submitted: "bg-brand-50 text-brand-600",
  graded: "bg-good-100 text-good-600",
};
const STATUS_LABEL: Record<string, string> = {
  pending: "In Progress",
  submitted: "Awaiting Grade",
  graded: "Graded",
};

export function AssignmentsScreen() {
  const [filter, setFilter] = useState<Status>("all");

  const shown = ASSIGNMENTS.filter((a) => filter === "all" || a.status === filter);

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-4xl px-6 py-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Assignments</h1>
            <p className="mt-1 text-[15px] font-medium text-ink-600">
              Track and manage student assignments across all classes
            </p>
          </div>
          <button className="rounded-full bg-ink-900 px-5 py-2.5 text-sm font-extrabold text-white transition hover:bg-black">
            + New Assignment
          </button>
        </div>

        {/* Filter bar */}
        <div className="mt-6 flex flex-wrap gap-2">
          {(["all", "pending", "submitted", "graded"] as Status[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-1.5 text-sm font-extrabold transition capitalize ${
                filter === f
                  ? "bg-ink-900 text-white"
                  : "border border-line bg-white text-ink-600 hover:bg-paper"
              }`}
            >
              {f === "all" ? "All" : STATUS_LABEL[f]}
            </button>
          ))}
        </div>

        {/* Assignment list */}
        <div className="mt-4 space-y-3">
          {shown.map((a) => {
            const pct = a.total > 0 ? Math.round((a.submitted / a.total) * 100) : 0;
            return (
              <div
                key={a.title}
                className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5 transition hover:shadow-md"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-paper text-2xl">
                  📝
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold">{a.title}</span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-extrabold ${STATUS_BADGE[a.status]}`}
                    >
                      {STATUS_LABEL[a.status]}
                    </span>
                  </div>
                  <div className="mt-0.5 text-xs font-medium text-ink-600">
                    {a.class} · Due {a.due}
                  </div>
                  {/* Progress bar */}
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-paper">
                      <div
                        className="h-full rounded-full bg-brand-500 transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="shrink-0 text-[11px] font-bold text-ink-600">
                      {a.submitted}/{a.total}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {shown.length === 0 && (
          <div className="mt-16 text-center text-sm font-semibold text-ink-400">
            No assignments found
          </div>
        )}

        <div className="mt-8 rounded-2xl border border-dashed border-ink-400/30 bg-paper/60 p-5 text-center">
          <p className="text-sm font-semibold text-ink-600">
            🚀 Auto-grading for assignments with AI feedback — coming soon
          </p>
        </div>
      </div>
    </div>
  );
}
