import { normLabel, sanitizeBox, toNumOrNull } from "./normalize";
import type { AnalysisResult, MapResult, Question, Segment, Unmatched } from "./types";

export function mergeQuestions(resps: any[]): Question[] {
  const out: Question[] = [];
  for (const r of resps) {
    const arr = Array.isArray(r?.questions) ? r.questions : [];
    for (const q of arr) {
      const label = String(q?.label ?? "").trim();
      const text = String(q?.text ?? "").trim();
      if (!label || !text) continue;
      out.push({
        label,
        number: String(q?.number ?? label).trim() || label,
        sub_part: q?.sub_part ? String(q.sub_part) : null,
        text,
        max_marks: toNumOrNull(q?.max_marks),
        section: q?.section ? String(q.section) : null,
      });
    }
  }
  return out;
}

export function mergeSegments(resps: any[], maxPage: number): Segment[] {
  const out: Segment[] = [];
  let n = 1;
  for (const r of resps) {
    const arr = Array.isArray(r?.segments) ? r.segments : [];
    for (const s of arr) {
      const box = sanitizeBox(s?.box_2d);
      const label = String(s?.label ?? "").trim();
      if (!box || !label) continue;
      const page = Math.min(maxPage, Math.max(1, Math.round(Number(s?.page) || 1)));
      out.push({
        id: `s${n++}`,
        label,
        page,
        box_2d: box,
        text: String(s?.text ?? "").slice(0, 4000),
      });
    }
  }
  return out;
}

export function assembleAnalysis(
  questions: Question[],
  segments: Segment[],
  map: any
): AnalysisResult {
  const byKey = new Map<string, Question>();
  questions.forEach((q) => byKey.set(normLabel(q.label), q));

  const segIds = new Set(segments.map((s) => s.id));
  const respByKey = new Map<string, any>();
  const arr = Array.isArray(map?.results) ? map.results : [];
  for (const r of arr) {
    const label = String(r?.label ?? "").trim();
    if (label) respByKey.set(normLabel(label), r);
  }

  const results: MapResult[] = [];
  const used = new Set<string>();
  for (const q of questions) {
    const key = normLabel(q.label);
    const r = respByKey.get(key);
    const ids = (Array.isArray(r?.segment_ids) ? r.segment_ids : [])
      .map(String)
      .filter((id: string) => segIds.has(id));
    ids.forEach((id: string) => used.add(id));
    const status = r?.status === "answered" || ids.length > 0 ? "answered" : "unanswered";
    const maxMarks = toNumOrNull(r?.max_marks) ?? q.max_marks ?? 2;
    const scoreRaw = clampScore(r?.score, maxMarks);
    results.push({
      label: q.label,
      key,
      status,
      segment_ids: ids,
      score: status === "answered" ? scoreRaw : 0,
      max_marks: maxMarks,
      feedback: String(r?.feedback ?? "").trim(),
      confidence: toNumOrNull(r?.confidence) ?? undefined,
    });
  }

  const unmatched: Unmatched[] = [];
  const seenU = new Set<string>();
  const uarr = Array.isArray(map?.unmatched) ? map.unmatched : [];
  for (const u of uarr) {
    const id = String(u?.id ?? "");
    const seg = segments.find((s) => s.id === id);
    if (!seg || seenU.has(id)) continue;
    seenU.add(id);
    used.add(id);
    unmatched.push({
      id,
      label: seg.label,
      page: seg.page,
      text: seg.text,
      reason: String(u?.reason ?? "Does not match any question in the paper."),
    });
  }
  for (const s of segments) {
    if (used.has(s.id) || seenU.has(s.id)) continue;
    seenU.add(s.id);
    unmatched.push({
      id: s.id,
      label: s.label,
      page: s.page,
      text: s.text,
      reason: "Could not be matched to any question in the paper.",
    });
  }

  return {
    questions,
    segments,
    results,
    unmatched,
    overall_summary: String(map?.overall_summary ?? "").trim(),
  };
}

function clampScore(v: unknown, max: number): number {
  const n = toNumOrNull(v);
  if (n === null) return 0;
  return Math.min(max, Math.max(0, Math.round(n * 2) / 2));
}
