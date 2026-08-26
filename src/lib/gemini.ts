import { NextResponse } from "next/server";

export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

type GeminiPart = { text: string } | { inline_data: { mime_type: string; data: string } };

function stripDataUrl(dataUrl: string): { mime: string; data: string } {
  const m = /^data:([^;]+);base64,(.*)$/s.exec(dataUrl);
  if (!m) throw new HttpError(400, "Invalid image payload");
  return { mime: m[1], data: m[2] };
}

export function parseJsonLoose(text: string): unknown {
  let t = text.trim();
  t = t.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/, "");
  try {
    return JSON.parse(t);
  } catch {}
  const s = t.indexOf("{");
  const e = t.lastIndexOf("}");
  if (s !== -1 && e > s) {
    try {
      return JSON.parse(t.slice(s, e + 1));
    } catch {}
  }
  throw new HttpError(502, "AI returned an unparseable response. Please retry.");
}

export async function geminiJSON(opts: {
  prompt: string;
  images?: string[];
  thinkingBudget?: number;
}): Promise<any> {
  const key = process.env.GEMINI_API_KEY;
  if (!key)
    throw new HttpError(
      500,
      "GEMINI_API_KEY is not configured. Add it to .env.local (local) or your Vercel environment variables."
    );
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";

  const parts: GeminiPart[] = (opts.images ?? []).map((d) => {
    const { mime, data } = stripDataUrl(d);
    return { inline_data: { mime_type: mime, data } };
  });
  parts.push({ text: opts.prompt });

  const generationConfig: Record<string, unknown> = {
    temperature: 0.2,
    responseMimeType: "application/json",
    maxOutputTokens: 60000,
  };
  if (opts.thinkingBudget !== undefined) {
    generationConfig.thinkingConfig = { thinkingBudget: opts.thinkingBudget };
  }

  let res: Response;
  try {
    res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": key },
        body: JSON.stringify({ contents: [{ role: "user", parts }], generationConfig }),
        signal: AbortSignal.timeout(55000),
      }
    );
  } catch {
    throw new HttpError(504, "The AI request timed out. Try again with fewer pages.");
  }

  if (!res.ok) {
    let msg = String(res.status);
    try {
      const j = await res.json();
      msg = j?.error?.message ?? msg;
    } catch {}
    if (res.status === 429)
      throw new HttpError(429, "Gemini free-tier rate limit hit. Wait a moment and retry.");
    throw new HttpError(502, `Gemini API error: ${msg}`);
  }

  const data = await res.json();
  const cand = data?.candidates?.[0];
  const text: string = (cand?.content?.parts ?? [])
    .map((p: any) => p?.text ?? "")
    .join("");
  if (!text)
    throw new HttpError(
      502,
      `Gemini returned an empty response${cand?.finishReason ? ` (${cand.finishReason})` : ""}. Please retry.`
    );
  return parseJsonLoose(text);
}

export function errorResponse(e: unknown) {
  if (e instanceof HttpError) return NextResponse.json({ error: e.message }, { status: e.status });
  console.error(e);
  return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
}
