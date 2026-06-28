# Forge v2 — Master Blueprint

## Product reset statement

Tavronus Forge v1 is preserved as a museum/fallback. Forge v2 is a conceptual rebuild
from first principles. We are not patching v1 — we are re-architecting the product as a
**full command center for AI coding agents**, built with UI discipline and an honesty
layer from day one.

- V1 preserved: branch `backup/forge-v1-final`, tag `forge-v1-final-snapshot`,
  commit `9681302`.
- V2 active branch: `forge-v2-rebuild`.
- Do not delete the backup. Do not rewrite history. Do not force push.

## V2 product definition

**Tavronus Forge is a local-first AI development command center** for builders who use
AI agents to plan, code, review, test, and ship software with memory, evidence, safe
patch control, and clean UI discipline.

- Simple thesis: **Mission control for AI coding agents.**
- Parent brand: Tavronus AI / Tavronus Labs.

## Target user

A serious builder/engineer who already works with AI coding agents and wants:

- a single command center instead of scattered chats
- memory of decisions across sessions
- evidence and proof, not vibes
- safe, reviewable patches instead of blind edits
- a calm, premium, professional UI — not a toy

## Core problems Forge v2 solves

1. AI agent work is ephemeral — context and decisions get lost between sessions.
2. Agents edit too much at once with no reviewable patch boundary.
3. There is no shared evidence trail proving what was actually checked/tested.
4. "Real vs mock" status is usually hidden, eroding trust.
5. Multi-agent workflows lack orchestration and discipline.

## Core pillars

1. **Project Memory** — durable decisions, truth, and history across sessions.
2. **Agent Orchestration** — a CEO/lead agent coordinating specialized worker agents.
3. **Evidence Vault** — stored proof of what was inspected, run, and verified.
4. **Patch Review** — safe, scoped, approvable diffs; one builder edits at a time.
5. **Honesty Layer** — every UI area labels real / mock / planned / tested / untested.
6. **Workflow Discipline** — plan → inspect → approve → build → test → report.
7. **Local-first Control** — runs locally, sacred port 5642, user owns the loop.
8. **Design-System Cleanliness** — premium dark AI-lab UI, no vibe-coded clutter.

## Full command-center ambition

The UI architecture should feel like real mission control from the start, even while
most subsystems are mock:

- Mission Control
- Agent Board
- Project Memory
- Evidence Vault
- Patch Review
- Deployment Status
- Daily Mission Log
- Honest Mock/Real status surface

This is **architecture ambition**, not an instruction to make everything real now.

## What stays mock (initially)

Real AI orchestration, backend, auth, database, terminal execution, filesystem edits,
browser automation, GitHub PR automation, and any Graphify/GStack/ECC integration stay
mock/planned. See `FORGE_V2_REALITY_MAP.md`.

## What becomes real later

Incrementally, behind explicit approval: agent orchestration, evidence persistence,
patch application, deployment status wiring — each promoted from mock to real only when
its honesty label can truthfully say "real."

## What NOT to build yet

- No full screen rebuilds during engine priming or Design System Day.
- No real integrations until explicitly approved.
- No large dependency sprawl; no shadcn blind install; no Graphify/GStack/ECC/Ponytail/
  Playwright/MCP/browser-automation/AI-SDK/auth/db packages yet.

## Product thesis (repeat for future sessions)

> Mission control for AI coding agents. Local-first. Memory + evidence + safe patches +
> clean UI discipline.

## Screen list (planned)

| Screen | Purpose | Initial state |
|---|---|---|
| Mission Control | Overview / today's mission / status | UI shell, mock data |
| Agent Board | Agents, roles, live status | mock |
| Project Memory | Decisions, truth, history | mock |
| Evidence Vault | Stored proof of checks/runs | mock |
| Patch Review | Scoped diffs + approval | mock |
| Deployment Status | Vercel/GitHub preview state | mock (real later) |
| Daily Mission Log | Today's log, blockers, approvals | partially real (docs) |

V1 routes preserved for reference: `/`, `/workspace`, `/about`.
V1 modes preserved: Plan, Prompt, Review, Debug, Checklist.

## Phased roadmap

0. **Engine Priming** — docs, agents, deps, workflow (this pass). ✅
1. **Design System Day** — tokens, primitives, typography, cards, buttons, badges.
2. **Shell / Layout Day** — app frame, navigation, panel system.
3. **Mission Control Day** — overview screen (mock data).
4. **Agent Board Day** — agent cards + status (mock).
5. **Project Memory Day** — memory surface (mock).
6. **Evidence Vault Day** — evidence cards (mock).
7. **Patch Review Day** — diff + approval UI (mock).
8. **Vercel Preview QA Day** — preview deploy review loop.
9. **Polish / Responsive Day**.
10. **Milestone Snapshot Day** — tag a stable v2 checkpoint.

Real integrations are sequenced only after the UI command center is coherent and each
honesty label can be flipped truthfully.
