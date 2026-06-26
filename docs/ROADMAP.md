# Tavronus Forge — Roadmap

A focused, phased plan. Each phase has a **goal**, **what to build**, **what NOT
to build yet**, and a **risk level**. The guiding rule: **validate the product
loop before adding backend, secrets, or a real model.**

---

## Phase 0 — Current polished mock MVP ✅ (done)

**Goal:** prove the surface and the workflow with an honest, local-only build.

**What's shipped:**
- App-first start screen + boot animation.
- IDE-like workspace shell (Explorer · Editor · Forge AI · status/terminal bar).
- Tabs + `localStorage` VFS with mock save and dirty-state tracking.
- Forge AI modes (Plan/Prompt/Review/Debug/Checklist) + deterministic,
  editor-aware artifact generation.
- Artifact/copy flow (whole-card + snippet/prompt copy, framed snippets).
- Mock ApplyPreview patch flow.
- Resizable/collapsible IDE layout with persisted widths + open state.
- Keyboard ergonomics (palette, save, divider resize/reset, shortcut discoverability).
- Eight UI polish passes (contrast → keyboard) shipped and QA'd in production.

**What NOT to build:** anything real (AI, files, backend). Phase 0 is feature-complete.

**Risk level:** 🟢 Low — already shipped and stable.

---

## Phase 1 — Product validation 🎯 (next)

**Goal:** decide whether — and in what exact shape — real AI is worth building,
before writing any backend.

**What to build (mostly non-code):**
- This documentation set (brief, reality map, roadmap, design system). ✅
- A **manual demo script** — a repeatable walkthrough of the core loop for showing/testing.
- **User testing** — put the mock in front of a handful of target developers; capture
  where the workflow clicks and where the templated output visibly falls short.
- A written decision on **exact real-AI scope**: which mode(s) go real first
  (Prompt and Plan are the obvious candidates), what "good output" means, and the
  acceptance bar.

**What NOT to build yet:** any AI integration, any server route, any auth/DB. No code
changes to the app are required for this phase beyond docs.

**Risk level:** 🟢 Low — cheap, reversible, and the highest-leverage step.

---

## Phase 2 — Real AI optional mode

**Goal:** add genuine generation for selected modes **without** compromising the
local-first, honest-mock identity.

**What to build:**
- An **environment variable** to enable a provider (e.g. `FORGE_AI_PROVIDER` + key).
- **Mock mode remains the default.** Real AI is opt-in.
- A clear, visible **Mock ↔ Real AI toggle** in the UI (reuse the existing "Local
  Mock" badge surface — flip it to "Live AI" only when truly live).
- A **server-side route** for generation so the provider key never reaches the client.
- **Error + rate-limit states** — explicit UI for failure, timeout, and throttling
  (the mock never fails, so these are net-new).

**What NOT to build yet:** real file writes, project import, terminal, auth, memory.
Keep the file/VFS layer mock; only the *generation* becomes real.

**Risk level:** 🟡 Medium — first secrets + first server route + first external
dependency and cost. The honesty rules (REALITY_MAP) become load-bearing here.

---

## Phase 3 — Real project / file workflow

**Goal:** let Forge work against real code, safely, behind the patterns the mock
already established.

**What to build:**
- **Project import** — bring in a real folder/repo (read-only first).
- **Safe file read/write** — opt-in, explicit, reversible; writes always confirmed.
- **Diff preview** — a real diff engine replacing the template patch, behind the
  *existing* ApplyPreview UX.
- **Undo / rollback** — every applied change is reversible.
- **Real Apply flow** — ApplyPreview accepts/cancels against real files, with the
  same gating discipline (only the targeted file; never silent).

**What NOT to build yet:** terminal/build execution, multi-user, cloud sync.

**Risk level:** 🔴 High — touching a user's real files is the highest-trust, highest-
blast-radius surface in the product. Heavy testing, explicit confirmation, and
rollback are mandatory.

---

## Phase 4 — Power workspace

**Goal:** turn the cockpit into a daily driver for power users.

**What to build (prioritize, don't do all at once):**
- **Command palette actions** — make the palette do more (run modes, jump, apply).
- **Project memory** — persistent context across sessions (local first, sync optional).
- **Task history** — a log of generations/applies you can revisit.
- **Terminal / build runner** — actually run commands and stream output.
- **Auth — only if needed** (e.g. to gate sync or hosted features). Not before.

**What NOT to build yet:** anything not pulled by a validated user need. This phase is
a menu, not a checklist — pick the one item with the most demand.

**Risk level:** 🔴 High — execution + persistence + possible accounts. Scope tightly;
each item is its own mini-project with its own checker pass.

---

## Cross-cutting rules for every phase

- **Mock stays the default** until a feature is proven real *and* relabelled.
- **No secrets in the client**, ever.
- **No backend before a validated need** — Phase 1 gates Phase 2+.
- **Preserve the design system** (see `DESIGN_SYSTEM.md`) — new features inherit the
  existing visual + interaction language; no UI rewrites.
- **Every layout/behavior-touching change gets a checker pass + build verification**
  before shipping, matching the discipline used across UI Passes 2–8.
