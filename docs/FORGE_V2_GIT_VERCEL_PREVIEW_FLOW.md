# Forge v2 — Git / Vercel Preview Flow

> Branch and deploy discipline. Production is sacred; previews are for work. Supersedes
> the broader `FORGE_V2_VERCEL_GITHUB_FLOW.md` for day-to-day preview pushing.

## Branch model

| Branch | Role | Rules |
|---|---|---|
| `master` | stable production | no push/merge without explicit approval |
| `backup/forge-v1-final` | preserved v1 fallback | never delete, never rewrite |
| `forge-v2-rebuild` | active **preview** branch | push meaningful commits here |

- Remote: `https://github.com/Ram-prog-bit/tavronus-forge.git` (origin).
- Vercel project: `tavronus-forge-the-real-one`.
- Production URL: `https://tavronus-forge-the-real-one.vercel.app`.
- V1 snapshot: tag `forge-v1-final-snapshot`, commit `9681302`.

## Flow

1. Work on `forge-v2-rebuild`.
2. Make safe, reviewed commits (conventional messages).
3. `git push origin forge-v2-rebuild` → Vercel builds a **preview** deployment.
4. Review the preview URL (visual QA).
5. **No production merge yet.** Merging to `master` happens only after explicit approval.

## Hard rules

- **No `master` push unless Ram explicitly asks.**
- **No merge to `master`** without approval.
- **No force push** (no `--force`, no `--force-with-lease`).
- **No history rewrite**; no backup-branch deletion.
- **No production deploy** in normal work.
- **No secrets** in commits or output (`.env*`, `.vercel` are gitignored).
- Do not push the backup branch; do not push tags unless a milestone tag is approved.

## Commit naming

Conventional Commits: `docs:` · `chore:` · `feat:` · `fix:` · `refactor:` · `style:`.
Imperative subject ≤ ~72 chars; body explains *why* when non-trivial.

## Preview review checklist

- [ ] On `forge-v2-rebuild`.
- [ ] `npm run build` passes locally.
- [ ] Port 5642 + routes unchanged.
- [ ] No forbidden integrations / contamination / secrets.
- [ ] Honesty labels accurate.
- [ ] Vercel preview opened and visually checked (don't claim "passed" until checked).

## Production merge checklist (future, approval-gated)

- [ ] Preview reviewed + approved by Ram.
- [ ] Build + lint pass; Release/Test + Patch Guardian sign-off.
- [ ] Reality Map honesty accurate.
- [ ] Clean conventional merge commit; no force push.
