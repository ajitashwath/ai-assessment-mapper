"use client";

import { useEffect, useRef, useState } from "react";
import { getUserApiKey } from "@/lib/client";
import type { NavPage } from "./Sidebar";
import {
  IconArrowLeft,
  IconAssignments,
  IconBell,
  IconChevronDown,
  IconClassroom,
  IconExams,
  IconGrid,
  IconHelp,
  IconLibrary,
  IconMenu,
  IconSettings,
  IconSparkle,
} from "./icons";

const PAGE_LABELS: Record<NavPage, string> = {
  home: "Home",
  classroom: "My Classroom",
  assignments: "Assignments",
  exams: "Exams",
  library: "My Library",
};

const PAGE_ICONS: Record<NavPage, typeof IconGrid> = {
  home: IconGrid,
  classroom: IconClassroom,
  assignments: IconAssignments,
  exams: IconExams,
  library: IconLibrary,
};

function Avatar({ size = "h-8 w-8" }: { size?: string }) {
  return (
    <span
      className={`grid ${size} shrink-0 select-none place-items-center overflow-hidden rounded-full bg-[#EDE9E4] shadow-sm ring-1 ring-black/5`}
    >
      <svg viewBox="0 0 40 40" className="h-full w-full" aria-hidden="true">
        <rect width="40" height="40" fill="#EDE9E4" />
        <path d="M13 17c1-6 4-10 7-10s6 4 7 10c-1-2-4-3-7-3s-6 1-7 3z" fill="#F4571F" />
        <path d="M13 15c1-5 4-8 7-8s6 3 7 8c-1-3-4-4-7-4s-6 1-7 4z" fill="#3B3448" />
        <circle cx="20" cy="19" r="6" fill="#2B2530" />
        <path d="M8 40c1-8 6-13 12-13s11 5 12 13z" fill="#2B2530" />
      </svg>
    </span>
  );
}

function IconBtn({
  children,
  className = "",
  onClick,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  title?: string;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={
        "relative grid h-9 w-9 place-items-center rounded-xl text-ink-600 transition hover:bg-paper hover:text-ink-900 " +
        className
      }
    >
      {children}
    </button>
  );
}

export function TopBar({
  activePage,
  onBack,
  onOpenSettings,
  onOpenMobileMenu,
  hasApiKey,
}: {
  activePage: NavPage;
  onBack?: () => void;
  onOpenSettings: () => void;
  onOpenMobileMenu?: () => void;
  hasApiKey: boolean;
}) {
  const [userOpen, setUserOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!userOpen) return;
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setUserOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [userOpen]);

  return (
    <header className="mx-3 mt-3 shrink-0">
      {/* ── API key warning banner ── */}
      {!hasApiKey && (
        <div className="mb-2 flex items-center gap-2 rounded-xl border border-warn-700/25 bg-warn-100 px-4 py-2 text-xs font-semibold text-warn-700 fade-in">
          <span className="shrink-0 text-sm">⚠️</span>
          <span>
            Using shared API key — you may hit rate limits.{" "}
            <button
              onClick={onOpenSettings}
              className="font-extrabold underline underline-offset-2 hover:no-underline"
            >
              Add your own key in Settings →
            </button>
          </span>
        </div>
      )}

      {/* ── Main topbar ── */}
      <div className="flex h-14 items-center gap-1 rounded-2xl border border-line bg-white px-2 shadow-[var(--shadow-card)]">
        {/* Back */}
        <button
          onClick={onBack}
          disabled={!onBack}
          aria-label="Back"
          className="grid h-9 w-9 place-items-center rounded-xl text-ink-700 transition hover:bg-paper disabled:opacity-25"
        >
          <IconArrowLeft className="h-[18px] w-[18px]" />
        </button>

        {/* Breadcrumb (desktop) */}
        <div className="hidden items-center gap-1.5 sm:flex">
          {(() => {
            const PageIcon = PAGE_ICONS[activePage];
            return <PageIcon className="h-[17px] w-[17px] text-[#a3a3a3]" />;
          })()}
          <span className="text-[15px] font-medium text-[#a3a3a3]">{PAGE_LABELS[activePage]}</span>
        </div>

        {/* Logo (mobile) */}
        <div className="flex items-center gap-2 sm:hidden">
          <span className="text-[16px] font-extrabold tracking-tight text-ink-900">VedaAI</span>
        </div>

        <div className="ml-auto flex items-center gap-0.5">
          <IconBtn className="hidden sm:grid" title="Help">
            <IconHelp className="h-[18px] w-[18px]" />
          </IconBtn>

          {/* Bell with badge */}
          <IconBtn title="Notifications">
            <IconBell className="h-[18px] w-[18px]" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-brand-500 ring-[1.5px] ring-white" />
          </IconBtn>

          <IconBtn className="hidden md:grid" title="AI Toolkit">
            <IconSparkle className="h-[18px] w-[18px] text-ink-900" />
          </IconBtn>

          {/* User dropdown */}
          <div ref={dropRef} className="relative hidden md:block">
            <button
              id="topbar-user-btn"
              onClick={() => setUserOpen((v) => !v)}
              className="flex items-center gap-2 rounded-xl px-2 py-1 transition hover:bg-paper"
            >
              <Avatar size="h-8 w-8" />
              <span className="text-[13px] font-bold text-ink-900">Madhur Rastogi</span>
              <IconChevronDown
                className={`h-3.5 w-3.5 text-ink-500 transition-transform duration-200 ${
                  userOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {userOpen && (
              <div className="slide-up absolute top-full right-0 z-50 mt-2 w-60 overflow-hidden rounded-2xl border border-line bg-white shadow-[var(--shadow-modal)]">
                {/* Profile header */}
                <div className="flex items-center gap-3 bg-gradient-to-br from-paper to-paper-dark px-4 py-3.5">
                  <Avatar size="h-10 w-10" />
                  <div className="min-w-0">
                    <div className="truncate text-[13px] font-extrabold text-ink-900">Madhur Rastogi</div>
                    <div className="truncate text-[11px] font-medium text-ink-500">
                      Senior Teacher · DPS Bokaro
                    </div>
                  </div>
                </div>

                {/* Menu */}
                <div className="p-1.5">
                  {[
                    {
                      icon: "⚙️",
                      label: "Settings",
                      action: () => { onOpenSettings(); setUserOpen(false); },
                    },
                    {
                      icon: "🔑",
                      label: getUserApiKey() ? "Change API Key" : "Add API Key",
                      action: () => { onOpenSettings(); setUserOpen(false); },
                    },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={item.action}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[13px] font-semibold text-ink-700 transition hover:bg-paper"
                    >
                      <span>{item.icon}</span>
                      {item.label}
                    </button>
                  ))}

                  <div className="my-1 mx-1 border-t border-line" />

                  <button
                    onClick={() => setUserOpen(false)}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[13px] font-semibold text-bad-600 transition hover:bg-bad-100"
                  >
                    <span>🚪</span>
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile avatar */}
          <button
            className="md:hidden"
            onClick={() => { onOpenSettings(); }}
            aria-label="User menu"
          >
            <Avatar size="h-8 w-8" />
          </button>

          <IconBtn className="lg:hidden" title="Menu" onClick={onOpenMobileMenu}>
            <IconMenu className="h-[18px] w-[18px]" />
          </IconBtn>
        </div>
      </div>
    </header>
  );
}
