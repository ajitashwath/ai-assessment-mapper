"use client";

import {
  IconAssignments,
  IconChevronsRight,
  IconClassroom,
  IconExams,
  IconGrid,
  IconLibrary,
  IconPanel,
  IconSettings,
  IconSparkle,
  LogoMark,
} from "./icons";

export function SchoolCrest({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5l8-3z"
        fill="#EAF4EC"
        stroke="#2F7D45"
        strokeWidth="1.2"
      />
      <circle cx="12" cy="10" r="3.2" fill="none" stroke="#2F7D45" strokeWidth="1.1" />
      <path d="M12 13.2v4.3M9.3 15.5l5.4 0" stroke="#2F7D45" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

export type NavPage = "home" | "classroom" | "assignments" | "exams" | "library";

const NAV: { icon: React.FC<{ className?: string }>; label: string; page: NavPage; emoji: string }[] = [
  { icon: IconGrid, label: "Home", page: "home", emoji: "⊞" },
  { icon: IconClassroom, label: "My Classroom", page: "classroom", emoji: "🏫" },
  { icon: IconAssignments, label: "Assignments", page: "assignments", emoji: "📝" },
  { icon: IconExams, label: "Exams", page: "exams", emoji: "📋" },
  { icon: IconLibrary, label: "My Library", page: "library", emoji: "📚" },
];

export function Sidebar({
  collapsed,
  activePage,
  onToggle,
  onNavigate,
  onOpenSettings,
}: {
  collapsed: boolean;
  activePage: NavPage;
  onToggle: () => void;
  onNavigate: (page: NavPage) => void;
  onOpenSettings: () => void;
}) {
  return (
    <>
      {/* ─── Desktop Sidebar ───────────────────────────────── */}
      <aside className="hidden shrink-0 lg:block">
        {collapsed ? (
          /* ── Collapsed ── */
          <div className="mt-3 ml-3 flex h-[calc(100dvh-24px)] w-[76px] flex-col items-center gap-3 rounded-2xl border border-line bg-white p-3 shadow-[var(--shadow-card)]">
            <LogoMark className="mt-1 h-9 w-9 shrink-0" />

            {/* AI Toolkit pill */}
            <button
              onClick={() => onNavigate("exams")}
              title="AI Teacher's Toolkit"
              className="grid h-10 w-10 place-items-center rounded-full bg-ink-900 ring-2 ring-brand-500 transition hover:bg-ink-800"
            >
              <IconSparkle className="h-4 w-4 text-brand-400" />
            </button>

            <div className="my-0.5 h-px w-8 rounded-full bg-line" />

            {/* Nav items */}
            <nav className="flex flex-col items-center gap-1">
              {NAV.map(({ icon: Icon, label, page }) => {
                const active = activePage === page;
                return (
                  <button
                    key={page}
                    title={label}
                    onClick={() => onNavigate(page)}
                    className={`grid h-10 w-10 place-items-center rounded-xl transition-all ${
                      active
                        ? "bg-paper text-ink-900"
                        : "text-ink-500 hover:bg-paper/70 hover:text-ink-900"
                    }`}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </button>
                );
              })}
            </nav>

            <div className="flex-1" />

            <button
              onClick={onOpenSettings}
              title="Settings"
              className="grid h-10 w-10 place-items-center rounded-xl text-ink-500 transition hover:bg-paper hover:text-ink-900"
            >
              <IconSettings className="h-[18px] w-[18px]" />
            </button>

            {/* School badge */}
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-paper">
              <SchoolCrest className="h-5 w-5" />
            </div>

            {/* Expand button */}
            <button
              onClick={onToggle}
              title="Expand sidebar"
              className="grid h-8 w-8 place-items-center rounded-full border border-line text-ink-500 transition hover:border-brand-500 hover:bg-brand-50 hover:text-brand-600"
            >
              <IconChevronsRight className="h-4 w-4" />
            </button>
          </div>
        ) : (
          /* ── Expanded ── */
          <div className="mt-3 ml-3 flex h-[calc(100dvh-24px)] w-[260px] flex-col rounded-2xl border border-line bg-white p-4 shadow-[var(--shadow-card)]">
            {/* Logo row */}
            <div className="flex items-center gap-2.5 px-1">
              <LogoMark className="h-9 w-9 shrink-0" />
              <span className="text-[19px] font-extrabold tracking-tight text-ink-900">VedaAI</span>
              <button
                onClick={onToggle}
                title="Collapse sidebar"
                className="ml-auto grid h-8 w-8 place-items-center rounded-full text-ink-500 transition hover:bg-paper hover:text-ink-900"
              >
                <IconPanel className="h-[18px] w-[18px]" />
              </button>
            </div>

            {/* AI Toolkit CTA */}
            <button
              onClick={() => onNavigate("exams")}
              className="mt-8 flex items-center justify-center gap-2 rounded-full bg-ink-900 py-2.5 text-sm font-extrabold text-white ring-2 ring-brand-500 transition hover:bg-ink-800"
            >
              <IconSparkle className="h-3.5 w-3.5 text-brand-400" />
              AI Teacher&apos;s Toolkit
            </button>

            {/* Nav */}
            <nav className="mt-6 flex flex-col gap-1">
              {NAV.map(({ icon: Icon, label, page }) => {
                const active = activePage === page;
                return (
                  <button
                    key={page}
                    onClick={() => onNavigate(page)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
                      active
                        ? "bg-paper text-ink-900"
                        : "text-ink-500 hover:bg-paper/70 hover:text-ink-900"
                    }`}
                  >
                    <Icon className="h-[18px] w-[18px] shrink-0 text-inherit" />
                    <span className="flex-1 text-left">{label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="flex-1" />

            {/* Settings */}
            <button
              onClick={onOpenSettings}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-ink-600 transition hover:bg-paper hover:text-ink-900"
            >
              <IconSettings className="h-[18px] w-[18px] shrink-0 text-ink-500" />
              Settings
            </button>

            {/* School card */}
            <div className="mt-2 flex items-center gap-3 rounded-xl bg-paper p-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white ring-1 ring-line">
                <SchoolCrest className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-[13px] font-extrabold text-ink-900">Delhi Public School</div>
                <div className="truncate text-[11px] font-medium text-ink-500">Bokaro Steel City</div>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* ─── Mobile Bottom Nav ─────────────────────────────── */}
      <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-line bg-white/90 backdrop-blur-md pb-safe lg:hidden">
        {NAV.map(({ icon: Icon, label, page }) => {
          const active = activePage === page;
          return (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              className={`flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[9px] font-extrabold uppercase tracking-wide transition ${
                active ? "text-brand-500" : "text-ink-400 hover:text-ink-700"
              }`}
            >
              <Icon className={`h-5 w-5 ${active ? "text-brand-500" : ""}`} />
              {label.split(" ").slice(-1)[0]}
            </button>
          );
        })}
        <button
          onClick={onOpenSettings}
          className="flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[9px] font-extrabold uppercase tracking-wide text-ink-400 transition hover:text-ink-700"
        >
          <IconSettings className="h-5 w-5" />
          Settings
        </button>
      </nav>
    </>
  );
}
