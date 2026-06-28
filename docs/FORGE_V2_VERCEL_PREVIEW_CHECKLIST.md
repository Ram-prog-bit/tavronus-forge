# Forge v2 — Vercel Preview Checklist

> Preview-first. Production is never touched in normal work.

## Readiness status (as of engine priming)

| Check | Status |
|---|---|
| Git remote | ✅ `origin` → `https://github.com/Ram-prog-bit/tavronus-forge.git` |
| Active branch | ✅ `forge-v2-rebuild` |
| Vercel linked | ✅ `.vercel/project.json` → project `tavronus-forge-the-real-one` |
| `vercel.json` config | ⚪ none (not required; framework auto-detected) |
| Build script | ✅ `next build` |
| Local build | ✅ passes (`npm run build`, all 4 routes) |
| Production URL | `https://tavronus-forge-the-real-one.vercel.app` |
| Local dev URL | `http://localhost:5642` (port 5642) |

The project is **Vercel-ready**. Pushing `forge-v2-rebuild` to GitHub will produce a
**preview** deployment (production stays on `master`).

## Branch / deploy rules

- `master` should remain **stable production** — do not push or merge without approval.
- `forge-v2-rebuild` is the **preview** branch — push meaningful commits here.
- Vercel **preview URLs** should be reviewed before any merge.
- Claude may use a preview URL for visual QA **if the user provides it**.
- **Do not expose secrets.** Never print or commit env values.
- **Do not merge to production until approved.**
- **Do not push `master` unless the user explicitly asks.**

## Before pushing a preview

- [ ] On `forge-v2-rebuild` (or a `v2/*` feature branch).
- [ ] `npm run build` passes locally.
- [ ] Port 5642 unchanged in `package.json`.
- [ ] `git diff` reviewed; scope is one area.
- [ ] No secrets, no forbidden changes, no contamination.
- [ ] Honesty labels accurate.

## After preview deploys

- [ ] Open the preview URL; visual QA against `FORGE_V2_DESIGN_SYSTEM.md`.
- [ ] Confirm routes still work (`/`, `/workspace`, `/about`).
- [ ] Record evidence in the daily log.

## Hard stops

- No production deploy in normal work.
- No push to GitHub unless explicitly instructed in the task.
- If a push is needed, report/ask first.
