# Forge v2 — Production Rollback Plan

> How to safely undo a bad production state. **Read before any merge.** Do not execute
> these steps unless a rollback is actually needed.

## Current stable references

- **Production branch:** `master`.
- **V1 fallback branch:** `backup/forge-v1-final` (commit `9681302`) — never delete.
- **V1 snapshot tag:** `forge-v1-final-snapshot` (commit `9681302`) — never delete.
- **V2 source branch:** `forge-v2-rebuild` (merge source).
- Vercel deploys production automatically from `master` (GitHub integration).

## If a production merge goes bad

### Option A — Revert the merge commit (preferred, non-destructive)
```
git checkout master
git pull origin master
git revert -m 1 <merge-commit-hash>     # -m 1 keeps master's prior state
npm run build                            # confirm green
git push origin master                   # Vercel redeploys the reverted state
```
This creates a new commit that undoes the merge. **No history rewrite, no force push.**

### Option B — Redeploy a known-good production build from Vercel
- In the Vercel dashboard (project `tavronus-forge-the-real-one`), open Deployments,
  find the last healthy production deployment, and **Promote/Redeploy** it.
- Does not touch git; fastest way to restore the live site while you fix `master`.

### Option C — Restore master to the v1 snapshot (last resort, with care)
```
git checkout master
git pull origin master
git revert <bad commits>                 # prefer revert over reset
# OR, only if explicitly approved and safe:
#   git merge --no-ff forge-v1-final-snapshot
npm run build
git push origin master
```
Prefer `revert` over `reset --hard` on a shared branch. The v1 code always remains
recoverable from `backup/forge-v1-final` / `forge-v1-final-snapshot`.

## What NOT to do
- ❌ No `git push --force` / `--force-with-lease` on `master`.
- ❌ No `git reset --hard` + force push on a shared branch.
- ❌ No deleting `backup/forge-v1-final` or `forge-v1-final-snapshot`.
- ❌ No panic commits — diagnose first, revert second.
- ❌ No history rewrite of shared branches.

## Verification after any rollback
- `npm run build` passes.
- `/`, `/workspace`, `/about` load (local + production).
- Honesty labels intact; no fake real-AI claims.
- Backup branch + tag still present (`git branch -a`, `git tag`).
