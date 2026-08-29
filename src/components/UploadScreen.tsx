"use client";

import { useRef, useState } from "react";
import { fmtSize } from "@/lib/client";
import { IconArrowRight, IconUpload, IconX, ImgBadge, PdfBadge } from "./icons";

export const QP_MAX_PAGES = 12;
export const AS_MAX_PAGES = 16;

export type FileMetaT = { id: string; file: File; pages: number };

export function UploadScreen({
  qp,
  as,
  onAdd,
  onRemove,
  onStart,
  error,
}: {
  qp: FileMetaT[];
  as: FileMetaT[];
  onAdd: (side: "qp" | "as", files: FileList | null) => void;
  onRemove: (side: "qp" | "as", id: string) => void;
  onStart: () => void;
  error: string | null;
}) {
  const canStart = qp.length > 0 && as.length > 0;
  const qpPages = qp.reduce((n, m) => n + m.pages, 0);
  const asPages = as.reduce((n, m) => n + m.pages, 0);

  return (
    <div
      className="h-full overflow-y-auto"
      style={{
        background:
          "radial-gradient(90% 60% at 50% 15%, #f4efeb 0%, #ebe6e2 45%, #ddd8d5 75%, #cec9c6 100%)",
      }}
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-10 text-center">
        {/* Hero text */}
        <div className="fade-in">
          <h1 className="text-[32px] font-extrabold tracking-tight text-ink-900 sm:text-[36px] sm:leading-[1.25]">
            Upload{" "}
            <span className="rounded-xl bg-brand-50 px-2.5 py-1 text-brand-500 underline decoration-[3px] underline-offset-[6px]">
              Question Paper &amp; Answer Sheets
            </span>
          </h1>
          <p className="mt-3 text-[15px] font-medium text-ink-500">
            Upload both files to get started
          </p>
        </div>

        <TeacherAvatar />

        {/* Drop cards */}
        <div className="grid w-full gap-5 sm:grid-cols-2">
          <DropCard
            title="Question Paper"
            metas={qp}
            totalPages={qpPages}
            maxPages={QP_MAX_PAGES}
            onAdd={(f) => onAdd("qp", f)}
            onRemove={(id) => onRemove("qp", id)}
          />
          <DropCard
            title="Answer Sheet"
            metas={as}
            totalPages={asPages}
            maxPages={AS_MAX_PAGES}
            onAdd={(f) => onAdd("as", f)}
            onRemove={(id) => onRemove("as", id)}
          />
        </div>

        {/* Error */}
        {error && (
          <div className="slide-up mt-5 w-full rounded-xl border border-bad-600/25 bg-bad-100 px-4 py-3 text-left text-sm font-semibold text-bad-600">
            ⚠️ {error}
          </div>
        )}

        {/* CTA */}
        <button
          onClick={onStart}
          disabled={!canStart}
          className={`mt-8 flex items-center gap-2.5 rounded-full px-7 py-3 text-[15px] font-extrabold text-white transition-all ${
            canStart
              ? "bg-ink-900 shadow-md hover:scale-[1.02] hover:bg-ink-800 hover:shadow-lg active:scale-100"
              : "cursor-not-allowed bg-ink-200 text-white/90 shadow-none"
          }`}
        >
          Start Mapping
          <IconArrowRight className="h-4.5 w-4.5" />
        </button>

        <p className="mt-4 max-w-sm text-[13px] text-ink-500">
          Once both files are uploaded, you&apos;ll able to map answers with questions
        </p>
      </div>
    </div>
  );
}

