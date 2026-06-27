---
description: Start every Forge v2 mission day — CEO Lead Agent confirms branch/status/port, loads truth, picks one mission and 2-4 agents, and outputs a plan before any edits.
---

# /forge-ceo-start-day

**Purpose:** Open the day with the CEO Lead Agent and a disciplined plan-before-edit ritual.

**When to use:** First thing, every session.
**When NOT to use:** Mid-implementation (use the relevant agent/command).

## Required docs to read
`CLAUDE.md`, `docs/FORGE_V2_REALITY_MAP.md`, `docs/FORGE_V2_DESIGN_SYSTEM.md` (if visual),
`docs/FORGE_V2_CEO_OPERATING_SYSTEM.md`, `docs/FORGE_V2_MODEL_ROUTING.md`.

## Allowed agents
CEO Lead (always) + up to 3 more chosen for the mission (2–4 total).

## Forbidden actions
No edits, no installs, no push/merge/deploy in this step. No port/route changes.

## Steps
1. `git branch --show-current` (expect `forge-v2-rebuild`) and `git status --short`.
2. `git log --oneline -3`. Confirm port 5642 in `package.json`.
3. Load `CLAUDE.md` + Reality Map (+ Design System if visual).
4. State today's **one** mission (ask Ram if unclear).
5. Choose **2–4 agents** with rationale.
6. Output a numbered plan + scope to approve. **Do not edit yet.**

## Build / test rules
None this step (planning only).

## Git rules
Read-only. No commits/pushes.

## Approval rules
Implementation waits for Ram's scope approval (unless the active task prompt explicitly
authorizes a limited automatic action).

## Final report format
**Branch/status** · **Mission** · **Agents (2–4)** · **Plan** · **Scope to approve** · **Risks**.
