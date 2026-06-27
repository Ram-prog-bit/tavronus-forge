---
description: Commit safe Forge v2 work and push the forge-v2-rebuild preview branch only. Never master, never force. Reminds Ram to check the Vercel preview URL.
---

# /forge-commit-preview

**Purpose:** Safely commit reviewed work and publish a Vercel **preview** via the v2 branch.

**When to use:** After release-check passes and Patch Guardian approves.
**When NOT to use:** If build fails, scope is unapproved, or changes are forbidden.

## Required docs to read
`docs/FORGE_V2_GIT_VERCEL_PREVIEW_FLOW.md`, `docs/FORGE_V2_VERCEL_PREVIEW_CHECKLIST.md`.

## Pre-commit checklist
- [ ] `npm run build` passes.
- [ ] On `forge-v2-rebuild`.
- [ ] Port 5642 + routes unchanged.
- [ ] No forbidden integrations/contamination/secrets.
- [ ] Patch Guardian approved.

## Steps
1. `git status --short` + `git diff --stat` (final look).
2. `git add -A` (verify no `node_modules`/`.next`/`.env` — they're gitignored).
3. Commit with a clear conventional message.
4. **Push only the preview branch:** `git push origin forge-v2-rebuild`.
5. Tell Ram to open the Vercel **preview URL** and do visual QA.

## Forbidden actions
❌ `git push origin master` · ❌ merge to master · ❌ `--force` / force-with-lease ·
❌ pushing the backup branch · ❌ pushing tags (unless a milestone tag was approved) ·
❌ production deploy commands.

## Approval rules
Pushing the preview branch is allowed when checks pass. Anything touching production needs
explicit approval.

## Final report format
**Commit hash + message** · **Branch pushed** · **master untouched** · **Preview reminder**
· **Do not claim preview passed until Ram checks it**.
