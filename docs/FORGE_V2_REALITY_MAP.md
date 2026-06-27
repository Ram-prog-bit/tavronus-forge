# Forge v2 — Reality Map

> The honesty layer's source of truth. Every UI area must clearly label its state as
> **real / mock / planned / tested / untested.** This file is the canonical reference.

## Honesty rule

> **Every UI area must clearly label real / mock / planned / tested / untested state.**
> Never animate or style a mock to look real. Never imply work that isn't happening.

## Real (today)

- Local Next.js 14 app (App Router) running on port **5642**.
- Routes: `/`, `/workspace`, `/about` (v1, preserved).
- The UI itself (components render real React).
- Documentation (`docs/`).
- Git branching model (`forge-v2-rebuild`, `backup/forge-v1-final`).
- Vercel preview workflow (project linked; previews real when pushed).
- Mock data **models** (typed shapes that real data will later fill).

## Mock / planned (NOT real yet)

- Real AI agent orchestration (CEO + worker agents) — **planned**.
- Real backend / API server — **planned**.
- Real authentication — **planned**.
- Real database / persistence — **planned**.
- Real terminal execution — **planned**.
- Real filesystem edits by agents — **planned**.
- Real browser automation — **planned**.
- Real GitHub PR automation — **planned**.
- Graphify / code-graph integration — **planned**.
- GStack / ECC integration — **planned**.

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
| Design tokens / primitives | planned | Design System Day target |
| App shell / layout | planned | Shell/Layout Day |
| Mission Control screen | planned | mock data first |
| Agent Board | mock (planned UI) | no real agents yet |
| Project Memory | mock | docs-backed initially |
| Evidence Vault | mock | no real evidence store yet |
| Patch Review | mock | no real patch application |
| Deployment Status | mock | real via Vercel later |
| Daily Mission Log | partially real | backed by docs |

Keep this table accurate as features land. A wrong honesty label is a bug.
