# Tavronus Forge — Real AI Architecture (Planning Only)

**This is a plan, not an implementation.** Nothing here is built. It exists so
that *when* validation (see `VALIDATION_PLAN.md`) says go, the first real-AI work
is small, safe, and preserves the honest local/mock MVP.

Do not implement any of this during a planning pass.

---

## 1. Architecture goal

Make Tavronus Forge support **optional** real AI generation for one mode, while:

- keeping the current local/mock MVP fully intact and **default**,
- never exposing provider secrets to the client,
- not adding auth, a database, file writes, or terminal execution,
- not changing the existing workspace UX, the localStorage VFS, or the artifact shape.

Real AI is an *additive layer behind a toggle* — not a rewrite.

## 2. Recommended first real mode

**Recommendation: make Prompt mode real first.**

| Mode | First-real fit | Notes |
|---|---|---|
| **Prompt** | ✅ **Best wedge** | Matches the product's core value (copy-paste prompt engineering). Works on open-tab text alone — no repo indexing needed. Useful immediately, before any real file writes. Fits Ram's actual Claude Code / Cursor / GPT workflow. |
| **Plan** | Good, but broader | Genuinely useful, but planning a whole build benefits from more context than one open file; higher variance in output quality. A strong *second*. |
| **Review** | Needs real context | Only as good as the code it sees. On open-tab text it's okay; to be *truly* good it wants multi-file / project context — which is a later phase. |
| **Debug** | Needs real context | Same as Review, more so: good debugging often needs the stack trace + related files, not just one buffer. |
| **Checklist** | Useful, lower leverage | Pleasant and helpful, but the least differentiated and lowest-leverage as a first paid/real wedge. |

**Why Prompt is the cleanest first real-AI wedge:**

- It's the most defensible value: a *better prompt* is exactly what this product
  promises, and a real model improves it the most per token of context.
- It is **self-contained** — `mode` + `userInstruction` + the open tab's content is
  enough to produce a strong result. No indexing, no file writes, no repo crawl.
- It is **useful even with no real file workflow** — the output leaves the app via copy.
- It **fails safe** — a weak prompt is a minor annoyance, not a destructive action.

Review/Debug should wait until real code context (Phase C+) exists; making them
"real" on a single buffer would underdeliver and damage trust.

## 3. Must-preserve behavior

Real AI, when built, **must**:

- be **optional** (off by default),
- be **clearly labeled** as real vs mock at the point of generation,
- **keep mock mode available** and as the default,
- **never expose secrets to the client** (no `NEXT_PUBLIC_` keys),
- run through a **server-side route only**,
- **not break the localStorage VFS** or any existing persistence,
- **not require auth** at first,
- **not require a database** at first,
- **not execute terminal commands**,
- **not write real files** directly,
- **not pretend it can access the full local repo** if only the open tab was sent.

If any of these can't be guaranteed, the feature isn't ready.

## 4. High-level architecture

A thin, additive client → server → provider path.

**Client (existing workspace UI):**
- Current workspace, selected mode, the open tab's content, optional user instruction.
- A **"Mock" vs "Real AI" selector / label** (reuse the existing "Local Mock" badge
  surface — only show "Live AI" when a real call actually happens).
- Sends a sanitized payload to the server route; renders the returned artifact with
  the **existing `OutputCard`** (no new render path).

**Server (Next.js route — future, e.g. `app/api/forge-ai/route.ts`):**
- Receives the sanitized payload.
- Calls the AI provider **server-side** using a key from the environment.
- Maps the model response into the **existing artifact shape** and returns JSON.
- Owns error handling, timeouts, and rate-limit responses.

**Environment:**
- Provider key in `.env.local` (e.g. `FORGE_AI_PROVIDER`, `FORGE_AI_API_KEY`).
- **Never** prefixed `NEXT_PUBLIC_`; never bundled into client JS.

**Response handling:**
- Structured artifact JSON compatible with today's `OutputCard`
  (`title`, `label`, `body[]`, optional `code`).
- **Graceful fallback to mock** if the real call fails, times out, or is rate-limited —
  clearly relabeled as mock when it falls back.

## 5. Suggested request / response shape (docs only — do not create code)

Sketch only, to align future work. The response intentionally mirrors the current
artifact shape (`lib/forgeArtifacts.ts` → `OutputCard`).

