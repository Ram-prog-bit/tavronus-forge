---
description: Update Forge v2 project memory — Reality Map, Daily Mission Log, and recorded decisions. Docs-only edits with provenance. No app code, no push unless allowed.
---

# /forge-memory-update

**Purpose:** Keep project truth current so future sessions don't re-ask or lose decisions.

**When to use:** After any decision, mock→real change, or at end of day.
**When NOT to use:** For app code or design work.

## Required docs to read
`docs/FORGE_V2_REALITY_MAP.md`, `docs/FORGE_V2_DAILY_MISSION_LOG.md`,
`docs/FORGE_V2_MASTER_BLUEPRINT.md`, `CLAUDE.md`.

## Allowed agents
Memory (lead), Docs/Report.

## Steps
1. Update `docs/FORGE_V2_REALITY_MAP.md` (real/mock/planned/tested deltas).
2. Append to `docs/FORGE_V2_DAILY_MISSION_LOG.md` (today's mission entry).
3. Record decisions with provenance (what, why, when, who approved). Use absolute dates.
4. Flag/remove any contamination.

## Forbidden actions
❌ app code edits · ❌ inventing history · ❌ overwriting truth without a recorded reason ·
❌ unapproved push/deploy.

## Build / test rules
N/A (docs only).

## Git rules
Docs commits only if the task allows; push `forge-v2-rebuild` only if approved.

## Approval rules
Changing an established decision requires CEO/Ram approval.

## Final report format
**Files updated** · **Decisions recorded** · **Reality Map deltas** · **Open items**.
