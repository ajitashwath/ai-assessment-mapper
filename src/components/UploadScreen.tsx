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
    <div className="h-full overflow-y-auto">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-8 text-center sm:py-10">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-[40px] sm:leading-[1.2]">
          Upload{" "}
          <span className="rounded-2xl bg-brand-50 px-3 py-1 text-brand-500">
            Question Paper &amp; Answer Sheets
          </span>
        </h1>
        <p className="mt-3 text-[15px] font-semibold text-ink-600">
          Upload both files to get started
        </p>

        <OrbitAvatar />

        <div className="grid w-full gap-4 sm:grid-cols-2">
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

        {error && (
          <div className="mt-5 w-full rounded-xl border border-bad-600/30 bg-bad-100 px-4 py-3 text-left text-sm font-semibold text-bad-600">
            {error}
          </div>
        )}

        <button
          onClick={onStart}
          disabled={!canStart}
          className={
            "mt-7 flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[15px] font-extrabold text-white transition " +
            (canStart ? "bg-ink-900 hover:bg-black" : "cursor-not-allowed bg-[#D8D3CD]")
          }
        >
          Start Mapping
          <IconArrowRight className="h-5 w-5" />
        </button>
        <p className="mt-3 max-w-md text-sm text-ink-600">
          Once both files are uploaded, you&apos;ll be able to map answers with questions
        </p>
        <p className="mt-1 text-xs text-ink-400">AI powered by Google Gemini</p>
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
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        onAdd(e.dataTransfer.files);
      }}
      className={
        "rounded-[26px] border-2 border-dashed bg-white/50 p-3.5 transition " +
        (drag ? "border-brand-500 bg-brand-50" : "border-[#DDD6CE]")
      }
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="application/pdf,image/*"
        className="hidden"
        onChange={(e) => {
          onAdd(e.target.files);
          e.target.value = "";
        }}
      />
      {metas.length === 0 ? (
        <button
          onClick={() => inputRef.current?.click()}
          className="flex w-full flex-col items-center gap-3 rounded-2xl px-4 py-10"
        >
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#F3F0EC]">
            <IconUpload className="h-6 w-6 text-ink-900" />
          </span>
          <span className="text-lg font-extrabold">
            Upload <span className="text-brand-500">{title}</span>
          </span>
          <span className="text-sm text-ink-600">Max 10MB</span>
        </button>
      ) : (
        <div className="flex flex-col gap-2">
          {metas.map((m) => (
            <div
              key={m.id}
              className="relative flex items-center gap-3 rounded-2xl bg-white p-3 pr-10 shadow-sm ring-1 ring-black/5"
            >
              {m.file.type === "application/pdf" ? <PdfBadge /> : <ImgBadge />}
              <div className="min-w-0 text-left">
                <div className="truncate text-sm font-bold">{m.file.name}</div>
                <div className="text-xs text-ink-600">
                  {fmtSize(m.file.size)} • {m.pages === 0 ? "…" : m.pages}{" "}
                  {m.pages === 1 ? "Page" : "Pages"}
                </div>
              </div>
              <button
                onClick={() => onRemove(m.id)}
                aria-label="Remove file"
                className="absolute top-2 right-2 grid h-6 w-6 place-items-center rounded-full bg-ink-900 text-white"
              >
                <IconX className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          <div className="flex items-center justify-between px-1">
            <button
              onClick={() => inputRef.current?.click()}
              className="text-sm font-bold text-brand-600 hover:underline"
            >
              + Add more
            </button>
            {totalPages > maxPages && (
              <span className="text-xs font-semibold text-warn-700">
                First {maxPages} pages will be processed
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const ORBITS = [
  { emoji: "✓", cls: "top-1 left-9", delay: "0s" },
  { emoji: "✏️", cls: "top-8 right-1", delay: "0.6s" },
  { emoji: "📄", cls: "bottom-5 left-1", delay: "1.2s" },
  { emoji: "💡", cls: "right-10 bottom-0", delay: "1.8s" },
];

function OrbitAvatar() {
  return (
    <div className="relative my-7 h-36 w-36 shrink-0">
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-brand-100/80 to-transparent" />
      <div className="absolute inset-2.5 rounded-full bg-white shadow-inner ring-1 ring-black/5" />
      <div className="absolute inset-0 grid place-items-center text-6xl select-none">👩🏽‍🏫</div>
      {ORBITS.map((o) => (
        <span
          key={o.emoji}
          className={`bob absolute grid h-8 w-8 place-items-center rounded-full bg-brand-500 text-sm text-white shadow-md ring-2 ring-white ${o.cls}`}
          style={{ animationDelay: o.delay }}
        >
          {o.emoji}
        </span>
      ))}
    </div>
  );
}
