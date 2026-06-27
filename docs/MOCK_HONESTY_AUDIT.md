# Tavronus Forge — Mock Honesty Audit

Audit of one thing only: **is Tavronus Forge honest about being local/mock?**
Trust is the product's foundation; this protects it. Grounded in the code at HEAD
`8eec620`.

---

## 1. Purpose

Confirm the app never implies real AI, real file writes, terminal execution, or a
backend it doesn't have — and flag any wording that drifts toward overclaiming.

## 2. Honest labels / phrases found (verified in source)

- **Start screen** (`StartScreen.tsx`): a **"Local Mock Mode"** badge; status bar reads `localhost:5642 · mock mode`; Demo Recent is labelled `sample entries`.
- **Workspace** (`WorkspaceShell.tsx`): a **"Local Mock"** badge in the Forge AI header with the title *"Responses are generated locally from mock templates — no external AI is called."*; the editor meta bar uses `mock file` / `new file`; status bar shows `mock mode`.
- **ApplyPreview** (`ApplyPreview.tsx`): *"Local mock patch · edits the open tab only · not saved until ⌘S."*
- **Boot screen** (`BootScreen.tsx`) and landing badge: *"Local AI Coding Workspace."*
- **Landing roadmap** (`LandingPage.tsx`): "Real AI integration (Claude API)" is shown as a **v0.2 item with `active: false`** (dimmed); only v0.1 "Local workspace shell + 5 command modes" carries the **"Live"** badge — which is true.
- **Docs**: `REALITY_MAP.md` states plainly there is no real AI / filesystem / terminal / auth / DB / indexing.

**Verdict on labels:** strong and consistent in the actual app surfaces.

## 3. Risky wording to avoid (banned unless it becomes real)

Never say, in UI or docs, unless/until true:

- "AI analyzed your repo"
- "saved to disk"
- "ran command" / terminal executed
- "deployed" (from inside the app)
- "connected to Claude / OpenAI / Anthropic"
- "indexed project"
- "applied patch to filesystem"

A scan of `app/`, `components/`, `hooks/`, `lib/` found **no** instances of these claims.

## 4. Current high-risk UI areas

| Area | Possible misunderstanding | Current protection | Recommended (future) |
|---|---|---|---|
| **Forge AI panel** | "It's calling a real model" | "Local Mock" badge + tooltip; mode/context strip | Keep badge prominent when real mode ships |
| **Generated artifacts** | "This was reasoned by AI" | Output is template-structured; mock badge nearby | When real, add a `source: mock/real` label per card |
| **ApplyPreview** | "It edited my real files" | Explicit "edits the open tab only · not saved until ⌘S" | Keep this note verbatim if Apply ever goes real |
| **Save / dirty state** | "Ctrl/Cmd+S wrote to disk" | "mock file" / "mock mode" language | Never call it disk save while it's localStorage |
| **File explorer / VFS** | "These are my real files" | Seeded demo tree; localStorage-only | Label as "virtual" if confusion appears in testing |
| **Production `/about`** | "The AI is live" | Roadmap marks real AI inactive (v0.2); "Local" in badges | **P3:** add an explicit "local/mock — no real AI yet" line on `/about` for parity with the app |
| **README / docs** | Overclaiming features | Honest real-vs-mock summary | Keep updating as features change |

## 5. Approved mock-vs-real wording standard

Use these:

- "Local Mock"
- "mock artifact" / "deterministic mock artifact"
- "local virtual file" / "localStorage-backed VFS"
- "applies to open tab only"
- "not written to disk"
- "no real AI API is called"
- "server-side real AI planned later"
- "mock mode remains default"

## 6. Demo honesty checklist (follow when demoing)

- [ ] Say it's **mock/local** before generating anything.
- [ ] Say Prompt mode is **recommended to become real first**, not real today.
- [ ] Say ApplyPreview changes the **local virtual tab only**, not disk.
- [ ] Do **not** imply the production site has a backend AI.

## 7. Future real-AI labeling rules (when it exists)

- Mock and real outputs must be **visually distinct**.
- Real output must state **what context was sent**.
- Real output must **never claim full-repo access** unless it's true.
- On failure, **fall back to mock and relabel** — never pass mock off as real.
- Provider **secrets stay server-side** (no `NEXT_PUBLIC_`).

## 8. Verdict

**Trust verdict: STRONG.**

Reasons: every in-app generation surface (start screen, Forge AI panel, ApplyPreview,
save/dirty state) is clearly labelled mock; no banned overclaim appears anywhere in
the code; the marketing page defers real AI to an explicitly inactive roadmap item.
The single improvement worth making later is a **P3** explicit "local/mock — no real
AI yet" line on `/about`, so the marketing page matches the app's honesty bar exactly.
This is a positioning/copy decision (documented, not auto-fixed in this audit).
