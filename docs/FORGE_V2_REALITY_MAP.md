# Forge v2 — Reality Map

> The honesty layer's source of truth. Every UI area must clearly label its state as
> **real / mock / planned / tested / untested.** This file is the canonical reference.

## Honesty rule

> **Every UI area must clearly label real / mock / planned / tested / untested state.**
> Never animate or style a mock to look real. Never imply work that isn't happening.

## Real (today, after CEO Priming v2)

- Local Next.js 14 app (App Router) running on port **5642**.
- Routes: `/`, `/workspace`, `/about` (v1, preserved).
- The UI itself (components render real React).
- Documentation (`docs/`) — including the full CEO operating system + specs.
- `CLAUDE.md` CEO operating manual.
- `.claude/agents/` — 10 active + 5 dormant subagent definitions (real files; the
  **orchestration they describe is still mock/planned**, but the agent configs exist).
- `.claude/commands/` — 12 reusable workflow command prompts (real files).
- Git branching model (`forge-v2-rebuild`, `backup/forge-v1-final`) + committed + pushed.
- Vercel preview workflow (project linked; previews real when pushed).
- UI dependencies installed (clsx, tailwind-merge, lucide-react, framer-motion).
- Local `npm run build` passing.
- **Design system foundation (Design System Day, 2026-06-27) — REAL:**
  - Design tokens in `tailwind.config.ts` (violet + status + surface tokens, radii,
    shadows, 250ms duration).
  - CSS variables + `prefers-reduced-motion` in `app/globals.css`.
  - `cn()` utility (`lib/utils.ts`); motion tokens (`lib/motion.ts`).
  - 11 UI primitives in `components/ui/` (Button, Panel, Card, Badge, Status, Tabs,
    EmptyState, ErrorState, Skeleton, LogBlock, CodeBlock) + barrel index.
  - **Built and tested** (type-checks + `npm run build` green). Note: primitives are
    **not yet used by any screen** — the foundation exists, screens come later.
- **GStack: STAGED** — cloned to `~/.claude/skills/gstack` (v1.58.5.0), **outside** the
  repo. `./setup` not run (Bun missing) → its `/` commands are **not yet active**.

## Mock / planned (NOT real yet)

- Real AI agent **orchestration** (the agents executing autonomously) — **planned**.
- Real backend / API server — **planned**.
- Real authentication — **planned**.
- Real database / persistence — **planned**.
- Real terminal execution — **planned**.
- Real filesystem edits by agents — **planned**.
- Real browser automation — **planned** (no Playwright installed).
- Real GitHub PR automation — **planned**.
- Graphify / code-graph integration — **planned**.
- ECC integration — **planned**.
- GStack **active** skills — **staged, pending Bun + `./setup`** (clone real, not activated).
- Production deployment automation — **planned** (no production actions taken).

## State legend

| Label | Meaning |
|---|---|
| **real** | wired to actual data/behavior |
| **mock** | placeholder data, no real backing |
| **planned** | designed, not built |
| **tested** | verified, with stored evidence |
| **untested** | built but not verified |

## Area-by-area status (to maintain as v2 grows)

| Area | State | Notes |
|---|---|---|
| Design tokens / primitives | **real + tested** | built Design System Day; not yet used by screens |
| App shell / layout | planned | Shell/Layout Day (apply primitives to existing shell) |
| Mission Control | **mock UI real** (static preview) | `MissionControlPreview` in workspace; phases from docs/commits, no live state |
| Agent Board | mock (planned UI) | no real agents yet |
| Project Memory | **mock UI real** (docs-backed) | `ProjectMemoryPreview` in workspace; static, no database/cloud memory |
| Evidence Vault | **mock UI real** (static preview) | `EvidenceVaultPreview` in workspace; no real evidence store/ingestion |
| Patch Review | **mock UI real** (static preview) | `PatchReviewPreview` in workspace; no diff engine/Git/patch apply |
| Deployment Status | mock | real via Vercel later |
| Daily Mission Log | partially real | backed by docs |

Keep this table accurate as features land. A wrong honesty label is a bug.
