"use client";

import {
  IconAssignments,
  IconChevronsLeft,
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

const NAV = [
  { icon: IconGrid, label: "Home" },
  { icon: IconClassroom, label: "My Classroom" },
  { icon: IconAssignments, label: "Assignments" },
  { icon: IconExams, label: "Exams", active: true },
  { icon: IconLibrary, label: "My Library" },
];

export function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  return (
    <aside className="hidden shrink-0 lg:block">
      {collapsed ? (
        <div className="mt-3 ml-3 flex h-[calc(100dvh-24px)] w-[84px] flex-col items-center gap-4 rounded-2xl border border-line bg-white p-3">
          <LogoMark className="h-10 w-10" />
          <button
            className="grid h-11 w-11 place-items-center rounded-full bg-ink-900 ring-2 ring-brand-500"
            title="AI Teacher's Toolkit"
          >
            <IconSparkle className="h-4.5 w-4.5 text-brand-400" />
          </button>
          <nav className="mt-1 flex flex-col items-center gap-1.5">
            {NAV.map(({ icon: Icon, label, active }) => (
              <button
                key={label}
                title={label}
                className={
                  "grid h-11 w-11 place-items-center rounded-xl transition " +
                  (active ? "bg-[#EFECE8] text-ink-900" : "text-ink-600 hover:bg-paper")
                }
              >
                <Icon className="h-5 w-5" />
              </button>
            ))}
          </nav>
          <div className="flex-1" />
          <button
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
          <button className="mt-5 flex items-center justify-center gap-2 rounded-full bg-ink-900 py-3 text-sm font-extrabold text-white ring-2 ring-brand-500">
            <IconSparkle className="h-4 w-4 text-brand-400" />
            AI Teacher&apos;s Toolkit
          </button>
          <nav className="mt-6 flex flex-col gap-1">
            {NAV.map(({ icon: Icon, label, active }) => (
              <button
                key={label}
                className={
                  "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[15px] font-semibold transition " +
                  (active ? "bg-[#EFECE8] text-ink-900" : "text-ink-600 hover:bg-paper")
                }
              >
                <Icon className="h-5 w-5" />
                {label}
              </button>
            ))}
          </nav>
          <div className="flex-1" />
          <button className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[15px] font-semibold text-ink-600 transition hover:bg-paper">
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
  );
}
