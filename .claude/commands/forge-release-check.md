---
description: Release readiness check for Forge v2 — build, diff, port 5642, route + forbidden-integration checks, docs, and a recommended commit message. No push, no merge, no deploy.
---

# /forge-release-check

**Purpose:** Confirm the branch is safe and preview-ready before any commit.

**When to use:** Before committing/pushing on a serious task.
**When NOT to use:** For design or visual QA.

## Required docs to read
`docs/FORGE_V2_GIT_VERCEL_PREVIEW_FLOW.md`, `docs/FORGE_V2_WORKFLOW.md`, `package.json`.

## Allowed agents
Release/Test (lead), Patch Guardian, optionally Security.

## Forbidden actions
❌ force push · ❌ `master` push · ❌ merge · ❌ production deploy · ❌ app edits.

## Steps
1. `npm run build` — report exact output (tail).
2. `git status --short` + `git diff --stat`.
3. Confirm **port 5642** unchanged in `package.json` scripts.
4. Confirm routes `/`, `/workspace`, `/about` unchanged.
5. Scan diff for forbidden integrations, contamination (SOJ/Ziggma/SushiSwap), secrets.
6. Confirm docs updated where relevant.
7. Recommend a conventional commit message.

## Build / test rules
Build must pass. If it fails: report the exact error, suggest the smallest fix, no
broad refactor.

## Git rules
Read/status only. Pushing requires Ram's approval (see commit-preview command).

## Approval rules
Any push/merge/deploy is escalated to Ram.

## Final report format
**Build** · **Diff stat** · **Guardrails** (port/routes/integrations/secrets/contamination)
· **Preview readiness** · **Recommended commit message** · **Verdict**.
