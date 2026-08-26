"use client";

import { useEffect, useRef, useState } from "react";
import { getUserApiKey } from "@/lib/client";
import type { NavPage } from "./Sidebar";
import {
  IconArrowLeft,
  IconBell,
  IconChevronDown,
  IconFolder,
  IconHelp,
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

function Avatar({ size = "h-8 w-8", text = "text-[11px]" }: { size?: string; text?: string }) {
  return (
    <span
      className={`grid ${size} shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-300 to-brand-600 font-extrabold text-white ${text}`}
    >
      MR
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
        "relative grid h-10 w-10 place-items-center rounded-full text-ink-700 transition hover:bg-paper " +
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

  // Close dropdown on outside click
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
      {/* API key warning banner */}
      {!hasApiKey && (
        <div className="mb-2 flex items-center gap-2 rounded-xl border border-warn-700/30 bg-warn-100 px-4 py-2 text-xs font-semibold text-warn-700">
          <span>⚠️</span>
          <span>
            Using default shared API key — you may hit rate limits.{" "}
            <button
              onClick={onOpenSettings}
              className="font-extrabold underline hover:text-warn-700/80"
            >
              Add your own key in Settings
            </button>
          </span>
        </div>
      )}

      <div className="flex h-14 items-center gap-1.5 rounded-2xl border border-line bg-white px-2">
        {/* Back button */}
        <button
          onClick={onBack}
          disabled={!onBack}
          aria-label="Back"
          className="grid h-10 w-10 place-items-center rounded-full text-ink-900 transition hover:bg-paper disabled:opacity-30"
        >
          <IconArrowLeft className="h-5 w-5" />
        </button>

        {/* Section label */}
        <div className="hidden items-center gap-2 sm:flex">
          <IconFolder className="h-[18px] w-[18px] text-ink-600" />
          <span className="text-[15px] font-bold">{PAGE_LABELS[activePage]}</span>
        </div>

        <div className="ml-auto flex items-center gap-0.5">
          <IconBtn className="hidden sm:grid" title="Help">
            <IconHelp className="h-5 w-5" />
          </IconBtn>

          <IconBtn title="Notifications">
            <IconBell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-brand-500 ring-2 ring-white" />
          </IconBtn>

          <IconBtn className="hidden md:grid" title="AI Toolkit" onClick={() => {}}>
            <IconSparkle className="h-5 w-5 text-ink-900" />
          </IconBtn>

          {/* User dropdown (desktop) */}
          <div ref={dropRef} className="relative hidden md:block">
            <button
              id="topbar-user-btn"
              onClick={() => setUserOpen((v) => !v)}
              className="flex items-center gap-2 rounded-full p-1 pr-2 transition hover:bg-paper"
            >
              <Avatar />
              <span className="text-sm font-bold">Madhur Rastogi</span>
              <IconChevronDown
                className={`h-4 w-4 text-ink-600 transition-transform ${userOpen ? "rotate-180" : ""}`}
              />
            </button>

            {userOpen && (
              <div className="absolute top-full right-0 z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-line bg-white shadow-xl">
                {/* Profile header */}
                <div className="flex items-center gap-3 border-b border-line bg-paper px-4 py-3">
                  <Avatar size="h-10 w-10" text="text-sm" />
                  <div className="min-w-0">
                    <div className="truncate text-sm font-extrabold">Madhur Rastogi</div>
                    <div className="truncate text-xs text-ink-600">Senior Teacher</div>
                  </div>
                </div>

                {/* Menu items */}
                <div className="p-1.5">
                  <button
                    onClick={() => { onOpenSettings(); setUserOpen(false); }}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left text-sm font-semibold text-ink-700 transition hover:bg-paper"
                  >
                    <IconSettings className="h-4 w-4 shrink-0" />
                    Settings
                  </button>
                  <button
                    onClick={() => { onOpenSettings(); setUserOpen(false); }}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left text-sm font-semibold text-ink-700 transition hover:bg-paper"
                  >
                    <span className="text-base">🔑</span>
                    {getUserApiKey() ? "Change API Key" : "Add API Key"}
                  </button>
                  <div className="my-1 border-t border-line" />
                  <button
                    onClick={() => setUserOpen(false)}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left text-sm font-semibold text-bad-600 transition hover:bg-bad-100"
                  >
                    <span className="text-base">🚪</span>
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Avatar only (mobile) */}
          <button
            className="md:hidden"
            onClick={() => setUserOpen((v) => !v)}
            aria-label="User menu"
          >
            <Avatar size="h-9 w-9" text="text-xs" />
          </button>

          {/* Mobile menu button */}
          <IconBtn
            className="lg:hidden"
            title="Menu"
            onClick={onOpenMobileMenu}
          >
            <IconMenu className="h-5 w-5" />
          </IconBtn>
        </div>
      </div>
    </header>
  );
}
