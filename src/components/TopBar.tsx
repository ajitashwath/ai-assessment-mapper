"use client";

import {
  IconArrowLeft,
  IconBell,
  IconChevronDown,
  IconFolder,
  IconHelp,
  IconMenu,
  IconSparkle,
} from "./icons";

function Avatar({ size = "h-8 w-8", text = "text-[11px]" }: { size?: string; text?: string }) {
  return (
    <span
      className={`grid ${size} shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-300 to-brand-600 font-extrabold text-white ${text}`}
    >
      MR
    </span>
  );
}

function IconBtn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <button
      className={
        "relative grid h-10 w-10 place-items-center rounded-full text-ink-700 transition hover:bg-paper " +
        className
      }
    >
      {children}
    </button>
  );
}

export function TopBar({ onBack }: { onBack?: () => void }) {
  return (
    <header className="mx-3 mt-3 flex h-14 shrink-0 items-center gap-1.5 rounded-2xl border border-line bg-white px-2">
      <button
        onClick={onBack}
        disabled={!onBack}
        aria-label="Back"
        className="grid h-10 w-10 place-items-center rounded-full text-ink-900 transition hover:bg-paper disabled:opacity-40"
      >
        <IconArrowLeft className="h-5 w-5" />
      </button>
      <div className="hidden items-center gap-2 sm:flex">
        <IconFolder className="h-[18px] w-[18px] text-ink-600" />
        <span className="text-[15px] font-bold">Exams</span>
      </div>
      <div className="ml-auto flex items-center gap-0.5">
        <IconBtn className="hidden sm:grid">
          <IconHelp className="h-5 w-5" />
        </IconBtn>
        <IconBtn>
          <IconBell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-brand-500 ring-2 ring-white" />
        </IconBtn>
        <IconBtn className="hidden md:grid">
          <IconSparkle className="h-5 w-5 text-ink-900" />
        </IconBtn>
        <button className="hidden items-center gap-2 rounded-full p-1 pr-2 transition hover:bg-paper md:flex">
          <Avatar />
          <span className="text-sm font-bold">Madhur Rastogi</span>
          <IconChevronDown className="h-4 w-4 text-ink-600" />
        </button>
        <button className="md:hidden">
          <Avatar size="h-9 w-9" text="text-xs" />
        </button>
        <IconBtn className="lg:hidden">
          <IconMenu className="h-5 w-5" />
        </IconBtn>
      </div>
    </header>
  );
}