```ts
// Request (client → server route)
type ForgeAIRequest = {
  mode: "plan" | "prompt" | "review" | "debug" | "checklist";
  userInstruction: string;        // the command typed in the composer
  activeFilePath: string | null;  // null = workspace context, not a file
  activeFileContent: string;      // current open-tab text (may be empty)
  workspaceSummary?: string;      // optional, lightweight context hint
  mockOrReal: "mock" | "real";    // explicit; "mock" never reaches the provider
};

// Response (server route → client) — maps to OutputCard artifacts
type ForgeAIArtifact = {
  title: string;                  // card heading
  label: string;                  // type tag (e.g. "Claude Code", "Audit")
  summary?: string;               // optional one-line context
  sections: string[];            // body bullets (→ OutputCard `body`)
  snippets?: string[];           // framed code/prompt blocks (→ `code`)
  warnings?: string[];           // optional risk notes
  canApplyMockPatch: boolean;     // whether ApplyPreview's mock patch is offered
};

type ForgeAIResponse = {
  source: "mock" | "real";        // MUST be surfaced in the UI label
  artifacts: ForgeAIArtifact[];
  error?: { kind: "timeout" | "rate_limit" | "provider" | "unknown"; message: string };
};
```

Notes:
- `mockOrReal: "mock"` is handled entirely client-side as today — it never calls the provider.
- `source` is authoritative for labeling; the UI must show real-vs-mock from this, not assume.
- `canApplyMockPatch` keeps Apply on the **existing** mock patch flow — real AI does **not**
  imply real file writes (that's a much later phase).

## 6. Safety / honesty rules

These extend the rules in `REALITY_MAP.md` and are non-negotiable for real AI:

- **Label real AI output clearly** — when `source: "real"`, the UI says so.
- **Label mock output clearly** — when `source: "mock"` (incl. fallback), say mock.
- **Never say files were changed** unless only the local mock tab changed.
- **Never say the repo was analyzed** unless that context was actually sent. If only the
  open tab went to the model, the UI must not imply whole-project understanding.
- **Never execute code.** No terminal, no build, no eval.
- **Never claim terminal access.**
- **Never store user code remotely** unless a later phase explicitly designs and discloses it.
- **Fail honest** — on fallback to mock, relabel; don't pass off a mock result as real.

## 7. Future phases

Small, ordered, each gated by the previous.

| Phase | Scope | Guardrail |
|---|---|---|
| **A** | **Planning docs only** (this document). | Nothing built. |
| **B** | Optional **server-side Prompt mode** prototype. | **Mock remains default;** real is opt-in behind env + toggle; no secrets in client. |
| **C** | Better **context selection** — user chooses active file vs a workspace snippet to send. | Still no file writes; context is read-only and explicit. |
| **D** | Real **structured diff proposal** only — model proposes a diff, shown in ApplyPreview. | **Still no automatic disk writes;** apply stays local/confirmed. |
| **E** | Possible **project import / indexing** plan. | Planning first; high blast radius — its own validation + checker pass. |

Do not skip ahead. Each phase is a separate build with its own checker pass and build
verification, matching the discipline used across UI Passes 2–8.

## 8. Risks

- **Overclaiming** — implying real intelligence, repo analysis, or file writes that
  didn't happen. The single biggest trust risk.
- **Leaking secrets** — a key reaching the client bundle (e.g. via `NEXT_PUBLIC_`).
- **Bad output quality** — a real model with too little context can underperform the
  mock's tidy templates; ship only when it's clearly better.
- **Mock/real confusion** — users unsure which they're seeing. The `source` label must be unmissable.
- **Context too small** — open-tab-only context limits Review/Debug; don't make those
  real prematurely.
- **Backend cost** — real calls cost money and add rate-limit/abuse surface.
- **Adding too much too soon** — auth/DB/file writes before they're pulled by need.
- **Drifting into a generic chatbot** — losing the structured-artifact, cockpit identity.
  Real AI must still return *artifacts*, not a chat transcript.

## 9. Decision

**Do not build real AI yet** — not until Product Planning Pass 1 is checked and the
`VALIDATION_PLAN.md` is reviewed with real tester feedback. When ready, the first real
implementation should be an **optional, server-side Prompt mode**, with **mock mode
preserved as the default**, and every honesty rule in §6 enforced from day one.
