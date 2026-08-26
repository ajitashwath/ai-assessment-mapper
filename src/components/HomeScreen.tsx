"use client";

const STATS = [
  { label: "Total Students", value: "124", icon: "👨‍🎓", color: "from-violet-500/20 to-violet-500/5", border: "border-violet-200" },
  { label: "Exams This Month", value: "8", icon: "📋", color: "from-brand-500/20 to-brand-500/5", border: "border-brand-200" },
  { label: "Avg Score", value: "74%", icon: "📈", color: "from-emerald-500/20 to-emerald-500/5", border: "border-emerald-200" },
  { label: "Pending Reviews", value: "3", icon: "⏳", color: "from-amber-500/20 to-amber-500/5", border: "border-amber-200" },
];

const RECENT = [
  { subject: "Mathematics – Chapter 5", class: "Class X-A", date: "Aug 24", score: "72%", badge: "bg-good-100 text-good-600" },
  { subject: "Physics – Thermodynamics", class: "Class XI-B", date: "Aug 22", score: "68%", badge: "bg-warn-100 text-warn-700" },
  { subject: "Chemistry – Organic", class: "Class XII-A", date: "Aug 20", score: "81%", badge: "bg-good-100 text-good-600" },
  { subject: "Biology – Cell Biology", class: "Class X-B", date: "Aug 18", score: "55%", badge: "bg-bad-100 text-bad-600" },
];

const QUICK = [
  { icon: "📤", label: "Grade New Exam", sub: "Upload & auto-grade", color: "bg-ink-900 text-white", href: "exams" },
  { icon: "📚", label: "My Library", sub: "Browse resources", color: "bg-white border border-line text-ink-900", href: "library" },
  { icon: "🏫", label: "My Classroom", sub: "View students", color: "bg-white border border-line text-ink-900", href: "classroom" },
  { icon: "📝", label: "Assignments", sub: "Track submissions", color: "bg-white border border-line text-ink-900", href: "assignments" },
];

export function HomeScreen({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-5xl px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Good afternoon, <span className="text-brand-500">Madhur</span> 👋
          </h1>
          <p className="mt-1 text-[15px] font-medium text-ink-600">
            Here's what's happening with your classes today
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className={`rounded-2xl border ${s.border} bg-gradient-to-br ${s.color} p-4`}
            >
              <span className="text-3xl">{s.icon}</span>
              <div className="mt-3 text-3xl font-extrabold tracking-tight">{s.value}</div>
              <div className="mt-0.5 text-xs font-semibold text-ink-600">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="mb-3 text-sm font-extrabold tracking-wide text-ink-600 uppercase">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {QUICK.map((q) => (
              <button
                key={q.label}
                onClick={() => onNavigate(q.href)}
                className={`flex flex-col items-start gap-2 rounded-2xl p-4 text-left transition hover:scale-[1.02] active:scale-100 ${q.color}`}
              >
                <span className="text-2xl">{q.icon}</span>
                <span>
                  <span className="block text-sm font-extrabold">{q.label}</span>
                  <span className="block text-xs opacity-70">{q.sub}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Exams */}
        <div className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-extrabold tracking-wide text-ink-600 uppercase">
              Recent Exams
            </h2>
            <button
              onClick={() => onNavigate("exams")}
              className="text-xs font-bold text-brand-600 hover:underline"
            >
              View all →
            </button>
          </div>
          <div className="overflow-hidden rounded-2xl border border-line bg-white">
            {RECENT.map((r, i) => (
              <div
                key={r.subject}
                className={`flex items-center gap-4 px-5 py-4 ${
                  i < RECENT.length - 1 ? "border-b border-line" : ""
                }`}
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-paper text-xl">
                  📋
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-bold">{r.subject}</div>
                  <div className="text-xs font-medium text-ink-600">
                    {r.class} · {r.date}
                  </div>
                </div>
                <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-extrabold ${r.badge}`}>
                  {r.score}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Tip */}
        <div className="mt-6 flex items-start gap-4 rounded-2xl border border-brand-200 bg-gradient-to-r from-brand-50 to-white p-5">
          <span className="text-3xl">✨</span>
          <div>
            <div className="text-sm font-extrabold text-ink-900">AI Insight</div>
            <p className="mt-0.5 text-sm text-ink-600">
              Class X-B's average in Biology dropped 12% this month. Consider a remedial session on
              Cell Biology before the next assessment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
