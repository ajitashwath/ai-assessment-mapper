"use client";

import { useState } from "react";

type Category = "all" | "question-papers" | "notes" | "worksheets";

const RESOURCES = [
  {
    title: "Mathematics – Class X Question Bank",
    category: "question-papers" as const,
    size: "2.4 MB",
    date: "Aug 20",
    icon: "📘",
    color: "bg-violet-100",
  },
  {
    title: "Physics – Thermodynamics Notes",
    category: "notes" as const,
    size: "1.1 MB",
    date: "Aug 18",
    icon: "📗",
    color: "bg-emerald-100",
  },
  {
    title: "Chemistry – Organic Reactions Worksheet",
    category: "worksheets" as const,
    size: "800 KB",
    date: "Aug 15",
    icon: "📙",
    color: "bg-amber-100",
  },
  {
    title: "Biology – Cell Division MCQ Set",
    category: "question-papers" as const,
    size: "650 KB",
    date: "Aug 12",
    icon: "📕",
    color: "bg-rose-100",
  },
  {
    title: "Mathematics – Quadratic Equations Notes",
    category: "notes" as const,
    size: "960 KB",
    date: "Aug 10",
    icon: "📘",
    color: "bg-violet-100",
  },
  {
    title: "English – Comprehension Worksheets",
    category: "worksheets" as const,
    size: "1.3 MB",
    date: "Aug 8",
    icon: "📓",
    color: "bg-sky-100",
  },
  {
    title: "Physics – Optics Question Bank",
    category: "question-papers" as const,
    size: "1.8 MB",
    date: "Aug 5",
    icon: "📗",
    color: "bg-emerald-100",
  },
  {
    title: "Chemistry – Electrochemistry Notes",
    category: "notes" as const,
    size: "720 KB",
    date: "Aug 2",
    icon: "📙",
    color: "bg-amber-100",
  },
];

const CAT_LABEL: Record<string, string> = {
  all: "All",
  "question-papers": "Question Papers",
  notes: "Notes",
  worksheets: "Worksheets",
};

export function LibraryScreen() {
  const [cat, setCat] = useState<Category>("all");
  const [search, setSearch] = useState("");

  const shown = RESOURCES.filter(
    (r) =>
      (cat === "all" || r.category === cat) &&
      (search === "" || r.title.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">My Library</h1>
            <p className="mt-1 text-[15px] font-medium text-ink-600">
              Your teaching resources, question banks and notes in one place
            </p>
          </div>
          <button className="rounded-full bg-ink-900 px-5 py-2.5 text-sm font-extrabold text-white transition hover:bg-black">
            + Upload Resource
          </button>
        </div>

        {/* Search + filter */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search resources…"
            className="flex-1 rounded-full border border-line bg-white px-4 py-2.5 text-sm font-medium text-ink-900 outline-none placeholder:text-ink-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          />
          <div className="flex gap-2 overflow-x-auto">
            {(["all", "question-papers", "notes", "worksheets"] as Category[]).map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-extrabold transition ${
                  cat === c
                    ? "bg-ink-900 text-white"
                    : "border border-line bg-white text-ink-600 hover:bg-paper"
                }`}
              >
                {CAT_LABEL[c]}
              </button>
            ))}
          </div>
        </div>

        {/* Resource grid */}
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((r) => (
            <div
              key={r.title}
              className="group flex gap-3 rounded-2xl border border-line bg-white p-4 transition hover:shadow-md"
            >
              <div
                className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-2xl ${r.color}`}
              >
                {r.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="line-clamp-2 text-sm font-bold leading-snug">{r.title}</div>
                <div className="mt-1 text-xs font-medium text-ink-600">
                  {CAT_LABEL[r.category]} · {r.size} · {r.date}
                </div>
              </div>
            </div>
          ))}
        </div>

        {shown.length === 0 && (
          <div className="mt-16 text-center text-sm font-semibold text-ink-400">
            No resources found
          </div>
        )}

        <div className="mt-8 rounded-2xl border border-dashed border-ink-400/30 bg-paper/60 p-5 text-center">
          <p className="text-sm font-semibold text-ink-600">
            📂 Cloud sync, sharing with colleagues, and AI-powered resource suggestions — coming soon
          </p>
        </div>
      </div>
    </div>
  );
}