function DropCard({
  title,
  metas,
  totalPages,
  maxPages,
  onAdd,
  onRemove,
}: {
  title: string;
  metas: FileMetaT[];
  totalPages: number;
  maxPages: number;
  onAdd: (files: FileList | null) => void;
  onRemove: (id: string) => void;
}) {
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => { e.preventDefault(); setDrag(false); onAdd(e.dataTransfer.files); }}
      className={`rounded-[22px] border-2 border-dashed bg-white p-3 transition-all ${
        drag ? "border-brand-500 bg-brand-50/40" : "border-[#DAD5CE] hover:border-ink-300"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="application/pdf,image/*"
        className="hidden"
        onChange={(e) => { onAdd(e.target.files); e.target.value = ""; }}
      />

      {metas.length === 0 ? (
        <button
          onClick={() => inputRef.current?.click()}
          className="flex w-full flex-col items-center gap-3 rounded-2xl px-4 py-11 transition hover:bg-paper/50"
        >
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-paper">
            <IconUpload className="h-5 w-5 text-ink-800" />
          </span>
          <span>
            <span className="block text-[17px] font-extrabold text-ink-900">
              Upload{" "}
              <span className="text-brand-500 underline decoration-2 underline-offset-2">
                {title}
              </span>
            </span>
            <span className="mt-1 block text-[13px] font-medium text-ink-400">Max 10MB</span>
          </span>
        </button>
      ) : (
        <div className="flex min-h-[176px] flex-col justify-center gap-2 py-3">
          {metas.map((m) => (
            <div
              key={m.id}
              className="relative flex items-center gap-3 rounded-2xl bg-paper/70 p-3 pr-10 ring-1 ring-black/5"
            >
              {m.file.type === "application/pdf" ? <PdfBadge /> : <ImgBadge />}
              <div className="min-w-0 text-left">
                <div className="truncate text-sm font-bold text-ink-900">{m.file.name}</div>
                <div className="text-xs text-ink-500">
                  {fmtSize(m.file.size)} ·{" "}
                  {m.pages === 0 ? (
                    <span className="inline-block h-2.5 w-8 animate-pulse rounded-sm bg-ink-200" />
                  ) : (
                    <>{m.pages} {m.pages === 1 ? "Page" : "Pages"}</>
                  )}
                </div>
              </div>
              <button
                onClick={() => onRemove(m.id)}
                aria-label="Remove file"
                className="absolute top-2 right-2 grid h-6 w-6 place-items-center rounded-full bg-ink-800 text-white transition hover:bg-bad-600"
              >
                <IconX className="h-3 w-3" />
              </button>
            </div>
          ))}

          <div className="flex items-center justify-between px-1 pt-1">
            <button
              onClick={() => inputRef.current?.click()}
              className="text-sm font-bold text-brand-600 transition hover:text-brand-700 hover:underline"
            >
              + Add more
            </button>
            {totalPages > maxPages && (
              <span className="text-[11px] font-semibold text-warn-700">
                First {maxPages} pages used
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const ORBIT_BADGES = [
  { style: { top: "6%", right: "10%" }, icon: "clock" },
  { style: { top: "42%", left: "-6%" }, icon: "list" },
  { style: { top: "48%", right: "-6%" }, icon: "upload" },
  { style: { bottom: "6%", left: "22%" }, icon: "gear" },
] as const;

function OrbitIcon({ icon }: { icon: (typeof ORBIT_BADGES)[number]["icon"] }) {
  const common = { viewBox: "0 0 24 24", fill: "none", stroke: "white", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (icon === "clock")
    return (
      <svg {...common} className="h-3.5 w-3.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </svg>
    );
  if (icon === "list")
    return (
      <svg {...common} className="h-3.5 w-3.5">
        <path d="M8 6h11M8 12h11M8 18h11M4 6h.01M4 12h.01M4 18h.01" />
      </svg>
    );
  if (icon === "upload")
    return (
      <svg {...common} className="h-3.5 w-3.5">
        <path d="M12 15V4M7.5 8.5L12 4l4.5 4.5" />
        <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
      </svg>
    );
  return (
    <svg {...common} className="h-3.5 w-3.5">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function TeacherAvatar() {
  return (
    <div className="relative my-7 h-[130px] w-[130px] shrink-0">
      {/* Peach ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-200/80 to-brand-100/60" />
      {/* Inner white circle with avatar */}
      <div className="absolute inset-[19px] overflow-hidden rounded-full bg-white shadow-md ring-1 ring-black/5">
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
          <rect width="100" height="100" fill="#ffffff" />
          {/* hair back */}
          <path d="M27 40c0-15 10-26 23-26s23 11 23 26v9c0 5-2 8-5 10l-3 19H35l-3-19c-3-2-5-5-5-10z" fill="#3d2b22" />
          {/* face */}
          <ellipse cx="50" cy="45" rx="15.5" ry="17" fill="#f6cca4" />
          {/* hair front */}
          <path d="M32 36c1-13 8-21 18-21s17 8 18 21c-3-5-10-8-18-8s-15 3-18 8z" fill="#3d2b22" />
          <path d="M30 40c-1 4-1 8 1 11-2-1-4-4-4-8s1-6 3-3z" fill="#3d2b22" />
          <path d="M70 40c1 4 1 8-1 11 2-1 4-4 4-8s-1-6-3-3z" fill="#3d2b22" />
          {/* glasses */}
          <rect x="35" y="41" width="12" height="9" rx="4" fill="none" stroke="#4a3628" strokeWidth="1.8" />
          <rect x="53" y="41" width="12" height="9" rx="4" fill="none" stroke="#4a3628" strokeWidth="1.8" />
          <path d="M47 45h6" stroke="#4a3628" strokeWidth="1.8" />
          {/* cheeks */}
          <circle cx="38" cy="52" r="3" fill="#f4a683" opacity="0.5" />
          <circle cx="62" cy="52" r="3" fill="#f4a683" opacity="0.5" />
          {/* smile */}
          <path d="M44 55c2.5 2.5 9.5 2.5 12 0" stroke="#b3543f" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          {/* blazer + notebook */}
          <path d="M18 100c1.5-18 13-27 32-27s30.5 9 32 27z" fill="#2b2530" />
          <path d="M35 100l3-21h24l3 21z" fill="#ffffff" />
          <rect x="37" y="79" width="26" height="17" rx="1.5" fill="#eceae5" stroke="#cfc9c0" strokeWidth="1" />
          <path d="M50 80v15" stroke="#cfc9c0" strokeWidth="1" />
        </svg>
      </div>
      {ORBIT_BADGES.map((o) => (
        <span
          key={o.icon}
          className="bob absolute grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand-500 shadow-md ring-2 ring-white"
          style={o.style}
        >
          <OrbitIcon icon={o.icon} />
        </span>
      ))}
    </div>
  );
}
