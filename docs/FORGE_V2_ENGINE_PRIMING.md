# Forge v2 — Engine Priming

> Status: **PRIMED, not launched.** Missiles primed / engines ready. This pass set up
> planning, agent structure, design-system docs, dependency readiness, and the
> Vercel/GitHub preview workflow. It did **not** rebuild the app.

## Purpose of this pass

Prepare the Tavronus Forge repository for a serious v2 rebuild without changing any
app behavior. This is documentation, scaffolding, and dependency readiness only.

Forge v2 is **mission control for AI coding agents** — a local-first AI development
command center for builders who use AI agents to plan, code, review, test, and ship
software with memory, evidence, safe patch control, and clean UI discipline.

## What was checked (Phase 0 + 1)

- Working directory: `C:\Users\raghu\Tavronus Forge THE REAL ONE`
- Git: clean tree, branch switched from `master` → `forge-v2-rebuild`
- Backup branch `backup/forge-v1-final` present (local + remote)
- V1 snapshot commit `9681302` (`docs: preserve forge v1 final snapshot`) is the base
- Framework: **Next.js 14.2.5**, React 18, App Router
- Package manager: **npm** (`package-lock.json`)
- Tailwind 3.4.1 installed + configured, with an existing `forge` color palette
- Port **5642** preserved in `dev` and `start` scripts
- Vercel linked via `.vercel/project.json` → project `tavronus-forge-the-real-one`

## What was prepared

- `docs/FORGE_V2_*` planning suite (blueprint, design system, agents, workflow,
  vercel/github flow, reality map, daily log, risk register, next steps, dependency plan)
- `.claude/agents/*` subagent skeletons (7 MVP + 5 dormant later-agents)
- `.claude/commands/*` workflow command prompts
- Daily mission ritual docs
- Safe essential UI dependencies installed (see `FORGE_V2_DEPENDENCY_PLAN.md`)

## What was NOT changed

- No app screens, routes, or components rebuilt
- No v1 files deleted
- No git history rewritten, no force push, no production deploy
- No real AI / backend / auth / database / filesystem / terminal execution added
- Port 5642 unchanged
- No SOJ / Ziggma / SushiSwap contamination

## What is allowed next

- **Design System Day only** — tokens, layout primitives, typography, spacing,
  cards, buttons, panels, badges, status styles
- Commit docs/scaffolds to `forge-v2-rebuild`
- Use Vercel preview deployments for visual QA

## What is forbidden next

- No full screen rebuild yet
- No Agent Board / Evidence Vault / Patch Review implementation yet
- No real integrations (AI/backend/auth/db/terminal/filesystem) yet
- No production merge to `master`
- No force push, no history rewrite, no backup deletion

## Current state snapshot

| Field | Value |
|---|---|
| Branch | `forge-v2-rebuild` |
| Base commit | `9681302` |
| Git status (start) | clean |
| Package manager | npm |
| Vercel | linked (`tavronus-forge-the-real-one`) |
| Port | 5642 (unchanged) |
| Reality | UI + routes + docs real; all agent orchestration mock/planned |

## First recommended build day

**Design System Day — and nothing else.** Build the visual foundation before any
command-center screen is implemented. See `FORGE_V2_NEXT_STEPS.md`.
