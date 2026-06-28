# Forge v2 — Merge Approval Prompt (paste-ready)

> Ram pastes this to authorize the actual production merge. The merge runs **only if all
> safety checks pass**. No force push, no production deploy command, no tag.

```
You are working on Tavronus Forge v2. This is PRODUCTION MERGE APPROVAL.

I (Ram) approve merging forge-v2-rebuild into master. Proceed ONLY if every check passes;
if any blocker appears, STOP and report it without merging.

Repo: C:\Users\raghu\Tavronus Forge THE REAL ONE | Remote: Ram-prog-bit/tavronus-forge
Sacred port 5642. Production deploys from master via Vercel (tavronus-forge-the-real-one).

Steps:
1. Confirm on forge-v2-rebuild, clean tree; npm run build passes.
2. Honesty + secrets scan clean (no real-AI/backend overclaim, no committed secrets/.env).
3. Confirm backup/forge-v1-final + tag forge-v1-final-snapshot still exist.
4. git fetch origin; git checkout master; git pull origin master (clean, no conflicts).
5. git merge --no-ff forge-v2-rebuild -m "merge: launch forge v2 preview".
   - If conflicts: STOP, report files, do not auto-resolve.
6. npm run build on master — must pass.
7. git push origin master  (NO --force). Let Vercel deploy production naturally.
8. Do NOT run `vercel --prod`. Do NOT create tags. Do NOT delete branches/tags.
9. Report: merge commit hash, master push result, production deploy status (Unknown until
   verified in dashboard), and remind me to check the production URL.

Forbidden: force push, master history rewrite, backup deletion, production deploy CLI,
new features/deps/integrations, tag creation without my explicit ok.
```

## Notes
- Treat pasting the above (or the equivalent "Production Merge Approval Day" prompt) as
  Ram's explicit approval to merge — **only if all checks pass**.
- The merge is conflict-free by construction: `forge-v2-rebuild` branches off `master`'s
  current tip (`9681302`) and is a linear descendant.
