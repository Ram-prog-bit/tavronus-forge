# Tavronus Forge — Next Build Decision

A decision document for what happens after this audit pass. Grounded at HEAD
`8eec620` (before this pass's docs).

---

## 1. Current status

- UI polish shipped through **Pass 8** (contrast → keyboard ergonomics).
- **Product Docs Pass 1** shipped (brief, reality map, roadmap, design system).
- **Product Planning Pass 1** shipped (demo script, validation plan, real-AI architecture).
- The app is a **polished local/mock MVP**: no real AI, files, terminal, auth, DB, memory, or indexing.
- Current HEAD before this pass: **`8eec620`**.

## 2. What this pass added

A 12-document audit + validation package (docs only, no app code changed):

- `VALIDATION_KIT.md`, `TESTER_FEEDBACK_FORM.md`, `VALIDATION_RESULTS_TEMPLATE.md` — run + capture + summarize human validation.
- `QA_TEST_MATRIX.md` — manual QA of the current mock MVP.
- `FEATURE_INVENTORY.md` — real vs mock vs future, verified from source.
- `MOCK_HONESTY_AUDIT.md` — trust audit (verdict: strong).
- `REAL_AI_READINESS_REVIEW.md` — readiness gates for real Prompt mode.
- `FULL_REPO_AUDIT_REPORT.md`, `UI_BUG_HUNT_REPORT.md`, `SAFE_FIX_LOG.md`, `ISSUES_FOR_NEXT_PASS.md` — the audit findings, bug hunt, fix log, and issue queue.
- This decision doc.

## 3. Decision tree (next step)

**Option A — Validate with humans first** *(recommended)*
- Choose if: no tester feedback yet; unsure which mode users value; want to avoid overbuilding.
- Next: run tester sessions with `VALIDATION_KIT.md`, capture in `TESTER_FEEDBACK_FORM.md`, summarize in `VALIDATION_RESULTS_TEMPLATE.md`.

**Option B — Artifact Template Upgrade Pass 1**
- Choose if: generated artifacts feel weak; Prompt output structure needs work; copy/prompt blocks need better templates.

**Option C — Onboarding / Positioning Pass 1**
- Choose if: testers are confused about what Forge is; mock/local status isn't obvious enough (e.g. `/about`); the start screen needs sharper framing.

**Option D — Real Prompt Mode Technical Spec Pass 1**
- Choose **only** if: validation supports Prompt-first; mock honesty is understood; artifact usefulness is strong; the architecture questions in `REAL_AI_READINESS_REVIEW.md §9` are answered.

**Option E — Code Context Planning Pass 1**
- Choose if: testers care most about Review/Debug; real value needs multi-file context; project import/indexing needs design first.

## 4. Recommended immediate next step

**Full-Repo Overnight Audit Pass 1 Checker** — because this pass created 12 docs (and
must be verified before commit). Nothing should be committed until the checker passes.

## 5. Recommended next major direction (after checker + ship)

**Run actual human validation (Option A)** if testers are available. If not yet, do
**Artifact Template Upgrade Pass 1 (Option B)** before any real AI — better templates
de-risk and improve the eventual real Prompt mode regardless of the validation outcome.

## 6. What NOT to do next

- ❌ Add real AI immediately.
- ❌ Add auth / database / payments.
- ❌ Build terminal execution.
- ❌ Add real filesystem writes.
- ❌ Keep polishing random UI (diminishing returns — Passes 2–8 are enough).
- ❌ Mix with SOJ or Ziggma in any way.

## 7. One-line founder decision

> **Tavronus Forge should earn real AI by proving the workflow first.**
