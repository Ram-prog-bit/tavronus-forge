---
description: Patch Guardian review of the current Forge v2 git diff — classify risk, scan for forbidden changes, confirm rollback, and approve/reject commit readiness. Review only; never edits.
---

# /forge-patch-guardian-review

**Purpose:** Final safety gate before committing a serious change.

**When to use:** Before any commit on an implementation task; whenever a diff is non-trivial.
**When NOT to use:** To fix issues (route back to Frontend) — this command never edits.

## Required docs to read
`docs/FORGE_V2_RISK_REGISTER.md`, `docs/FORGE_V2_WORKFLOW.md`, `CLAUDE.md` §15.

## Allowed agents
Patch Guardian (lead), optionally Security.

## Steps
1. `git diff` + `git diff --stat`.
2. Classify risk: low / medium / high.
3. Scan for forbidden changes:
   - port 5642 changed
   - real integrations (AI/backend/auth/db/terminal/filesystem/browser)
   - contamination (SOJ/Ziggma/SushiSwap)
   - secrets in diff
   - oversized / multi-area edits
   - mock-as-real / removed honesty labels
4. Confirm a rollback (revert) path exists.
5. Output **approve** or **reject** with reasons + required fixes.

## Forbidden actions
❌ editing anything · ❌ approving its own changes · ❌ push/merge/deploy.

## Approval rules
A "reject" blocks commit until fixed. High-risk diffs escalate to Ram.

## Final report format
**Risk class** · **Forbidden-change scan** · **Rollback path** · **Verdict** ·
**Required fixes**.
