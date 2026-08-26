# AI Assessment Mapper
Upload a question paper (PDF/images) and a student answer sheet (PDF/images). The app extracts every question (in printed order, sub-parts split out), extracts the handwritten answers with their exact regions, maps answers → questions, grades them with AI feedback, and lets the teacher **click a question to highlight the answer region** on the answer sheet.

## Tech stack

- **Next.js 15** (App Router) + **TypeScript** + **Tailwind CSS v4**
- **pdfjs-dist**: PDFs are rendered to page images **client-side** (no server file storage; nothing persists)
- **Google Gemini 2.5 Flash** (free tier) via direct REST — vision + structured JSON output with bounding boxes

## Approach
1. **Upload**: Teacher drops both files (PDF or images, ≤10MB each). PDFs are rasterised in the browser to JPEG page images (max 1400px, compressed).
2. **Question extraction** (`/api/extract-questions`): Pages are sent to Gemini in batches; it returns every question **in printed order**, preserving original numbering, splitting labelled sub-parts (`11 (a)`, `11 (b)` → `11a`, `11b`), with printed max marks when available.
3. **Answer extraction** (`/api/extract-answers`): Answer-sheet pages are sent to Gemini, which returns each answer segment with a **normalised 0–1000 bounding box** (`box_2d`), the page number, the label the student wrote, and a transcription. Multi-page answers produce multiple segments with the same label.
4. **Mapping + grading** (`/api/map-grade`): Gemini maps every segment to a question (handles `Q2`, `2)`, `2 b)`, `(ii)`, out-of-order answers), grades each answer out of its max marks, writes teacher-style feedback per question and an overall summary, and flags segments that match no question.
5. **Review UI**: Questions on the left (score badges, expandable AI feedback, page jump links), the answer sheet on the right (zoom, page navigation). Clicking a question **scrolls to and highlights the exact answer region in green**; answers that don't match any question are shown with red dashed boxes and listed under "Unmatched answers". Unanswered questions get a "Not answered" badge.

## Run locally

```bash
npm install
GEMINI_API_KEY=your_key_here
npm run dev
```

Open http://localhost:3000

## Deploy (Vercel)

```bash
npm i -g vercel
vercel
```
Add `GEMINI_API_KEY` in Project → Settings → Environment Variables, then deploy. (Or import the repo at vercel.com.)

## Assumptions & limitations
- One question paper + one student answer sheet per session; state lives in the browser (in-memory, no database).
- Free-tier caps: first 12 question-paper pages and 16 answer-sheet pages are processed per run.
- Highlight accuracy depends on Gemini's bounding-box detection; very messy layouts/skewed scans may produce loose boxes.
- Max marks default to 2 when not printed on the paper.
- Handwriting transcription/grading is AI-assisted and intended as a teacher aid, not a definitive evaluation.
