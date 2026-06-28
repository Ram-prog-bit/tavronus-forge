---
description: Inspection-only audit of Forge v2 repo + agent system. No edits. CEO + QA/UI + Release/Test + Memory (+ optional Security) report issues with evidence.
---

# /forge-agent-audit

**Purpose:** Read-only health check of the repo and the agent/command system.

**When to use:** Any time you want a status/consistency check without changing anything.
**When NOT to use:** When you intend to implement (use the build commands).

## Required docs to read
`docs/FORGE_V2_AGENT_SYSTEM.md`, `docs/FORGE_V2_REALITY_MAP.md`,
`docs/FORGE_V2_MODEL_ROUTING.md`, `CLAUDE.md`.

## Allowed agents
CEO Lead, QA/UI, Release/Test, Memory, and optionally Security.

## Forbidden actions
No edits, installs, commits, pushes, or deploys. No port/route changes.

## Steps
1. `git branch --show-current` + `git status --short` + `git diff --stat`.
2. Confirm 10 active + 5 dormant agents present; model routing consistent vs
   `FORGE_V2_MODEL_ROUTING.md`.
3. Confirm dormant `later-forge-*` agents remain dormant.
4. Confirm guardrails across agents: port 5642, no integrations, no contamination,
   Patch Guardian review-only, only Frontend edits.
5. Confirm Reality Map honesty labels look accurate.
6. Report findings with evidence and the smallest safe fix per gap (do not apply).

## Build / test rules
Optional `npm run build` for a health signal; report output.

## Git rules
Read-only.

## Approval rules
Any recommended fix requires approval before it's applied.

## Final report format
**Repo state** · **Agent roster check** · **Routing check** · **Guardrail check** ·
**Findings + suggested smallest fixes**.
