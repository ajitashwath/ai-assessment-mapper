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

export type NavPage = "home" | "classroom" | "assignments" | "exams" | "library";

const NAV: { icon: React.FC<{ className?: string }>; label: string; page: NavPage }[] = [
  { icon: IconGrid, label: "Home", page: "home" },
  { icon: IconClassroom, label: "My Classroom", page: "classroom" },
  { icon: IconAssignments, label: "Assignments", page: "assignments" },
  { icon: IconExams, label: "Exams", page: "exams" },
  { icon: IconLibrary, label: "My Library", page: "library" },
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
      {/* Desktop sidebar */}
      <aside className="hidden shrink-0 lg:block">
        {collapsed ? (
          /* ── Collapsed (icon-only) ── */
          <div className="mt-3 ml-3 flex h-[calc(100dvh-24px)] w-[84px] flex-col items-center gap-4 rounded-2xl border border-line bg-white p-3">
            <LogoMark className="h-10 w-10" />
            <button
              onClick={() => onNavigate("exams")}
              className="grid h-11 w-11 place-items-center rounded-full bg-ink-900 ring-2 ring-brand-500 transition hover:bg-black"
              title="AI Teacher's Toolkit"
            >
              <IconSparkle className="h-4.5 w-4.5 text-brand-400" />
            </button>
            <nav className="mt-1 flex flex-col items-center gap-1.5">
              {NAV.map(({ icon: Icon, label, page }) => (
                <button
                  key={page}
                  title={label}
                  onClick={() => onNavigate(page)}
                  className={
                    "grid h-11 w-11 place-items-center rounded-xl transition " +
                    (activePage === page
                      ? "bg-[#EFECE8] text-ink-900 shadow-sm"
                      : "text-ink-600 hover:bg-paper")
                  }
                >
                  <Icon className="h-5 w-5" />
                </button>
              ))}
            </nav>
            <div className="flex-1" />
            <button
              onClick={onOpenSettings}
              title="Settings"
              className="grid h-11 w-11 place-items-center rounded-xl text-ink-600 transition hover:bg-paper"
            >
              <IconSettings className="h-5 w-5" />
            </button>
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-paper text-lg">🏛️</div>
            <button
              onClick={onToggle}
              title="Expand sidebar"
              className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink-600 transition hover:bg-paper"
            >
              <IconChevronsRight className="h-4.5 w-4.5" />
            </button>
          </div>
        ) : (
          /* ── Expanded ── */
          <div className="mt-3 ml-3 flex h-[calc(100dvh-24px)] w-[264px] flex-col rounded-2xl border border-line bg-white p-4">
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-10 w-10" />
              <span className="text-xl font-extrabold tracking-tight">VedaAI</span>
              <button
                onClick={onToggle}
                title="Collapse sidebar"
                className="ml-auto grid h-9 w-9 place-items-center rounded-full text-ink-600 transition hover:bg-paper"
              >
                <IconPanel className="h-5 w-5" />
              </button>
            </div>

            <button
              onClick={() => onNavigate("exams")}
              className="mt-5 flex items-center justify-center gap-2 rounded-full bg-ink-900 py-3 text-sm font-extrabold text-white ring-2 ring-brand-500 transition hover:bg-black"
            >
              <IconSparkle className="h-4 w-4 text-brand-400" />
              AI Teacher&apos;s Toolkit
            </button>

            <nav className="mt-6 flex flex-col gap-1">
              {NAV.map(({ icon: Icon, label, page }) => (
                <button
                  key={page}
                  onClick={() => onNavigate(page)}
                  className={
                    "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[15px] font-semibold transition " +
                    (activePage === page
                      ? "bg-[#EFECE8] text-ink-900 shadow-sm"
                      : "text-ink-600 hover:bg-paper")
                  }
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {label}
                  {activePage === page && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-500" />
                  )}
                </button>
              ))}
            </nav>

            <div className="flex-1" />

            <button
              onClick={onOpenSettings}
              className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[15px] font-semibold text-ink-600 transition hover:bg-paper"
            >
              <IconSettings className="h-5 w-5" />
              Settings
            </button>

            <div className="mt-3 flex items-center gap-3 rounded-2xl bg-paper p-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-lg shadow-sm">
                🏛️
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-extrabold">Delhi Public School</div>
                <div className="truncate text-xs font-medium text-ink-600">Bokaro Steel City</div>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Mobile bottom nav */}
      <nav className="fixed right-0 bottom-0 left-0 z-40 flex border-t border-line bg-white px-1 pb-safe lg:hidden">
        {NAV.map(({ icon: Icon, label, page }) => (
          <button
            key={page}
            onClick={() => onNavigate(page)}
            className={
              "flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-extrabold transition " +
              (activePage === page ? "text-ink-900" : "text-ink-400")
            }
          >
            <Icon className={`h-5 w-5 ${activePage === page ? "text-brand-500" : ""}`} />
            {label.split(" ").slice(-1)[0]}
          </button>
        ))}
        <button
          onClick={onOpenSettings}
          className="flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-extrabold text-ink-400 transition"
        >
          <IconSettings className="h-5 w-5" />
          Settings
        </button>
      </nav>
    </>
  );
}
