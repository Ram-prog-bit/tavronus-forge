---
description: End a Forge v2 mission day — verify build, review UI + diff, update the daily mission log, recommend next task and commit message. Commit/push only if explicitly allowed.
---

# /forge-end-day-report

**Purpose:** Close the day with a clear, honest record and a safe handoff.

**When to use:** End of any mission/day.
**When NOT to use:** Mid-implementation.

## Required docs to read
`docs/FORGE_V2_DAILY_MISSION_LOG.md`, `docs/FORGE_V2_NEXT_STEPS.md`,
`docs/FORGE_V2_REALITY_MAP.md`.

## Allowed agents
Docs/Report (lead), Memory, Release/Test, Patch Guardian.

## Forbidden actions
No unapproved push/merge/deploy. No port/route changes.

## Steps
1. Run build/test (`npm run build`); record results.
2. Review UI visually (preview URL if provided) vs `FORGE_V2_DESIGN_SYSTEM.md`.
3. Review `git diff` + `git diff --stat`.
4. Confirm no forbidden changes (port 5642, integrations, contamination, secrets).
5. Update `docs/FORGE_V2_DAILY_MISSION_LOG.md` (mission, completed, evidence, blockers,
   approvals needed, honesty changes, next mission).
6. Recommend the next task and a conventional commit message.

## Build / test rules
Build must pass to call the day "green."

## Git rules
Commit only if Ram asked. Push `forge-v2-rebuild` only if approved. Never `master`/force.

## Approval rules
Commit/push gated on explicit permission for the task.

## Final report format
**Result** · **Changes** · **Evidence/Build** · **Honesty deltas** · **Git state** ·
**Recommended commit msg** · **Next task**.
