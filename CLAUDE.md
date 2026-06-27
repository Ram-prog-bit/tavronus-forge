# CLAUDE.md — Tavronus Forge CEO Operating System

> Read this first, every session. This is the operating manual for building Tavronus
> Forge v2. Start each day with the CEO Lead Agent and `/forge-ceo-start-day`.

---

## 1. Tavronus Forge Identity
**Tavronus Forge** — *mission control for AI coding agents.* A local-first AI development
command center for builders who use AI agents to plan, code, review, test, and ship
software with **project memory, evidence, safe patch review, clean UI discipline,
deployment awareness, and honest mock/real labeling.** Parent brand: Tavronus AI /
Tavronus Labs.

## 2. Current Repo Truth
- Repo path: `C:\Users\raghu\Tavronus Forge THE REAL ONE`
- GitHub: `Ram-prog-bit/tavronus-forge` · remote `https://github.com/Ram-prog-bit/tavronus-forge.git`
- Production URL: `https://tavronus-forge-the-real-one.vercel.app`
- Local dev URL: `http://localhost:5642`
- Stack: Next.js 14.2.5 · React 18 · App Router · TypeScript · Tailwind 3.4 (`forge` palette) · npm.
- UI deps: clsx, tailwind-merge, lucide-react, framer-motion.
- Routes: `/`, `/workspace`, `/about`. Modes: Plan, Prompt, Review, Debug, Checklist.

## 3. V1 Backup Truth
- V1 is the **museum/fallback** — preserved, never rebuilt over.
- Backup branch: `backup/forge-v1-final` (never delete).
- Snapshot tag: `forge-v1-final-snapshot` · commit `9681302`.

## 4. V2 Branch Truth
- Active branch: **`forge-v2-rebuild`** (preview branch).
- Production branch: `master` (protected — no push/merge without explicit approval).
- V2 is a conceptual rebuild from first principles.

## 5. Product Thesis
> Mission control for AI coding agents. Local-first. Memory + evidence + safe patches +
> clean UI discipline + honest mock/real labeling.

## 6. Full Command Center Direction
Architect the UI as real mission control from the start (even while subsystems are mock):
Mission Control · Agent Board · Project Memory · Evidence Vault · Patch Review ·
Deployment Status · Daily Mission Log · Honest Mock/Real status. Visual feel: clean like
Linear, sharp like Cursor, polished like Vercel, technical like VS Code, serious like an
AI lab — a calm dark Batcomputer, **not** fake hacker / neon / clutter / over-glow.
Accent: ~90% obsidian/graphite/gunmetal/chrome, ~8% cold electric blue, ~2% deep violet
(brand aura, not the UI). No purple spam, no glow spam.

## 7. Sacred Port Rule
**Port 5642 is sacred.** Never change it. It lives in `package.json` `dev` and `start`
scripts (`next dev -p 5642`, `next start -p 5642`).

## 8. Route Preservation Rule
Do not add, remove, or rename routes during priming or Design System Day. Routes stay
`/`, `/workspace`, `/about`.

## 9. Project Contamination Rule
Never mix this repo with **SOJ / Serving Our Justice**, **Ziggma**, or **SushiSwap**, or
any other project. No shared code, deps, configs, or copied content.

## 10. Mock vs Real Honesty Rule
Every UI area must clearly label its state: **real / mock / planned / tested / untested.**
`docs/FORGE_V2_REALITY_MAP.md` is the source of truth. A wrong label is a bug.

## 11. No Fake AI Claims Rule
Never present mock behavior as real AI. Never animate or style a mock to look live. No
"real AI" labels on placeholder functionality.

## 12. No Real Integration Without Approval Rule
No real backend, auth, database, AI API, filesystem control, terminal control, browser
automation, payments, or MCP servers in the app — **unless Ram explicitly approves.**

## 13. UI Cleanliness Rule
Clean, aligned, premium, calm. No vibe-coded clutter, no random neon, no glow spam, no
laggy template motion. Hairlines over glow; structure over decoration.

## 14. Design-System First Rule
The **next real build day is Design System Day only** — tokens, CSS variables, typography,
spacing, panels, cards, buttons, badges, status styles, motion rules, layout primitives.
**No full screens, no Agent Board / Evidence Vault / Patch Review implementation, no real
integrations.** See `docs/FORGE_V2_DESIGN_SYSTEM_DAY_SPEC.md`.

## 15. Minimal Patch Rule
Before editing code, answer all of these:
1. Does this need to exist?
2. Can an existing file solve it?
3. Can an existing component solve it?
4. Can existing tokens/styles solve it?
5. Can this be smaller?
6. Does this add fake functionality?
7. Does this damage mock/real honesty?
8. Does this affect security / accessibility / tests?
9. Is there a rollback path?
10. Is user approval required?

Prefer the smallest safe diff. Reuse first. One area at a time.

