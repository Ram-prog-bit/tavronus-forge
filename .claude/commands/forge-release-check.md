---
description: Release readiness check for Forge v2 — build, guardrails, preview status. No push, no merge.
---

# /forge-release-check

Run the Release / Test Agent ritual. **No push, no merge, no production deploy.**

1. Confirm branch `forge-v2-rebuild` and `git status --short`.
2. Review `git diff --stat` for scope and spread.
3. Run `npm run build` (and `npm run lint` if reasonable). Report exact output.
4. Confirm guardrails:
   - port **5642** unchanged in `package.json` scripts
   - no real integrations added (AI/backend/auth/db/terminal/filesystem/browser)
   - no SOJ / Ziggma / SushiSwap contamination
   - no secrets in the diff
   - no oversized multi-area edits
5. Check Vercel preview status for the branch.
6. Report readiness with evidence. If build fails: report the exact error, do **not**
   start broad fixes, suggest the smallest safe fix.

Pushing or merging requires explicit user approval (see `FORGE_V2_VERCEL_GITHUB_FLOW.md`).
