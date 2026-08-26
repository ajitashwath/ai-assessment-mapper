"use client";

import { useState } from "react";

const CLASSES = [
  { name: "Class X-A", subject: "Mathematics", students: 38, avg: "74%", color: "bg-violet-100 text-violet-700" },
  { name: "Class X-B", subject: "Biology", students: 36, avg: "55%", color: "bg-rose-100 text-rose-700" },
  { name: "Class XI-B", subject: "Physics", students: 34, avg: "68%", color: "bg-amber-100 text-amber-700" },
  { name: "Class XII-A", subject: "Chemistry", students: 32, avg: "81%", color: "bg-emerald-100 text-emerald-700" },
];

const STUDENTS = [
  { name: "Aarav Sharma", roll: "001", score: "82%", grade: "A", avatar: "AS" },
  { name: "Priya Nair", roll: "002", score: "76%", grade: "B+", avatar: "PN" },
  { name: "Rohan Mehta", roll: "003", score: "91%", grade: "A+", avatar: "RM" },
  { name: "Sneha Pillai", roll: "004", score: "63%", grade: "B", avatar: "SP" },
  { name: "Arjun Kapoor", roll: "005", score: "55%", grade: "C+", avatar: "AK" },
  { name: "Divya Rao", roll: "006", score: "88%", grade: "A", avatar: "DR" },
  { name: "Karan Singh", roll: "007", score: "71%", grade: "B+", avatar: "KS" },
  { name: "Meera Joshi", roll: "008", score: "94%", grade: "A+", avatar: "MJ" },
];

const GRADE_COLORS: Record<string, string> = {
  "A+": "bg-good-100 text-good-600",
  "A": "bg-good-100 text-good-600",
  "B+": "bg-warn-100 text-warn-700",
  "B": "bg-warn-100 text-warn-700",
  "C+": "bg-bad-100 text-bad-600",
  "C": "bg-bad-100 text-bad-600",
};

export function ClassroomScreen() {
  const [selected, setSelected] = useState(0);
  const cls = CLASSES[selected];

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <h1 className="text-3xl font-extrabold tracking-tight">My Classroom</h1>
        <p className="mt-1 text-[15px] font-medium text-ink-600">
          Manage your classes and track student progress
        </p>

        {/* Class tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {CLASSES.map((c, i) => (
            <button
              key={c.name}
              onClick={() => setSelected(i)}
              className={`rounded-full px-4 py-2 text-sm font-extrabold transition ${
                selected === i
                  ? "bg-ink-900 text-white shadow-md"
                  : "border border-line bg-white text-ink-700 hover:bg-paper"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Class summary card */}
        <div className="mt-4 flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-white p-5">
          <div
            className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-2xl font-extrabold ${cls.color}`}
          >
            🏫
          </div>
          <div className="flex-1">
            <div className="text-lg font-extrabold">{cls.name}</div>
            <div className="text-sm text-ink-600">{cls.subject}</div>
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-2xl font-extrabold">{cls.students}</div>
              <div className="text-xs text-ink-600">Students</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-extrabold text-brand-500">{cls.avg}</div>
              <div className="text-xs text-ink-600">Avg Score</div>
            </div>
          </div>
        </div>

        {/* Student grid */}
        <div className="mt-6">
          <h2 className="mb-3 text-sm font-extrabold tracking-wide text-ink-600 uppercase">
            Students ({STUDENTS.length})
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {STUDENTS.map((s) => (
              <div
                key={s.roll}
                className="flex flex-col items-center gap-2 rounded-2xl border border-line bg-white p-4 text-center transition hover:shadow-md"
              >
                <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-brand-300 to-brand-600 text-sm font-extrabold text-white">
                  {s.avatar}
                </div>
                <div>
                  <div className="text-sm font-bold">{s.name}</div>
                  <div className="text-xs text-ink-600">Roll #{s.roll}</div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-extrabold">{s.score}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-extrabold ${
                      GRADE_COLORS[s.grade] ?? "bg-paper text-ink-600"
                    }`}
                  >
                    {s.grade}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coming soon note */}
        <div className="mt-8 rounded-2xl border border-dashed border-ink-400/30 bg-paper/60 p-5 text-center">
          <p className="text-sm font-semibold text-ink-600">
            📬 Full classroom management — add students, create sections, send feedback — coming soon
          </p>
        </div>
      </div>
    </div>
  );
}
