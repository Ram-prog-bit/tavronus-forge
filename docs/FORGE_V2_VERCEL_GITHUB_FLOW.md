# Forge v2 — Vercel / GitHub Flow

> Safe deployment and branching discipline. Production is sacred; previews are for work.

## Branch model

| Branch | Role | Rules |
|---|---|---|
| `master` | stable production | only merge after approval; never push broken work |
| `backup/forge-v1-final` | preserved v1 fallback | never delete; never rewrite |
| `forge-v2-rebuild` | active preview branch | push meaningful commits here for preview |

- V1 snapshot: tag `forge-v1-final-snapshot`, commit `9681302`.
- Remote: `https://github.com/Ram-prog-bit/tavronus-forge.git` (origin).
- Vercel project: `tavronus-forge-the-real-one`.
- Production URL: `https://tavronus-forge-the-real-one.vercel.app`.
- Local dev URL: `http://localhost:5642`.

## Core rules

- `master` = stable production. Treat it as protected.
- `backup/forge-v1-final` = preserved fallback. Do not touch.
- `forge-v2-rebuild` = active preview branch. Do work here.
- Push meaningful commits to `forge-v2-rebuild` and review via Vercel **preview**
  deployments.
- Only merge to `master` after explicit approval.
- **Never force push. Never expose secrets. Never push broken experiments to production.**

## Commit naming rules

Use Conventional Commits:

- `docs:` documentation only
- `chore:` tooling/deps/config
- `feat:` new user-facing capability
- `fix:` bug fix
- `refactor:` no behavior change
- `style:` design system / visual tokens

Subject ≤ ~72 chars, imperative mood. Body explains *why* when non-trivial.

Examples:
- `docs: prime forge v2 engine and agent workflow`
- `style: add forge v2 design tokens and layout primitives`

## Branch naming rules

- Feature/day branches off `forge-v2-rebuild`: `v2/design-system`, `v2/shell-layout`,
  `v2/mission-control`, etc.
- No work directly on `master` or the backup branch.

## Preview review checklist

Before treating a preview as "good":

- [ ] Branch is `forge-v2-rebuild` (or a `v2/*` feature branch).
- [ ] Build succeeds locally and on Vercel.
- [ ] Port 5642 unchanged in scripts.
- [ ] Visual QA passes against `FORGE_V2_DESIGN_SYSTEM.md`.
- [ ] Honesty labels correct (mock/real/planned/tested).
- [ ] No secrets in diff or env output.
- [ ] No forbidden changes (integrations, contamination, port).

## Production merge checklist

Only with explicit user approval:

- [ ] Preview reviewed and approved by user.
- [ ] Build + lint pass.
- [ ] Release / Test Agent sign-off.
- [ ] Patch Guardian sign-off.
- [ ] Reality Map honesty labels accurate.
- [ ] Clean, conventional merge commit.
- [ ] No force push, no history rewrite.

## Hard stops

- Do not push to GitHub unless explicitly instructed.
- Do not deploy to production in normal work.
- Do not push `master` unless the user explicitly asks.
