# Tavronus Forge — Issues For Next Pass

Real issues / justified risks found in the Overnight Audit Pass 1. Only genuine items
are listed. Most categories are empty — that's an accurate result, not a gap.

---

## 1. P0 blockers

**None found.** App builds, all routes load, workspace is usable, no data loss, no
severe false claims.

## 2. P1 serious issues

**None found.** Core flows (tabs, save, generate, copy, apply, palette, panels) are
intact; no broken route links; in-app mock honesty is clear.

## 3. P2 normal issues

**None found.**

## 4. P3 polish

### P3-1 — Explicit mock label on `/about`
- **Evidence:** `components/LandingPage.tsx` — honest via the roadmap (real AI is an inactive v0.2 item) and "Local AI Coding Workspace" badge, but there is no explicit "local/mock — no real AI yet" line like the app surfaces have.
- **Affected files:** `components/LandingPage.tsx`.
- **Why it matters:** the marketing page is the one surface where a visitor could briefly assume the AI is live; matching the app's explicit honesty raises trust.
- **Recommended next pass:** Onboarding / Positioning Pass 1.
- **Fix before real AI?** Not required; nice-to-have. (Positioning/copy decision — left for design approval, not auto-fixed.)

### P3-2 — Open-state persistence "skip-guard" is a no-op
- **Evidence:** `components/WorkspaceShell.tsx` — the `panelStateHydrated` ref is set in the hydration effect, which runs before the persist effect, so the persist effect's early-return never triggers; it writes on mount. Behavior is correct in all cases (stored value always converges to the right value), so this is cosmetic/internal only.
- **Affected files:** `components/WorkspaceShell.tsx`.
- **Why it matters:** the comment claims it "skips the mount pass," which is slightly inaccurate; a future reader could be misled. Zero functional impact.
- **Recommended next pass:** fold into any future workspace touch-up; not worth a dedicated change.
- **Fix before real AI?** No.

### P3-3 — BootScreen boot-message theater
- **Evidence:** `components/BootScreen.tsx` — messages like "Binding AI command layer…". Intentional brand flavor; not a false claim (no real AI is asserted).
- **Affected files:** `components/BootScreen.tsx`.
- **Why it matters:** borderline against the design system's "no fake hacker cringe" rule; subjective.
- **Recommended next pass:** revisit only if testers react negatively.
- **Fix before real AI?** No.

## 5. Product / validation issues

### V-1 — Artifact usefulness unproven
- **Evidence:** output is deterministic templates; no tester data exists.
- **Why it matters:** the central open question before real AI is whether the workflow/artifacts are useful.
- **Recommended next pass:** run `VALIDATION_KIT.md` sessions; summarize in `VALIDATION_RESULTS_TEMPLATE.md`.
- **Fix before real AI?** **Yes** — validation gates real-AI work.

### V-2 — No onboarding/first-run guidance
- **Evidence:** the cockpit is dense; no guided first-run for newcomers.
- **Why it matters:** density may overwhelm beginners (a validation hypothesis).
- **Recommended next pass:** Onboarding / Positioning Pass 1 — only if testing shows confusion.
- **Fix before real AI?** Only if validation flags it.

## 6. Real-AI planning issues

### AI-1 — Unanswered provider/model/context questions
- **Evidence:** `REAL_AI_READINESS_REVIEW.md §9` lists open questions (provider, model, max context, schema, fallback, rate limits, no-key behavior).
- **Why it matters:** these must be decided before a technical spec.
- **Recommended next pass:** Real Prompt Mode Technical Spec Pass 1 (only after validation).
- **Fix before real AI?** **Yes** — prerequisite to implementation.

## 7. Manual QA still needed

### QA-1 — Interactive UI not exercised
- **Evidence:** no GUI browser in the audit environment; live click/drag/keyboard/focus-ring/clipboard behavior was not visually verified (`UI_BUG_HUNT_REPORT.md §6`).
- **Why it matters:** static + build + smoke can't confirm pointer-drag feel or pixel rendering.
- **Recommended next pass:** a hands-on manual pass using `QA_TEST_MATRIX.md` on a real browser.
- **Fix before real AI?** Recommended before any further layout-touching work.