## 16. Agent Delegation Rule
Start with the **CEO Lead Agent**. Default to **2–4 agents** per mission. Do not run 10
agents unless Ram approves. Inspect before editing; approve scope before code; one builder
(Frontend Agent) edits at a time. See `docs/FORGE_V2_AGENT_SYSTEM.md` and
`docs/FORGE_V2_MODEL_ROUTING.md`.

## 17. GStack Usage Rule
GStack is installed **personal/global** at `~/.claude/skills/gstack` (staged; `./setup`
pending Bun). Use it for **planning / review / QA / security discipline**:
`/office-hours`, `/plan-ceo-review`, `/plan-eng-review`, `/plan-design-review`,
`/design-review`, `/review`, `/qa-only`, `/cso`, `/careful`, `/guard`.
**Never** use `/ship`, `/land-and-deploy`, `/setup-browser-cookies`, team mode, or any
production/credential command without explicit approval. Details:
`docs/FORGE_V2_GSTACK_SETUP.md`.

## 18. Agent View Usage Rule
`claude agents` (Agent View) is for watching **2–4 independent, read-only** sessions
(inspection/research/reporting). Never edit the same files from multiple sessions. Mind
token cost. Details: `docs/FORGE_V2_AGENT_VIEW_SETUP.md`.

## 19. VS Code Agents Usage Rule
The VS Code Agents Window is optional/preview; the Claude Code extension panel stays the
primary surface. Do not rely on it blindly. Details:
`docs/FORGE_V2_VSCODE_AGENTS_SETUP.md`.

## 20. Git / Vercel Rule
`master` = stable production (protected). `forge-v2-rebuild` = preview branch — push
meaningful commits here and review the Vercel **preview**. Never force push, never rewrite
history, never delete the backup, never merge to `master` or deploy production without
explicit approval. Details: `docs/FORGE_V2_GIT_VERCEL_PREVIEW_FLOW.md`.

## 21. Dependency Rule
Only safe, essential deps. Currently installed: clsx, tailwind-merge, lucide-react,
framer-motion. Deferred (needs approval): CVA, shadcn, Playwright, Vercel CLI, Graphify,
ECC, Ponytail, MCP servers, backend/auth/db/AI packages. `npm audit` shows **pre-existing**
Next.js/eslint-config-next vulnerabilities — **do not** run `audit fix --force` without
approval. Details: `docs/FORGE_V2_DEPENDENCY_PLAN.md`.

## 22. Daily Mission Rule
One mission per day. Start with CEO Lead Agent → pick one mission → use 2–4 agents →
inspect before editing → approve scope → build → QA → final report → commit/push only if
the task allows. Rituals: `docs/FORGE_V2_DAILY_RITUAL.md`.

## 23. Build / Test Rule
Run `npm run build` before committing. Confirm port 5642, routes, and no forbidden
changes. If build fails: report the exact error, suggest the smallest fix, do not start a
broad refactor.

## 24. Final Report Rule
Every mission ends with a clear report: what changed, evidence, build status, honesty
labels, git state, recommended commit message, and the next task. Update
`docs/FORGE_V2_DAILY_MISSION_LOG.md`.

---

## Absolute project constraints (quick list)
- ❌ No SOJ · ❌ No Ziggma · ❌ No SushiSwap
- ❌ No port change from 5642
- ❌ No production deployment commands unless explicitly approved
- ❌ No `master` push unless explicitly approved
- ❌ No force push · ❌ No history rewrite · ❌ No backup deletion
- ❌ No real backend/auth/db/AI/filesystem/terminal/browser in the app unless approved
- ❌ No fake "real AI" UI labels

## Default daily workflow
Start with CEO Lead Agent → pick **one** mission → use **2–4** agents by default →
**inspect before editing** → **approve scope** → build (Frontend Agent only) → QA →
**final report** → commit/push only if allowed by the task.

## Key docs index
Product: `FORGE_V2_MASTER_BLUEPRINT.md` · Honesty: `FORGE_V2_REALITY_MAP.md` · Visual:
`FORGE_V2_DESIGN_SYSTEM.md` + `FORGE_V2_DESIGN_SYSTEM_DAY_SPEC.md` · Agents:
`FORGE_V2_AGENT_SYSTEM.md` + `FORGE_V2_MODEL_ROUTING.md` · CEO OS:
`FORGE_V2_CEO_OPERATING_SYSTEM.md` · Tools: `FORGE_V2_GSTACK_SETUP.md`,
`FORGE_V2_AGENT_VIEW_SETUP.md`, `FORGE_V2_VSCODE_AGENTS_SETUP.md`,
`FORGE_V2_LOCAL_TOOLCHAIN_STATUS.md` · Flow: `FORGE_V2_DAILY_RITUAL.md`,
`FORGE_V2_GIT_VERCEL_PREVIEW_FLOW.md` · Risk: `FORGE_V2_RISK_REGISTER.md` · Next:
`FORGE_V2_NEXT_STEPS.md` · Commands index: `FORGE_V2_AGENT_COMMANDS_INDEX.md`.

## Commands
`npm run dev` (port 5642) · `npm run build` · `npm run lint`.
Claude workflows in `.claude/commands/` — start with `forge-ceo-start-day`.
