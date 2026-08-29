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
      className="upload-screen h-full overflow-y-auto"
      style={{
        background:
          "radial-gradient(90% 60% at 50% 15%, #f4efeb 0%, #ebe6e2 45%, #ddd8d5 75%, #cec9c6 100%)",
      }}
    >
      <div className="upload-content mx-auto flex w-full flex-col items-center text-center">
        {/* Hero text */}
        <div className="upload-hero fade-in">
          <h1 className="upload-title font-extrabold tracking-tight text-ink-900">
            Upload{" "}
            <span className="upload-highlight rounded-xl bg-brand-50 text-brand-500 underline">
              Question Paper<br className="mobile-title-break" /> &amp; Answer Sheets
            </span>
          </h1>
          <p className="upload-subtitle text-[15px] font-medium text-ink-500">
            Upload both files to get started
          </p>
        </div>

        <TeacherAvatar />

        {/* Drop cards */}
        <div className={`upload-card-shell ${qp.length || as.length ? "upload-card-shell-filled" : ""}`}>
          <div className="upload-card-grid">
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
          className={`upload-cta flex items-center gap-2.5 rounded-full font-extrabold text-white transition-all ${
            canStart
              ? "bg-ink-900 shadow-md hover:scale-[1.02] hover:bg-ink-800 hover:shadow-lg active:scale-100"
              : "cursor-not-allowed bg-[#b9b9b9] text-white/70 shadow-none"
          }`}
        >
          Start Mapping
          <IconArrowRight className="h-4.5 w-4.5" />
        </button>

        <p className="upload-note text-ink-500">
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
      className={`drop-card ${metas.length ? "drop-card-filled" : ""} rounded-[22px] border-2 border-dashed bg-white transition-all ${
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
          className="drop-card-button flex w-full flex-col items-center rounded-2xl transition hover:bg-paper/50"
        >
          <span className="drop-icon grid place-items-center rounded-xl bg-paper">
            <IconUpload className="h-5 w-5 text-ink-800" />
          </span>
          <span>
            <span className="drop-title block font-extrabold text-ink-900">
              Upload{" "}
                <span className="text-brand-500">
                {title}
              </span>
            </span>
            <span className="drop-subtitle block font-medium text-ink-400">Max 10MB</span>
          </span>
        </button>
      ) : (
        <div className="file-card-content">
          <div className="file-list">
            {metas.map((m) => (
              <div key={m.id} className="file-item">
                {m.file.type === "application/pdf" ? <PdfBadge /> : <ImgBadge />}
                <div className="file-details min-w-0 text-left">
                  <div className="file-name truncate font-bold text-ink-900">{m.file.name}</div>
                  <div className="file-meta text-ink-500">
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
                  className="file-remove grid place-items-center rounded-full bg-ink-800 text-white transition hover:bg-bad-600"
                >
                  <IconX className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="file-actions flex items-center justify-between">
            <button
              onClick={() => inputRef.current?.click()}
              className="add-more font-bold text-brand-600 transition hover:text-brand-700"
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
    <div className="teacher-avatar">
      <img
        src="/teacher-avatar.png"
        alt="AI teacher"
        className="teacher-avatar-image"
      />
    </div>
  );
}
