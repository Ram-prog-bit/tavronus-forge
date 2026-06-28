# Forge v2 — Production Launch Checklist

> The exact gate for merging `forge-v2-rebuild` → `master`. Do not run the merge steps
> until every pre-merge box is checked and Ram has approved.

## Pre-merge (all must be true)

- [x] `npm run build` passes on `forge-v2-rebuild`.
- [x] Routes `/`, `/workspace`, `/about` load (HTTP 200 locally).
- [x] Workspace modes intact: Plan, Prompt, Review, Debug, Checklist.
- [x] Mock/real honesty verified — no overclaiming phrases; every mock surface labeled.
- [x] No real integrations (AI/backend/auth/db/filesystem/terminal/browser).
- [x] No new heavy dependencies (only clsx, tailwind-merge, lucide-react, framer-motion).
- [x] Port 5642 preserved.
- [x] Production URL noted: `https://tavronus-forge-the-real-one.vercel.app`.
- [x] V1 backup confirmed: `backup/forge-v1-final` + tag `forge-v1-final-snapshot` @ `9681302`.
- [x] Rollback plan exists: `docs/FORGE_V2_PRODUCTION_ROLLBACK_PLAN.md`.
- [ ] **Ram approves the merge** (paste the Merge Approval prompt).
- [ ] Vercel preview for `forge-v2-rebuild` visually reviewed by Ram.

## Merge steps (only after approval — no force push, no `vercel --prod`)

```
git checkout master
git pull origin master
git merge --no-ff forge-v2-rebuild -m "merge: launch forge v2 preview"
npm run build            # must pass on master
git push origin master   # Vercel deploys production naturally from GitHub
```

If merge conflicts occur: STOP, do not auto-resolve, report conflict files.

## Post-merge

- [ ] Vercel production deployment from `master` reaches **Ready**.
- [ ] Production `/` loads.
- [ ] Production `/workspace` loads (modes + command-center previews visible).
- [ ] Production `/about` loads (honest real/mock/planned).
- [ ] Honesty labels visible in production; no fake live-AI claims.
- [ ] Record production result in the Daily Mission Log.
- [ ] Keep `backup/forge-v1-final` + `forge-v1-final-snapshot` (never delete).

## Hard stops
No production deploy CLI commands, no master force push, no tag creation without explicit
approval, no backup deletion.
