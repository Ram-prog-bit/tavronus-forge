---
description: Use GStack safely for Forge planning/review/QA/security. Allows /office-hours, /plan-*-review, /design-review, /review, /qa-only, /cso, /careful, /guard. Never /ship, /land-and-deploy, /setup-browser-cookies.
---

# /forge-gstack-review

**Purpose:** Bring GStack's planning/review/QA/security discipline into a Forge mission —
safely.

**When to use:** Before/after meaningful work, to pressure-test plans or review diffs.
**When NOT to use:** For shipping, deployment, or credential/cookie flows.

## Prerequisite
GStack is staged at `~/.claude/skills/gstack`. Its `/` commands require `./setup` to have
run, which **requires Bun** (currently missing — see `docs/FORGE_V2_GSTACK_SETUP.md`).
If Bun isn't installed, treat this command as planning guidance only.

## Required docs to read
`docs/FORGE_V2_GSTACK_SETUP.md`, `CLAUDE.md`, the current plan/diff.

## Allowed GStack commands
`/office-hours`, `/plan-ceo-review`, `/plan-eng-review`, `/plan-design-review`,
`/design-review`, `/review`, `/qa-only`, `/cso`, `/careful`, `/guard`.

## Forbidden GStack commands
❌ `/ship` · ❌ `/land-and-deploy` · ❌ `/setup-browser-cookies` · ❌ any production deploy
· ❌ any real-credential/cookie flow · ❌ GStack team-install into the Forge repo.

## Steps
1. Confirm the mission and what needs review (plan vs diff).
2. Choose the matching allowed GStack command(s).
3. Capture the review output as evidence.
4. Feed findings to the CEO Lead Agent / Patch Guardian.

## Build / test rules
GStack review does not replace `npm run build`; still run it for code changes.

## Git rules
No push/merge/deploy via GStack. Review only.

## Approval rules
Any action implied by a review (install, integration, deploy) needs Ram's approval.

## Final report format
**Command used** · **Findings** · **Risks** · **Recommended next step**.
