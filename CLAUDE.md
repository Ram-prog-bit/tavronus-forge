# CLAUDE.md — Tavronus AI (Clean Restart Foundation)

> Read this first, every session. The project was intentionally reset to a blank
> foundation. The previous app is preserved in Git — see "Backup truth" below.

## 1. Identity
**Tavronus AI / Tavronus Forge.** We are rebuilding from a clean, blank, controlled base.
Do not reintroduce old screens, mock features, or "real AI" claims unless explicitly asked.

## 2. Repo truth
- Repo path: `C:\Users\raghu\Tavronus Forge THE REAL ONE`
- GitHub: `Ram-prog-bit/tavronus-forge`
- Local dev URL: `http://localhost:5642`
- Stack: Next.js 14.2.5 · React 18 · App Router · TypeScript · Tailwind 3.4 (`forge` palette) · npm.
- Routes: `/` only (single homepage with labeled placeholders).

## 3. Backup truth (the museum — never overwrite)
- Pre-reset backup branch: `backup/pre-reset-tavronus-ai` (never delete).
- Pre-reset backup tag: `pre-reset-tavronus-ai-backup`.
- Older snapshots also preserved: branch `backup/forge-v1-final`, tags
  `forge-v1-final-snapshot`, `forge-v2-preview-production`.
- To return to the old app: `git checkout backup/pre-reset-tavronus-ai`.

## 4. Sacred port rule
**Port 5642 is sacred.** Never change it. It lives in `package.json` `dev`/`start` scripts.

## 5. Project contamination rule
Never mix this repo with **SOJ / Serving Our Justice**, **Ziggma**, **SushiSwap**,
**Mission Controller**, **Quant Lab**, or any other project. No shared code, deps, configs,
or copied content. (Placeholder section *names* like "Quant Lab" in this app are harmless
labels only — never real cross-project code.)

## 6. No fake AI claims rule
Never present mock behavior as real AI. Never animate or style a placeholder to look live.
Every UI area must honestly read as placeholder / planned until it is genuinely built.

## 7. No real integration without approval rule
No real backend, auth, database, AI API, filesystem control, terminal control, browser
automation, payments, or MCP servers in the app — **unless Ram explicitly approves.**

## 8. UI cleanliness rule
Clean, aligned, calm, premium. Hairlines over glow; structure over decoration. No neon
spam, no glow spam, no template clutter.

## 9. Minimal patch rule
Prefer the smallest safe diff. Reuse first. One area at a time. Before editing, ask: does
this need to exist? Can existing files/components/tokens solve it? Does it add fake
functionality or break honesty? Is there a rollback path?

## 10. Git safety rule
Never force push, never rewrite history, never delete a backup branch/tag, never push to
`master` or deploy production without explicit approval.

## 11. Build / test rule
Run `npm run build` before committing. Confirm port 5642 and routes are intact. If build
fails: report the exact error and suggest the smallest fix — do not start a broad refactor.

## 12. Live deployment status (Level 2A)
- **Level 2A is live in production on Vercel.** (Supersedes Level 1.)
- Live URL: `https://tavronus-forge-the-real-one.vercel.app`
- Production deployment ID: `dpl_4ZT9PM758o9w5wJ9bhhi33k6L8ZZ`
- Branch: `reset/tavronus-ai-blank-foundation`
- Level 2A commit: `b89a7e9` (`level2: add CSS motion and accessibility polish`)
- **What Level 2A added:** CSS-only motion (staggered hero entrance, slow core
  orbit/ring/aura) + accessibility polish (skip link, focus-visible rings, WCAG-AA
  contrast via the additive `forge-dim` token, clearer status chips).
- **Stayed lightweight:** First Load JS held at **92.9 kB** (unchanged from Level 1) —
  no new dependencies, no JS motion, no 3D, no backend, no fake AI, no GitHub auto-deploy.
- **Route honesty:** `/workspace` and `/about` correctly return **404** — no old Forge
  workspace or old About page is exposed.
- Level 1 (previous): commit `61a04cd`, deployment `dpl_BM7eeJakSo9WdHLSDSs24qugSmEH`.
- **Deploys are manual only** (via `vercel deploy --prod`). The local `.vercel` CLI
  link is NOT wired to GitHub auto-deploy — pushing to GitHub does not deploy.
- **Do NOT set up GitHub auto-deploy** unless Ram explicitly approves.
- **Level 2B has NOT started yet.** Do not begin Level 2B work without Ram's go-ahead.
- (No secrets, tokens, project IDs, org IDs, or env values are recorded here by design.)

## Commands
`npm run dev` (port 5642) · `npm run build` · `npm run lint`.
